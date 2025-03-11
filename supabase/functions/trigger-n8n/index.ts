
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

// CORS headers to allow requests from any origin
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
    const { webhookUrl, payload } = await req.json()
    
    if (!webhookUrl) {
      return new Response(
        JSON.stringify({ error: 'Missing n8n webhook URL' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }
    
    console.log(`Triggering n8n webhook at URL: ${webhookUrl}`)
    
    // Send the payload to the n8n webhook
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...payload,
        timestamp: new Date().toISOString(),
        source: 'PILLAR Initiative Website'
      }),
    })
    
    // Get the response data
    let responseData
    try {
      responseData = await response.json()
    } catch (e) {
      responseData = { text: await response.text() }
    }
    
    // Return the webhook response
    return new Response(
      JSON.stringify({ 
        success: true, 
        status: response.status,
        statusText: response.statusText,
        data: responseData
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  } catch (error) {
    console.error('Error triggering n8n webhook:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to trigger n8n webhook', 
        message: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
