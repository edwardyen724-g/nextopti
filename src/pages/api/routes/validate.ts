import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';
import { RateLimiterMemory } from 'rate-limiter-flexible';

interface AuthedRequest extends NextApiRequest {
  user?: { id: string; email: string };
}

const limiter = new RateLimiterMemory({
  points: 10, // 10 requests
  duration: 1, // per second
});

const validateRoute = async (req: AuthedRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    await limiter.consume(req.ip);

    const { route } = req.body;

    if (!route || typeof route !== 'string') {
      return res.status(400).json({ message: 'Invalid route provided.' });
    }

    // Here you would add logic to validate the route (this is a placeholder)
    const isValidRoute = true; // Simplified validation logic

    return res.status(200).json({ valid: isValidRoute });
  } catch (error) {
    return res.status(500).json({ message: error instanceof Error ? error.message : String(error) });
  }
};

export default async (req: AuthedRequest, res: NextApiResponse) => {
  const { user } = await getAuth(req); // Assuming getAuth() sets user

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  req.user = user;
  validateRoute(req, res);
};