import './globals.css';
import { ReactNode } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Road-Reward Finder',
  description: 'Personalized ROI-ranked drive-to-earn device suggestions.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 min-h-screen flex flex-col">
     <H<Header />
        <main className="flex-grow container mx-auto p-4">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
