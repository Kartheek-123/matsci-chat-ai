
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
    const requestData = await req.json()
    const { messages, attachments } = requestData
    
    if (!messages || !Array.isArray(messages)) {
      throw new Error('Messages array is required')
    }
    
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY')
    if (!geminiApiKey) {
      throw new Error('Gemini API key not configured')
    }

    // Enhanced system message for better PDF and image analysis
    const systemMessage = `You are MaterialScienceGPT, an advanced AI assistant specializing in materials science and engineering. 

    When analyzing PDFs, extract and reference specific information from the document content including:
    - Research data, experimental results, and technical specifications
    - Material properties, synthesis methods, and characterization data
    - Graphs, tables, and numerical data presented in the document
    - Always cite specific sections or findings from the PDF when answering questions

    When analyzing images, identify materials, microstructures, defects, crystal structures, and material properties.

    Provide detailed, technical responses with scientific accuracy. Reference uploaded documents directly in your answers.`;

    // Optimize conversation formatting
    const conversationText = messages.map(msg => 
      `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
    ).join('\n\n');
    
    const fullPrompt = `${systemMessage}\n\n${conversationText}\n\nAssistant:`;

    // Prepare attachment parts (images, pdfs) as inlineData
    const attachmentParts = Array.isArray(attachments)
      ? attachments
          .filter((a: any) => typeof a?.mimeType === 'string' && typeof a?.data === 'string')
          .map((a: any) => {
            const data = a.data.includes('base64,') ? a.data.split('base64,')[1] : a.data
            return {
              inlineData: {
                mimeType: a.mimeType,
                data,
              }
            }
          })
      : [];

    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: fullPrompt },
              ...attachmentParts,
            ]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2000,
            candidateCount: 1
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
