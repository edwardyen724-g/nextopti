import React from 'react';
import Image from 'next/image';
import { SupabaseClient } from '@supabase/supabase-js';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

const supabase: SupabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const LandingPage: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
        Supercharge Your Next.js Development with NextOpti
      </h1>
      <p className="text-lg text-center text-gray-600 mb-8">
        Optimize your Next.js development with smart tools for memory and routing.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <FeatureCard 
          title="Memory Usage Analyzer"
          description="Visual representation of memory usage during development." 
        />
        <FeatureCard 
          title="Routing Validator"
          description="Check for common routing errors and optimization suggestions." 
        />
        <FeatureCard 
          title="Incremental Build Tracker"
          description="Monitor build performance and identify bottlenecks." 
        />
        <FeatureCard 
          title="Debug Insights"
          description="Highlight potential areas of improvement in your Next.js codebase." 
        />
        <FeatureCard 
          title="User-friendly Dashboard"
          description="Centralized view of application health and optimization suggestions." 
        />
      </div>
      <Link href="/signup" className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
        Get Started with NextOpti
      </Link>
    </main>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default LandingPage;