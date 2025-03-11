import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import Stripe from 'https://esm.sh/stripe@13.11.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders, status: 204 })
  }

  try {
    // Get environment variables and validate Stripe key
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY')
    if (!stripeKey) {
      console.error('Missing Stripe API key')
      return new Response(
        JSON.stringify({ error: 'Server configuration error', details: 'Missing Stripe API key' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    // Initialize Stripe with proper error handling
    let stripe;
    try {
      stripe = new Stripe(stripeKey, {
        apiVersion: '2023-10-16',
        httpClient: Stripe.createFetchHttpClient(),
        maxNetworkRetries: 3, // Add retries for reliability
      })
      
      // Verify Stripe key is valid with a lightweight API call
      await stripe.paymentMethods.list({ limit: 1 });
      console.log("Stripe key verification successful");
    } catch (stripeInitError) {
      console.error("Stripe initialization or key validation error:", stripeInitError);
      return new Response(
        JSON.stringify({ 
          error: 'Stripe configuration error', 
          details: 'Could not initialize Stripe with the provided credentials' 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    // Parse request body with better error handling
    let requestData;
    try {
      const bodyText = await req.text();
      requestData = JSON.parse(bodyText);
      console.log("Request data parsed successfully", requestData);
    } catch (parseError) {
      console.error("Request body parse error:", parseError);
      return new Response(
        JSON.stringify({ error: 'Invalid request format', details: 'Could not parse request JSON' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }
    
    const { amount, donationType, successUrl, cancelUrl } = requestData;

    // Validate required parameters
    if (!amount || !donationType || !successUrl || !cancelUrl) {
      console.error('Missing required parameters:', { amount, donationType, successUrl, cancelUrl });
      return new Response(
        JSON.stringify({ 
          error: 'Missing required parameters',
          details: {
            amount: amount ? 'valid' : 'missing',
            donationType: donationType ? 'valid' : 'missing',
            successUrl: successUrl ? 'valid' : 'missing',
            cancelUrl: cancelUrl ? 'valid' : 'missing',
          }
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Clean and validate amount with more robust parsing
    let numericAmount = amount.replace(/[^0-9.]/g, '')
    if (numericAmount === "") {
      console.error('Empty amount after cleaning:', amount);
      return new Response(
        JSON.stringify({ error: 'Invalid amount', details: 'Amount must contain numeric digits' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }
    
    const amountInCents = Math.round(parseFloat(numericAmount) * 100)
    if (isNaN(amountInCents) || amountInCents <= 0) {
      console.error('Invalid amount:', amount, 'parsed as:', numericAmount);
      return new Response(
        JSON.stringify({ error: 'Invalid amount', details: `Could not parse "${amount}" into a valid number` }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Create Stripe checkout session with better error handling
    const stripeMode = donationType === 'monthly' ? 'subscription' : 'payment'
    const displayType = donationType === 'monthly' ? 'Monthly' : 'One-Time'

    console.log(`Creating ${donationType} checkout session for amount: $${numericAmount} (${amountInCents} cents), mode: ${stripeMode}`);

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `${displayType} Donation`,
                description: `${displayType} donation to P.I.L.L.A.R. Initiative`,
              },
              unit_amount: amountInCents,
              recurring: donationType === 'monthly' ? { interval: 'month' } : undefined,
            },
            quantity: 1,
          },
        ],
        mode: stripeMode,
        success_url: successUrl,
        cancel_url: cancelUrl,
        billing_address_collection: 'auto',
        metadata: {
          donation_type: donationType,
          amount: numericAmount
        },
      });

      // Return the session URL directly with proper logging
      console.log('Checkout session created successfully:', session.id, 'with URL:', session.url);
      
      if (!session.url) {
        throw new Error('No URL returned from Stripe');
      }

      return new Response(
        JSON.stringify({ 
          sessionId: session.id,
          url: session.url 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      )
    } catch (stripeError) {
      console.error('Stripe session creation error:', stripeError);
      const errorCode = stripeError.code || 'unknown';
      const statusCode = stripeError.statusCode || 500;
      
      // Provide more detailed error information
      return new Response(
        JSON.stringify({ 
          error: 'Payment processing error',
          details: stripeError.message,
          code: errorCode,
          type: stripeError.type
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: statusCode
        }
      )
    }
  } catch (error) {
    console.error('Uncaught error in checkout function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Unexpected server error',
        details: error.message || 'Unknown error occurred'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})
