import React from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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
    <html lang="en" className={inter.className}>
      <body>
        <Navbar />
        <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
          <h1 className="text-2xl font-bold text-center">Supercharge Your Next.js Development with NextOpti</h1>
          <section className="mt-6 text-center">
            {children}
          </section>
        </main>
        <Footer />
      </body>
    </html>
  );
}