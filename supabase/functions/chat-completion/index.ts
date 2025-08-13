
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
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')

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
    const conversationText = messages.map((msg: any) => 
      `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
    ).join('\n\n');

    const fullPrompt = `${systemMessage}\n\n${conversationText}\n\nAssistant:`;

    // Prepare attachment parts (images, pdfs) as inlineData for Gemini
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

    const hasPdf = Array.isArray(attachments) && attachments.some((a: any) => (a?.mimeType || '').toLowerCase().includes('pdf'))
    const imageDataUrls: string[] = Array.isArray(attachments)
      ? attachments
          .filter((a: any) => typeof a?.mimeType === 'string' && a.mimeType.startsWith('image/') && typeof a?.data === 'string')
          .map((a: any) => (a.data.includes('base64,') ? a.data : `data:${a.mimeType};base64,${a.data}`))
      : []

    // Helpers
    const tryGemini = async () => {
      if (!geminiApiKey) {
        return { ok: false, status: 400, errorText: 'Gemini API key not configured' }
      }
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [ { text: fullPrompt }, ...attachmentParts ] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 2000, candidateCount: 1 }
        }),
      })
      const status = res.status
      if (!res.ok) {
        const errorText = await res.text()
        return { ok: false, status, errorText }
      }
      const data = await res.json()
      if (!data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        return { ok: false, status: 500, errorText: 'Invalid response format from Gemini API' }
      }
      return { ok: true, message: data.candidates[0].content.parts[0].text, usage: data.usageMetadata }
    }

    const tryOpenAI = async () => {
      if (!openaiApiKey) {
        return { ok: false, status: 400, errorText: 'OpenAI API key not configured' }
      }

      // Build OpenAI-compatible messages
      let openAIMessages: any[] = []

      if (imageDataUrls.length > 0) {
        const parts: any[] = [ { type: 'text', text: conversationText } ]
        for (const url of imageDataUrls) {
          parts.push({ type: 'image_url', image_url: { url } })
        }
        openAIMessages = [
          { role: 'system', content: systemMessage },
          { role: 'user', content: parts }
        ]
      } else {
        // Text-only conversation
        openAIMessages = [
          { role: 'system', content: systemMessage },
          { role: 'user', content: conversationText }
        ]
      }

      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: openAIMessages,
          temperature: 0.7,
          max_tokens: 1500,
        }),
      })
      const status = res.status
      if (!res.ok) {
        const errorText = await res.text()
        return { ok: false, status, errorText }
      }
      const data = await res.json()
      const text = data?.choices?.[0]?.message?.content
      if (!text) {
        return { ok: false, status: 500, errorText: 'Invalid response format from OpenAI API' }
      }
      return { ok: true, message: text, usage: data?.usage }
    }

    let finalMessage = ''
    let usage: any = undefined

    // Strategy:
    // - If PDFs are attached, use Gemini (supports PDFs). On 429, reply with friendly message.
    // - If no PDFs, prefer OpenAI when available to avoid Gemini quotas; fallback to Gemini.
    if (hasPdf) {
      const g = await tryGemini()
      if (g.ok) {
        finalMessage = g.message
        usage = g.usage
      } else if (g.status === 429) {
        finalMessage = 'We\'re temporarily at capacity for PDF analysis (Gemini rate limit). Please retry in about a minute, or try without PDFs.'
      } else {
        finalMessage = `I couldn\'t analyze the PDF right now. Details: ${g.errorText || 'unknown error'}`
      }
    } else {
      let done = false
      if (openaiApiKey) {
        const o = await tryOpenAI()
        if (o.ok) {
          finalMessage = o.message
          usage = o.usage
          done = true
        }
      }
      if (!done) {
        const g = await tryGemini()
        if (g.ok) {
          finalMessage = g.message
          usage = g.usage
        } else if (g.status === 429 && openaiApiKey) {
          const o2 = await tryOpenAI()
          if (o2.ok) {
            finalMessage = o2.message
            usage = o2.usage
          } else {
            finalMessage = 'We\'re receiving too many requests at the moment. Please wait a bit and try again.'
          }
        } else {
          finalMessage = `I\'m having trouble responding right now. Details: ${g.errorText || 'unknown error'}`
        }
      }
    }

    // Always return 200 with a safe payload to avoid non-2xx errors in the client
    const responseData = { 
      message: finalMessage || 'I\'m having trouble responding right now. Please try again shortly.',
      usage
    };

    return new Response(
      JSON.stringify(responseData),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Edge function error:', error);
    
    // Return a graceful 200 response even on unexpected errors
    const errorResponse = {
      message: 'Something went wrong on our side. Please try again in a moment.',
      error: (error as any)?.message || 'Unknown error occurred',
    };

    console.log('Sending graceful error response');

    return new Response(
      JSON.stringify(errorResponse),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})
