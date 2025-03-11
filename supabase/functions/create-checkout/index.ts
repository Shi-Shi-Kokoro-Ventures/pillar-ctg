
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
    // Get environment variables
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY')
    if (!stripeKey) {
      console.error('Missing Stripe API key')
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    // Initialize Stripe
    const stripe = new Stripe(stripeKey, {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    })

    // Parse request body
    const { amount, donationType, successUrl, cancelUrl } = await req.json()

    if (!amount || !donationType || !successUrl || !cancelUrl) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Clean and validate amount
    const numericAmount = amount.replace(/[^0-9.]/g, '')
    const amountInCents = Math.round(parseFloat(numericAmount) * 100)

    if (isNaN(amountInCents) || amountInCents <= 0) {
      return new Response(
        JSON.stringify({ error: 'Invalid amount' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Create line items based on donation type
    const stripeMode = donationType === 'monthly' ? 'subscription' : 'payment'
    const displayType = donationType === 'monthly' ? 'Monthly' : 'One-Time'

    console.log(`Creating ${donationType} checkout session for amount: $${numericAmount}`)

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
    })

    // Return the session URL directly
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
    console.error('Stripe checkout error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Payment processing error',
        details: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: error.statusCode || 500
      }
    )
  }
})
