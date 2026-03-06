# NextOpti

> Optimize your Next.js development with smart tools for memory and routing.

**Status:** 🚧 In Development

## Problem
Developers using Next.js often experience productivity roadblocks due to memory spikes and complex routing issues. NextOpti provides tailored solutions that enhance debugging and streamline build times.

## MVP Features
- Memory Usage Analyzer — visual representation of memory usage during development.
- Routing Validator — check for common routing errors and optimization suggestions.
- Incremental Build Tracker — monitor build performance and identify bottlenecks.
- Debug Insights — highlight potential areas of improvement in your Next.js codebase.
- User-friendly Dashboard — centralized view of application health and optimization suggestions.

## Tech Stack
- **Frontend:** Next.js 14 (App Router)
- **Backend:** Next.js API Routes
- **Database:** Supabase Postgres
- **Auth:** Supabase Auth
- **Payments:** Stripe
- **Hosting:** Vercel

## Architecture Notes
The choice of Next.js API Routes simplifies the development by keeping both frontend and backend code within the same framework. Supabase provides an integrated solution for authentication and database management, reducing the time to implement these features.

## User Stories
- Memory Usage Analyzer
- Routing Validator
- Incremental Build Tracker
- Debug Insights
- User-friendly Dashboard
- User Authentication
- Subscription Management

## Launch Checklist
- [ ] Complete all MVP features
- [ ] Finalize API endpoints and DB schema
- [ ] Test user authentication flow
- [ ] Create landing page content and design

## Setup
```bash
cp .env.example .env.local
# Fill in your environment variables
npm install
npm run dev
```