
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import Stripe from 'https://esm.sh/stripe@13.11.0'

// Set up CORS headers for browser requests
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
    // Get environment variables
    const stripeKey = Deno.env.get('STRIPE_API_KEY_LIVE')
    if (!stripeKey) {
      throw new Error('Missing Stripe API key')
    }

    // Initialize Stripe
    const stripe = new Stripe(stripeKey, {
      apiVersion: '2023-10-16',
    })

    // Parse request body
    const requestData = await req.json()
    const { amount, donationType, successUrl, cancelUrl } = requestData

    if (!amount || !donationType || !successUrl || !cancelUrl) {
      throw new Error('Missing required parameters')
    }

    // Validate amount (should be in cents for Stripe)
    const amountValue = parseInt(amount.replace('$', '')) * 100
    if (isNaN(amountValue) || amountValue <= 0) {
      throw new Error('Invalid amount')
    }

    console.log(`Creating ${donationType} checkout session for amount: ${amount}`)

    // Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: donationType === 'monthly' ? 'Monthly Donation' : 'One-Time Donation',
              description: `${donationType === 'monthly' ? 'Monthly' : 'One-Time'} donation to P.I.L.L.A.R. Initiative`,
            },
            unit_amount: amountValue,
            recurring: donationType === 'monthly' ? { interval: 'month' } : undefined,
          },
          quantity: 1,
        },
      ],
      mode: donationType === 'monthly' ? 'subscription' : 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        donation_type: donationType,
      },
    })

    // Return the session ID to the client
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
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})
