import { defineConfig } from 'next/config';

export default defineConfig({
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['your-image-domain.com'], // Replace with your allowed image domains
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
  },
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
});