"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import devices from '../../../prisma/devices.json';
import { calculatePaybackMonths, getPaybackColor } from '../../lib/roi';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Device {
  slug: string;
  brand: string;
  upfrontCost: number;
  rewardToken: string;
  dailyRewardMin: number;
  dailyRewardMax: number;
}

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const kms = parseFloat(searchParams.get('kms') ?? '0');
  const days = parseInt(searchParams.get('days') ?? '0');

  const [prices, setPrices] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    async function fetchPrices() {
      try {
        const res = await fetch('/api/prices');
        if (!res.ok) throw new Error('Failed to fetch prices');
        const data = await res.json();
        setPrices(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPrices();
  }, []);

  // compute results for each device
  const results = (devices as Device[]).map((device) => {
    const avgRewardPerDay = (device.dailyRewardMin + device.dailyRewardMax) / 2;
    const payback = calculatePaybackMonths(
      device.upfrontCost,
      avgRewardPerDay,
      days
    );
    const monthlyTokens = avgRewardPerDay * days * 4.3;
    const tokenPrice = prices[device.rewardToken] ?? 0;
    const monthlyProfit = monthlyTokens * tokenPrice;
    return { ...device, payback, monthlyProfit };
  }).sort((a, b) => a.payback - b.payback);

  const top5 = results.slice(0, 5);
  const chartData = {
    labels: top5.map((d) => d.brand),
    datasets: [
      {
        label: 'Projected Monthly Profit (AUD)',
        data: top5.map((d) => Number(d.monthlyProfit.toFixed(2))),
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    indexAxis: 'y' as const,
    scales: {
      x: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Top 5 Devices by Monthly Profit',
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">ROI Results</h1>
      <table className="w-full text-left border-collapse mb-8">
        <thead>
          <tr>
            <th className="p-2 border-b">Device</th>
            <th className="p-2 border-b">Upfront Cost (AUD)</th>
            <th className="p-2 border-b">Payback (months)</th>
          </tr>
        </thead>
        <tbody>
          {results.map((device) => (
            <tr key={device.slug} className="hover:bg-gray-50 dark:hover:bg-gray-800">
              <td className="p-2 border-b">
                <a href={`/device/${device.slug}`} className="text-blue-600 hover:underline">
                  {device.brand}
                </a>
              </td>
              <td className="p-2 border-b">${device.upfrontCost}</td>
              <td className={`p-2 border-b ${getPaybackColor(device.payback)}`}>
                {device.payback === Infinity ? 'N/A' : device.payback.toFixed(1)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {top5.length > 0 && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <Bar data={chartData} options={chartOptions} />
        </div>
      )}
    </div>
  );
}
