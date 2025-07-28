"use client";

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const [vehicle, setVehicle] = useState('car');
  const [kms, setKms] = useState(50);
  const [days, setDays] = useState(5);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (kms <= 0) return;
    const query = new URLSearchParams({
      vehicle,
      kms: kms.toString(),
      days: days.toString(),
    }).toString();
    router.push(`/results?${query}`);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white dark:bg-gray-800 shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Find your Road Reward ROI</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Vehicle type</label>
          <select
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
            className="mt-1 w-full p-2 border rounded bg-gray-50 dark:bg-gray-700"
          >
            <option value="car">Car</option>
            <option value="van">Van</option>
            <option value="suv">SUV</option>
            <option value="motorcycle">Motorcycle</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">Daily kilometres</label>
          <input
            type="number"
            value={kms}
            onChange={(e) => setKms(Number(e.target.value))}
            min={0}
            className="mt-1 w-full p-2 border rounded bg-gray-50 dark:bg-gray-700"
          />
        </div>
        <div>
          <label className="block font-medium">Average days per week: {days}</label>
          <input
            type="range"
            min={1}
            max={7}
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Calculate ROI
        </button>
      </form>
    </div>
  );
}
