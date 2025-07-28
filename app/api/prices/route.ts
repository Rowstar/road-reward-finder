import { NextResponse } from 'next/server';
import devices from '../../../../prisma/devices.json';

// In-memory cache for 10 minutes
let cachedData: { data: Record<string, number>; timestamp: number } | null = null;

// Map device reward tokens to CoinGecko IDs
const TOKEN_ID_MAP: Record<string, string> = {
  HONEY: 'hivemapper',
  MOTUS: 'motus',
  DIMO: 'dimo',
  WXM: 'weatherxm',
};

export async function GET() {
  // return cached data if not expired
  if (cachedData && Date.now() - cachedData.timestamp < 10 * 60 * 1000) {
    return NextResponse.json(cachedData.data);
  }

  // Determine unique token IDs from devices.json
  const tokens = Array.from(
    new Set((devices as any[]).map((d) => d.rewardToken.toUpperCase()))
  );
  const ids = tokens
    .map((token) => TOKEN_ID_MAP[token])
    .filter((id) => id !== undefined)
    .join(',');

  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=aud`,
      { next: { revalidate: 600 } }
    );
    const priceJson = await res.json();
    // Build price map keyed by original token symbol
    const prices: Record<string, number> = {};
    tokens.forEach((token) => {
      const id = TOKEN_ID_MAP[token];
      const price = priceJson[id]?.aud ?? 0;
      prices[token] = price;
    });
    // cache result
    cachedData = { data: prices, timestamp: Date.now() };
    return NextResponse.json(prices);
  } catch (error) {
    console.error('Error fetching prices', error);
    return NextResponse.json({}, { status: 500 });
  }
}
