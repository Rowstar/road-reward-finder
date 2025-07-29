"use client";

import { useState, useEffect } from 'react';

export default function Header() {
  const [dark, setDark] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') {
      setDark(true);
    }
  }, []);

  // Apply theme to html element whenever it changes
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return (
    <header className="flex items-center justify-between py-4 px-6 bg-gray-100 dark:bg-gray-900 shadow">
      <h1 className="text-xl font-bold">Road-Reward Finder</h1>
      <button
        onClick={() => setDark(!dark)}
        className="p-2 rounded bg-gray-200 dark:bg-gray-800"
        aria-label="Toggle dark mode"
      >
        {dark ? '🌙' : '☀️'}
      </button>
    </header>
  );
}
