
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import Stripe from 'https://esm.sh/stripe@13.11.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
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
    const endpointSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')

    if (!stripeKey || !endpointSecret) {
      console.error('Missing required environment variables');
      return new Response(
        JSON.stringify({ 
          error: 'Server configuration error', 
          details: 'Missing required environment variables' 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    })

    // Get the signature from the headers
    const signature = req.headers.get('stripe-signature')
    
    if (!signature) {
      console.error('No Stripe signature found in request headers');
      return new Response(
        JSON.stringify({ error: 'No Stripe signature', details: 'Request is missing stripe-signature header' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Get the raw body as text for signature verification
    const rawBody = await req.text()
    
    let event: Stripe.Event

    try {
      // Verify the event using the raw body and signature
      event = stripe.webhooks.constructEvent(rawBody, signature, endpointSecret)
      console.log('Webhook signature verified successfully')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      console.error(`Webhook signature verification failed: ${errorMessage}`)
      return new Response(
        JSON.stringify({ 
          error: 'Invalid signature', 
          details: `Webhook Error: ${errorMessage}` 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Handle the event
    console.log(`Processing verified webhook event: ${event.type}`)
    
    try {
      switch (event.type) {
        case 'checkout.session.completed': {
          const session = event.data.object as Stripe.Checkout.Session
          console.log(`Payment successful for session: ${session.id}`)
          // Handle the successful payment
          // You can add additional logic here like:
          // - Recording the donation in your database
          // - Sending confirmation emails
          // - Updating subscription status
          break
        }
        case 'payment_intent.succeeded': {
          const paymentIntent = event.data.object as Stripe.PaymentIntent
          console.log(`Payment intent succeeded: ${paymentIntent.id}`)
          break
        }
        default:
          console.log(`Unhandled event type: ${event.type}`)
      }

      return new Response(
        JSON.stringify({ received: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      )
    } catch (err) {
      console.error('Error processing webhook event:', err)
      return new Response(
        JSON.stringify({ 
          error: 'Event processing failed', 
          details: err instanceof Error ? err.message : 'Unknown error occurred'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }
  } catch (err) {
    console.error('Webhook handler error:', err)
    return new Response(
      JSON.stringify({ 
        error: 'Webhook handler failed', 
        details: err instanceof Error ? err.message : 'Unknown error occurred'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
