import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Road-Reward Finder',
  description: 'Personalized ROI-ranked drive-to-earn device suggestions.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const year = new Date().getFullYear();
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 min-h-screen flex flex-col">
        <header className="p-4 shadow-md">
          <h1 className="text-2xl font-bold">Road-Reward Finder</h1>
        </header>
        <main className="flex-grow container mx-auto p-4">
          {children}
        </main>
        <footer className="p-4 border-t">
          <p>© {year} Road‑Reward Finder</p>
        </footer>
      </body>
    </html>
  );
}
