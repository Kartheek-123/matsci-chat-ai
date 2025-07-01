
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('Chat completion function called');
    
    const requestData = await req.json()
    console.log('Request data received:', JSON.stringify(requestData, null, 2));
    
    const { messages } = requestData
    
    if (!messages || !Array.isArray(messages)) {
      console.error('Messages array is missing or invalid:', messages);
      throw new Error('Messages array is required')
    }
    
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openAIApiKey) {
      console.error('OpenAI API key not found in environment variables')
      throw new Error('OpenAI API key not configured')
    }

    console.log('Making request to OpenAI API with', messages.length, 'messages...');

    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are MaterialScienceGPT, an AI assistant specialized in material science. You provide accurate, detailed, and helpful information about:
            - Material properties (mechanical, thermal, electrical, optical)
            - Material synthesis and processing methods
            - Characterization techniques and analysis
            - Applications of various materials
            - Crystal structures and phase diagrams
            - Nanomaterials and advanced materials
            - Corrosion and degradation mechanisms
            - Material selection and design
            
            Always provide scientific explanations with examples when appropriate. Be precise and educational in your responses.`
          },
          ...messages
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    })

    console.log('OpenAI API response status:', openAIResponse.status);

    if (!openAIResponse.ok) {
      const errorText = await openAIResponse.text();
      console.error('OpenAI API error response:', errorText);
      
      // Handle specific OpenAI error cases
      if (openAIResponse.status === 401) {
        throw new Error('Invalid OpenAI API key. Please check your API key configuration.');
      } else if (openAIResponse.status === 429) {
        throw new Error('OpenAI API rate limit exceeded. Please try again later.');
      } else if (openAIResponse.status === 500) {
        throw new Error('OpenAI API is experiencing issues. Please try again later.');
      } else {
        throw new Error(`OpenAI API error (${openAIResponse.status}): ${errorText}`);
      }
    }

    const data = await openAIResponse.json()
    console.log('OpenAI API response received successfully');
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid OpenAI response format:', data);
      throw new Error('Invalid response format from OpenAI API')
    }

    const responseData = { 
      message: data.choices[0].message.content,
      usage: data.usage 
    };

    console.log('Sending successful response');

    return new Response(
      JSON.stringify(responseData),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Edge function error:', error);
    
    const errorResponse = {
      error: error.message || 'Unknown error occurred',
      details: error.toString()
    };

    console.log('Sending error response:', errorResponse);

    return new Response(
      JSON.stringify(errorResponse),
      {
        status: 400, // Changed from 500 to 400 for client errors
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})
