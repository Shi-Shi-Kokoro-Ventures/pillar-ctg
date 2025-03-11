
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

// Environment variables
const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') || ''
const webhookSecretKey = Deno.env.get('N8N_WEBHOOK_SECRET') || 'pillar-n8n-webhook-secret'

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// CORS headers to allow requests from any origin
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-webhook-token',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
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
    console.log('No JSON body received or invalid JSON format')
  }

  try {
    // Validate webhook token for security
    const token = req.headers.get('x-webhook-token')
    if (token !== webhookSecretKey) {
      console.log('Unauthorized webhook request, invalid token')
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
        status: 401, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      })
    }

    // Process content update requests
    if (req.method === 'PUT' && body.action === 'update_content') {
      console.log('Processing content update request')
      
      // Extract the data from the request
      const { contentType, data } = body
      
      if (!contentType || !data) {
        return new Response(JSON.stringify({ error: 'Missing required fields' }), { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        })
      }

      // Handle different content types
      let result
      switch (contentType) {
        case 'news':
          // Update news items
          if (data.id) {
            // Update existing news item
            result = await supabase
              .from('news')
              .update({
                title: data.title,
                excerpt: data.excerpt,
                content: data.content,
                image: data.image,
                updated_at: new Date().toISOString()
              })
              .eq('id', data.id)
          } else {
            // Insert new news item
            result = await supabase
              .from('news')
              .insert({
                title: data.title,
                excerpt: data.excerpt,
                content: data.content,
                image: data.image,
                date: new Date().toISOString()
              })
          }
          break

        case 'programs':
          // Update program information
          if (data.id) {
            result = await supabase
              .from('programs')
              .update({
                title: data.title,
                description: data.description,
                icon: data.icon,
                link: data.link,
                updated_at: new Date().toISOString()
              })
              .eq('id', data.id)
          } else {
            result = await supabase
              .from('programs')
              .insert({
                title: data.title,
                description: data.description,
                icon: data.icon,
                link: data.link
              })
          }
          break

        case 'mission':
          // Update mission statement
          result = await supabase
            .from('site_content')
            .upsert({
              key: 'mission_statement',
              content: data,
              updated_at: new Date().toISOString()
            })
            .eq('key', 'mission_statement')
          break

        case 'statistics':
          // Update statistics
          result = await supabase
            .from('site_content')
            .upsert({
              key: 'statistics',
              content: data,
              updated_at: new Date().toISOString()
            })
            .eq('key', 'statistics')
          break

        default:
          return new Response(JSON.stringify({ error: 'Unsupported content type' }), { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          })
      }

      if (result.error) {
        console.error('Error updating content:', result.error)
        return new Response(JSON.stringify({ error: result.error.message }), { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        })
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: `${contentType} content updated successfully`,
          timestamp: new Date().toISOString(),
          data: result.data
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Process webhook data from n8n (existing functionality)
    if (req.method === 'POST') {
      // Log the request for debugging
      console.log('Webhook POST received from n8n')
      
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
          timestamp: new Date().toISOString(),
          supportedActions: [
            'Regular webhook POST calls',
            'PUT requests with action=update_content for content updates'
          ]
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
