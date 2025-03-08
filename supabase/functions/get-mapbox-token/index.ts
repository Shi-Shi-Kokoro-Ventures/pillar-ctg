
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the Mapbox token from Supabase secrets
    const mapboxToken = Deno.env.get('MAPBOX_KEY');

    if (!mapboxToken) {
      throw new Error('MAPBOX_KEY not found in environment');
    }

    return new Response(
      JSON.stringify({
        token: mapboxToken,
      }),
      { 
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 200,
      },
    );
  } catch (error) {
    console.error('Error getting Mapbox token:', error);

    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      { 
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 500,
      }
    );
  }
});
