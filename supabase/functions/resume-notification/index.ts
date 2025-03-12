
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// CORS headers to allow requests from any origin
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }

  try {
    const { name, email, resumeFileName, resumeSize, webhookUrl } = await req.json();
    
    // Log the resume submission
    console.log(`Resume submission received from ${name} (${email})`);
    console.log(`Resume file: ${resumeFileName} (${resumeSize} KB)`);
    
    // Prepare data for the webhook
    const payload = {
      name,
      email,
      resumeFileName,
      resumeSize,
      submissionDate: new Date().toISOString(),
    };
    
    // Send to the provided webhook URL (n8n, Zapier, etc.)
    if (webhookUrl) {
      console.log(`Triggering webhook at URL: ${webhookUrl}`);
      
      try {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        
        console.log(`Webhook response status: ${response.status}`);
      } catch (error) {
        console.error(`Error triggering webhook: ${error.message}`);
      }
    } else {
      console.log("No webhook URL provided, skipping webhook trigger");
    }
    
    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Resume submission processed successfully" 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    console.error('Error processing resume submission:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process resume submission', 
        message: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
