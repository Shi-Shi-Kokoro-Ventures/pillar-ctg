
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

// CORS headers to allow requests from any origin
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders, status: 204 })
  }

  // Get request details
  let body = {}
  try {
    body = await req.json()
    console.log('Received webhook data:', body)
  } catch (error) {
    // If the request doesn't include JSON data, use an empty object
    console.log('No JSON body received')
  }

  try {
    // Process the webhook data from n8n
    // This function would handle incoming webhook calls from n8n
    if (req.method === 'POST') {
      // Log the request for debugging
      console.log('Webhook POST received from n8n')
      
      // You can implement authentication by checking for a secret token
      // const token = req.headers.get('x-webhook-token')
      // if (token !== 'your-secret-token') {
      //   return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
      //     status: 401, 
      //     headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      //   })
      // }

      // Here you would process the data from n8n and do something with it
      // For example, update a database, send a notification, etc.

      // Return a successful response
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Webhook received and processed successfully',
          received_at: new Date().toISOString(),
          data: body
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Handle GET requests - can be used to test if the webhook is working
    if (req.method === 'GET') {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'n8n webhook endpoint is active',
          timestamp: new Date().toISOString()
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // If the request method is not supported
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { 
        status: 405, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  } catch (error) {
    console.error('Error processing webhook:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error', 
        message: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
