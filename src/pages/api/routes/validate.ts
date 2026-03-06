import type { NextApiRequest, NextApiResponse } from 'next';
import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { rateLimit } from '../../../lib/rateLimit'; // Assume you have a utility for rate limiting

initializeApp({
  credential: {
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'), 
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  },
});

interface AuthedRequest extends NextApiRequest {
  uid?: string;
}

const limiter = new Map<string, { count: number; timestamp: number }>();

async function validateRoute(req: AuthedRequest, res: NextApiResponse) {
  const now = Date.now();
  const rateLimitKey = req.headers['x-real-ip'] || req.connection.remoteAddress;

  if (!rateLimitKey || limiter.get(rateLimitKey as string)?.count > 10) {
    return res.status(429).json({ message: 'Too many requests, please try again later.' });
  }

  try {
    const { token } = req.body;

    // Verify the token and extract UID
    const decodedToken = await getAuth().verifyIdToken(token);
    req.uid = decodedToken.uid;

    // At this point, you would implement the route validation logic
    const validationResult = checkRouteValidity(req.body.route); // Assume this is your route validation logic

    // Rate limiting logic
    const currentLimit = limiter.get(rateLimitKey as string) || { count: 0, timestamp: now };
    limiter.set(rateLimitKey as string, {
      count: currentLimit.count + 1,
      timestamp: currentLimit.timestamp,
    });

    return res.status(200).json({ valid: validationResult });
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  } finally {
    // Clean up old entries in rate limit
    for (const [key, value] of limiter.entries()) {
      if (now - value.timestamp > 60000) { // 1 minute expiry
        limiter.delete(key);
      }
    }
  }
}

function checkRouteValidity(route: string) {
  // Mock validation logic; implement your real validation here
  return route.startsWith('/') && route.length < 255; 
}

export default validateRoute;