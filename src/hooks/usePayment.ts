import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { supabase } from '../lib/supabaseClient';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

const usePayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCheckoutSession = async (priceId: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: supabaseError } = await supabase
        .functions
        .invoke('create-checkout-session', {
          body: { priceId },
        });

      if (supabaseError) {
        throw new Error(supabaseError.message);
      }

      const { url } = data;
      const stripe = await stripePromise;

      if (stripe && url) {
        await stripe.redirectToCheckout({ sessionId: url });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  return {
    createCheckoutSession,
    loading,
    error,
  };
};

export default usePayment;