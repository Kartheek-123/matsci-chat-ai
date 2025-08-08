
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
    
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY')
    if (!geminiApiKey) {
      console.error('Gemini API key not found in environment variables')
      throw new Error('Gemini API key not configured')
    }

    console.log('Making request to Gemini API with', messages.length, 'messages...');

    // Convert messages to Gemini format
    const systemMessage = `You are MaterialScienceGPT, an AI assistant specialized in material science. You provide accurate, detailed, and helpful information about:
    - Material properties (mechanical, thermal, electrical, optical)
    - Material synthesis and processing methods
    - Characterization techniques and analysis
    - Applications of various materials
    - Crystal structures and phase diagrams
    - Nanomaterials and advanced materials
    - Corrosion and degradation mechanisms
    - Material selection and design
    
    Always provide scientific explanations with examples when appropriate. Be precise and educational in your responses.`;

    // Combine system message with conversation
    const conversationText = messages.map(msg => 
      `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
    ).join('\n\n');
    
    const fullPrompt = `${systemMessage}\n\n${conversationText}\n\nAssistant:`;

    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: fullPrompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1000,
        }
      }),
    })

    console.log('Gemini API response status:', geminiResponse.status);

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error('Gemini API error response:', errorText);
      
      // Handle specific Gemini error cases
      if (geminiResponse.status === 401) {
        throw new Error('Invalid Gemini API key. Please check your API key configuration.');
      } else if (geminiResponse.status === 429) {
        throw new Error('Gemini API rate limit exceeded. Please try again later.');
      } else if (geminiResponse.status === 500) {
        throw new Error('Gemini API is experiencing issues. Please try again later.');
      } else {
        throw new Error(`Gemini API error (${geminiResponse.status}): ${errorText}`);
      }
    }

    const data = await geminiResponse.json()
    console.log('Gemini API response received successfully');
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts[0]) {
      console.error('Invalid Gemini response format:', data);
      throw new Error('Invalid response format from Gemini API')
    }

    const responseData = { 
      message: data.candidates[0].content.parts[0].text,
      usage: data.usageMetadata 
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
