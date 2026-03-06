import { loadStripe } from '@stripe/stripe-js';

let stripePromise: Promise<ReturnType<typeof loadStripe>> | null = null;

export const getStripe = () => {
  if (!stripePromise) {
    const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
    if (!stripePublicKey) {
      throw new Error('Missing Stripe public key in environment variables');
    }
    stripePromise = loadStripe(stripePublicKey);
  }
  return stripePromise;
};