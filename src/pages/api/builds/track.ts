import type { NextApiRequest, NextApiResponse } from 'next';
import admin from 'firebase-admin';
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string);
  initializeApp({
    credential: cert(serviceAccount),
  });
}

const db = getFirestore();

interface AuthedRequest extends NextApiRequest {
  user?: { uid: string; email: string };
}

const inMemoryRateLimit = new Map<string, { count: number; timestamp: number }>();

async function rateLimiter(ip: string) {
  const limit = 10; // requests
  const windowMs = 60 * 1000; // 1 minute

  const currentTime = Date.now();
  const requestInfo = inMemoryRateLimit.get(ip);

  if (requestInfo) {
    const { count, timestamp } = requestInfo;

    if (currentTime - timestamp < windowMs) {
      if (count >= limit) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }

      inMemoryRateLimit.set(ip, { count: count + 1, timestamp });
    } else {
      inMemoryRateLimit.set(ip, { count: 1, timestamp: currentTime });
    }
  } else {
    inMemoryRateLimit.set(ip, { count: 1, timestamp: currentTime });
  }
}

export default async function handler(req: AuthedRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { user } = req;
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  try {
    await rateLimiter(ip as string);

    const { buildId, memoryUsage, routingErrors, performanceMetrics } = req.body;

    if (!buildId || !user) {
      return res.status(400).json({ message: 'Invalid request data' });
    }

    const buildData = {
      buildId,
      userId: user.uid,
      memoryUsage,
      routingErrors,
      performanceMetrics,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await db.collection('builds').add(buildData);

    res.status(201).json({ message: 'Build tracked successfully' });
  } catch (err) {
    res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
}