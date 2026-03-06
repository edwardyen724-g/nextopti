import React from 'react';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'NextOpti',
  description: 'Optimize your Next.js development with smart tools for memory and routing.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-gray-800 text-white p-4">
          <h1 className="text-2xl font-bold">Supercharge Your Next.js Development with NextOpti</h1>
          <p className="mt-2">{metadata.description}</p>
        </header>
        <main className="container mx-auto p-4">
          {children}
        </main>
        <footer className="bg-gray-800 text-white p-4 text-center">
          <p>© {new Date().getFullYear()} NextOpti. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}