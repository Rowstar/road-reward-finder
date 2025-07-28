import devices from '../../../../prisma/devices.json';
import { notFound } from 'next/navigation';

interface Device {
  slug: string;
  brand: string;
  upfrontCost: number;
  rewardToken: string;
  dailyRewardMin: number;
  dailyRewardMax: number;
  powerSource: string;
  installTime: number;
  payoutApiUrl: string;
}

export default function DevicePage({ params }: { params: { slug: string } }) {
  const device = (devices as Device[]).find((d) => d.slug === params.slug);
  if (!device) {
    notFound();
  }
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">{device?.brand}</h1>
      <div className="space-y-2">
        <p>
          <span className="font-medium">Upfront cost:</span> ${device?.upfrontCost}
        </p>
        <p>
          <span className="font-medium">Reward token:</span> {device?.rewardToken}
        </p>
        <p>
          <span className="font-medium">Daily reward range:</span> {device?.dailyRewardMin}–{device?.dailyRewardMax}{' '}
          {device?.rewardToken}
        </p>
        <p>
          <span className="font-medium">Power source:</span> {device?.powerSource}
        </p>
        <p>
          <span className="font-medium">Install time:</span> {device?.installTime} minutes
        </p>
        <p>
          <span className="font-medium">Payout API:</span>{' '}
          <a
            href={device?.payoutApiUrl}
            className="text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {device?.payoutApiUrl}
          </a>
        </p>
      </div>
    </div>
  );
}
