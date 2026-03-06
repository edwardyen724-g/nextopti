import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

interface AuthedRequest extends NextApiRequest {
  user?: { id: string; email: string };
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

const rateLimit = new Map<string, number>(); // In-memory rate limit storage

export default async function handler(req: AuthedRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, password } = req.body;

  if (rateLimit.has(email)) {
    const attempts = rateLimit.get(email) || 0;
    if (attempts >= 5) {
      return res.status(429).json({ message: 'Too many requests, please try again later.' });
    }
    rateLimit.set(email, attempts + 1);
  } else {
    rateLimit.set(email, 1);
  }

  try {
    const { error, user } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return res.status(401).json({ message: error.message });
    }

    // Optionally clear failed attempt count on successful login
    rateLimit.delete(email);

    return res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
}