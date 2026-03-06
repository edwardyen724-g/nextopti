import type { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

interface AuthedRequest extends NextApiRequest {
  user?: { uid: string };
}

const buildsMap = new Map<string, { count: number }>();

export default async function trackBuilds(
  req: AuthedRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { buildId } = req.body;

    if (!buildId) {
      return res.status(400).json({ message: "Build ID is required" });
    }

    if (buildsMap.has(buildId)) {
      buildsMap.get(buildId)!.count += 1;
    } else {
      buildsMap.set(buildId, { count: 1 });
    }

    await admin.firestore().collection("builds").add({
      userId: req.user.uid,
      buildId,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    return res.status(200).json({ message: "Build tracked successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
}