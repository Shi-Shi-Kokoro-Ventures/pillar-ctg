
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
    // Get environment variables and properly trim/clean it
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY')?.trim()
    if (!stripeKey) {
      throw new Error('Missing Stripe API key')
    }

    // Log key diagnostics (without revealing the full key)
    console.log(`Key prefix: ${stripeKey.substring(0, 7)}...`)
    console.log(`Key length: ${stripeKey.length}`)
    console.log(`Valid format check: ${stripeKey.startsWith('sk_test_') || stripeKey.startsWith('sk_live_')}`)

    // Initialize Stripe with proper error handling
    let stripe
    try {
      stripe = new Stripe(stripeKey, {
        apiVersion: '2023-10-16',
      })
      // Quick validation test
      console.log('Attempting to validate Stripe connection...')
    } catch (stripeInitError) {
      console.error('Error initializing Stripe client:', stripeInitError)
      throw new Error(`Failed to initialize Stripe: ${stripeInitError.message}`)
    }

    // Parse request body
    const requestData = await req.json()
    const { amount, donationType, successUrl, cancelUrl } = requestData

    if (!amount || !donationType || !successUrl || !cancelUrl) {
      throw new Error('Missing required parameters')
    }

    // Clean and validate amount (remove $ sign and convert to cents)
    const numericAmount = amount.replace(/[^0-9.]/g, '')
    const amountInCents = Math.round(parseFloat(numericAmount) * 100)

    if (isNaN(amountInCents) || amountInCents <= 0) {
      throw new Error('Invalid amount')
    }

    // Map frontend donation type to Stripe's expected format
    // "one-time" or "monthly" from frontend, but Stripe expects "payment" or "subscription"
    const stripeMode = donationType === 'monthly' ? 'subscription' : 'payment'
    const displayType = donationType === 'monthly' ? 'Monthly' : 'One-Time'

    console.log(`Creating ${donationType} checkout session for amount: $${numericAmount} (${amountInCents} cents), mode: ${stripeMode}`)

    // Create a Stripe Checkout Session
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
      // Add customer email collection
      billing_address_collection: 'auto',
      metadata: {
        donation_type: donationType,
        amount: numericAmount
      },
    })

    // Return the session ID and URL to the client
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
    
    // Detailed error reporting for debugging
    if (error.type) {
      console.error(`Stripe error type: ${error.type}`)
    }
    if (error.message) {
      console.error(`Error message: ${error.message}`)
    }
    if (error.stack) {
      console.error(`Stack trace: ${error.stack}`)
    }
    
    return new Response(
      JSON.stringify({ error: error.message || 'Unknown error occurred' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})
