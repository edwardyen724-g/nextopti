import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">Supercharge Your Next.js Development with NextOpti</h1>
        <p className="mt-4 text-xl text-gray-600">
          Optimize your Next.js development with smart tools for memory and routing.
        </p>
        <Link href="/get-started" className="mt-8 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Get Started
        </Link>
      </div>
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800">MVP Features</h2>
        <ul className="mt-4 space-y-2 text-left">
          <li>🧠 Memory Usage Analyzer — Visual representation of memory usage during development.</li>
          <li>🔗 Routing Validator — Check for common routing errors and optimization suggestions.</li>
          <li>⚡ Incremental Build Tracker — Monitor build performance and identify bottlenecks.</li>
          <li>🔍 Debug Insights — Highlight potential areas of improvement in your Next.js codebase.</li>
          <li>📊 User-friendly Dashboard — Centralized view of application health and optimization suggestions.</li>
        </ul>
      </section>
      <section className="mt-12">
        <Image
          src="/images/dashboard.png"
          alt="NextOpti Dashboard"
          width={600}
          height={400}
          className="rounded-lg shadow-lg"
        />
      </section>
    </main>
  );
}