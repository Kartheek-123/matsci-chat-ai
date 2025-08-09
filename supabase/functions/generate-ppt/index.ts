import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { prompt } = await req.json()
    
    if (!prompt) {
      throw new Error('Prompt is required')
    }
    
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY')
    if (!geminiApiKey) {
      throw new Error('Gemini API key not configured')
    }

    // Create a specialized prompt for PPT generation
    const pptPrompt = `Create a professional presentation outline for: "${prompt}"

Please generate exactly 8-10 slides with the following structure for each slide:
- title: A clear, engaging title for the slide
- content: 2-3 sentences of main content (optional)
- bullets: An array of 3-5 bullet points with key information

Focus on:
- Professional and engaging content
- Logical flow and structure
- Clear and concise bullet points
- Material science expertise when relevant

Return only a JSON object with this exact structure:
{
  "slides": [
    {
      "title": "Slide Title",
      "content": "Main content text (optional)",
      "bullets": ["Bullet point 1", "Bullet point 2", "Bullet point 3"]
    }
  ]
}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: pptPrompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2000,
            candidateCount: 1
          }
        }),
      }
    )

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`)
    }

    const data = await response.json()
    
    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('No response from Gemini API')
    }

    let responseText = data.candidates[0].content.parts[0].text.trim()
    
    // Clean up the response to extract JSON
    if (responseText.includes('```json')) {
      responseText = responseText.split('```json')[1].split('```')[0]
    }
    if (responseText.includes('```')) {
      responseText = responseText.split('```')[1]
    }

    let slides
    try {
      const parsedResponse = JSON.parse(responseText)
      slides = parsedResponse.slides || []
    } catch (parseError) {
      console.error('Failed to parse Gemini response as JSON:', parseError)
      // Fallback: create basic slides from the prompt
      slides = [
        {
          title: "Introduction",
          content: `Overview of ${prompt}`,
          bullets: ["Welcome to this presentation", "Key topics to cover", "Objectives and goals"]
        },
        {
          title: "Main Content",
          content: `Detailed information about ${prompt}`,
          bullets: ["Key point 1", "Key point 2", "Key point 3"]
        },
        {
          title: "Conclusion",
          content: "Summary and next steps",
          bullets: ["Key takeaways", "Action items", "Thank you"]
        }
      ]
    }

    // Ensure we have at least some slides
    if (!slides || slides.length === 0) {
      slides = [
        {
          title: prompt.substring(0, 50),
          content: `This presentation covers: ${prompt}`,
          bullets: ["Introduction to the topic", "Key concepts and ideas", "Practical applications", "Conclusion and next steps"]
        }
      ]
    }

    return new Response(
      JSON.stringify({ slides }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Error in generate-ppt function:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to generate presentation',
        slides: [{
          title: "Error",
          content: "Failed to generate presentation content. Please try again.",
          bullets: ["Check your prompt", "Try a different topic", "Contact support if issue persists"]
        }]
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})