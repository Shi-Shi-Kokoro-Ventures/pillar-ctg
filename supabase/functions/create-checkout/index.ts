
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
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY')
    if (!stripeKey) {
      console.error('Missing Stripe API key')
      return new Response(
        JSON.stringify({ 
          error: 'Server configuration error', 
          details: { message: 'Missing Stripe API key' } 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      )
    }
    
    // IMPORTANT: Verify key format - must start with sk_test_ or sk_live_
    if (!stripeKey.startsWith('sk_test_') && !stripeKey.startsWith('sk_live_')) {
      console.error('Invalid Stripe key format - must start with sk_test_ or sk_live_')
      return new Response(
        JSON.stringify({ 
          error: 'Invalid API key format', 
          details: { message: 'API key must start with sk_test_ or sk_live_' } 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      )
    }
    
    // Initialize Stripe with Deno-compatible fetch client
    console.log('Initializing Stripe client...')
    
    const stripe = new Stripe(stripeKey, {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    })
    
    console.log('Stripe client initialized successfully')
    
    // Parse request body
    const requestData = await req.json()
    const { amount, donationType, successUrl, cancelUrl } = requestData

    if (!amount || !donationType || !successUrl || !cancelUrl) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      )
    }

    // Clean and validate amount (remove $ sign and convert to cents)
    const numericAmount = amount.replace(/[^0-9.]/g, '')
    const amountInCents = Math.round(parseFloat(numericAmount) * 100)

    if (isNaN(amountInCents) || amountInCents <= 0) {
      return new Response(
        JSON.stringify({ error: 'Invalid amount' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      )
    }

    // Map frontend donation type to Stripe's expected format
    const stripeMode = donationType === 'monthly' ? 'subscription' : 'payment'
    const displayType = donationType === 'monthly' ? 'Monthly' : 'One-Time'

    console.log(`Creating ${donationType} checkout session for amount: $${numericAmount} (${amountInCents} cents), mode: ${stripeMode}`)

    // Create a Stripe Checkout Session
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
        // Add customer email collection
        billing_address_collection: 'auto',
        metadata: {
          donation_type: donationType,
          amount: numericAmount
        },
      })

      console.log('Checkout session created successfully:', session.id)
      
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
    } catch (stripeError) {
      console.error('Stripe operation error:', stripeError)
      
      // Detailed Stripe error reporting
      return new Response(
        JSON.stringify({ 
          error: 'Stripe operation failed', 
          details: stripeError
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      )
    }
  } catch (error) {
    console.error('General error creating checkout session:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process donation request',
        details: error
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})
