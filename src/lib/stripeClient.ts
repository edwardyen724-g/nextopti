import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export const getStripe = () => {
  if (!stripePromise) {
    throw new Error('Stripe promise not initialized');
  }
  return stripePromise;
};