
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
      throw new Error('Missing Stripe API key')
    }
    
    // Log key diagnostics (safely - without revealing the actual key)
    const keyPrefix = stripeKey.substring(0, 7)
    const keyLength = stripeKey.length
    const starredKey = `${keyPrefix}${'*'.repeat(keyLength - 10)}${stripeKey.slice(-3)}`
    
    console.log(`Stripe key info - Format: ${starredKey}, Length: ${keyLength}`)
    
    // Initialize Stripe with Deno-compatible fetch client
    console.log('Initializing Stripe client...')
    
    try {
      const stripe = new Stripe(stripeKey, {
        apiVersion: '2023-10-16',
        httpClient: Stripe.createFetchHttpClient(),
      })
      
      console.log('Stripe client initialized successfully')
      
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
    } catch (stripeError) {
      console.error('Stripe operation error:', stripeError)
      
      // Detailed Stripe error reporting
      const errorDetails = {
        message: stripeError.message || 'Unknown Stripe error',
        type: stripeError.type || 'Unknown',
        code: stripeError.code || 'none',
        statusCode: stripeError.statusCode || 'none',
      }
      
      console.error('Stripe error details:', JSON.stringify(errorDetails))
      
      return new Response(
        JSON.stringify({ 
          error: 'Stripe operation failed', 
          details: errorDetails 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      )
    }
  } catch (error) {
    console.error('General error creating checkout session:', error)
    
    // Detailed error reporting for debugging
    const errorInfo = {
      message: error.message || 'Unknown error',
      stack: error.stack ? error.stack.substring(0, 200) + '...' : 'No stack trace',
      name: error.name || 'GeneralError'
    }
    
    console.error('Error details:', JSON.stringify(errorInfo))
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process donation request',
        details: errorInfo
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})
