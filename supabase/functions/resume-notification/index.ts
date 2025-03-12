
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
    const requestData = await req.json();
    const { webhookUrl, submissionType } = requestData;
    
    // Process based on submission type
    if (submissionType === 'housing-assistance') {
      console.log(`Housing assistance application received from ${requestData.firstName} ${requestData.lastName} (${requestData.email})`);
      
      // Prepare data for the webhook
      const payload = {
        submissionType: 'housing-assistance',
        applicantName: `${requestData.firstName} ${requestData.middleInitial ? requestData.middleInitial + '. ' : ''}${requestData.lastName}`,
        email: requestData.email,
        phone: requestData.phone,
        address: `${requestData.currentAddress}, ${requestData.city}, ${requestData.state} ${requestData.zip}`,
        housingStatus: requestData.housingStatus,
        householdSize: requestData.householdSize,
        householdIncome: `${requestData.householdIncome} ${requestData.incomePeriod}`,
        evictionNotice: requestData.evictionNotice,
        receivingAssistance: requestData.receivingAssistance,
        assistanceTypes: requestData.assistanceTypes || 'None',
        submissionDate: new Date().toISOString(),
        // Including all data for comprehensive record
        fullApplication: requestData
      };
      
      // Send to webhook (n8n, Zapier, etc.)
      if (webhookUrl) {
        await sendToWebhook(webhookUrl, payload);
      }
    } else {
      // Resume submission (original functionality)
      const { name, email, resumeFileName, resumeSize } = requestData;
      
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
      
      // Send to webhook (n8n, Zapier, etc.)
      if (webhookUrl) {
        await sendToWebhook(webhookUrl, payload);
      }
    }
    
    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Submission processed successfully" 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    console.error('Error processing submission:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process submission', 
        message: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

// Helper function to send data to webhook
async function sendToWebhook(webhookUrl: string, payload: any) {
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
    return response;
  } catch (error) {
    console.error(`Error triggering webhook: ${error.message}`);
    throw error;
  }
}
