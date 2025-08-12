import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Share2, FileText, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import pptxgen from 'pptxgenjs';
import { supabase } from '@/integrations/supabase/client';

interface GeneratedPPT {
  id: string;
  title: string;
  downloadUrl: string;
  shareUrl: string;
}

export const PPTGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPPT, setGeneratedPPT] = useState<GeneratedPPT | null>(null);

  const generatePPT = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt to generate your presentation');
      return;
    }

    setIsGenerating(true);
    try {
      // Create new presentation
      const pptx = new pptxgen();
      
      // Set presentation properties
      pptx.author = 'MaterialScienceGPT';
      pptx.company = 'AI Presentation Generator';
      pptx.subject = 'AI Generated Presentation';
      pptx.title = prompt.substring(0, 50) + '...';

      // Generate slides based on prompt using AI
      const { data, error } = await supabase.functions.invoke('generate-ppt', {
        body: { prompt }
      });

      if (error) throw error;

      const slides = data.slides || [];

      // Create slides
      slides.forEach((slideData: any, index: number) => {
        const slide = pptx.addSlide();
        
        // Add title
        slide.addText(slideData.title, {
          x: 0.5,
          y: 0.5,
          w: 9,
          h: 1,
          fontSize: 28,
          bold: true,
          color: '2E86AB',
          align: 'center'
        });

        // Add content
        if (slideData.content) {
          slide.addText(slideData.content, {
            x: 0.5,
            y: 2,
            w: 9,
            h: 4,
            fontSize: 16,
            color: '333333'
          });
        }

        // Add bullet points if available
        if (slideData.bullets && slideData.bullets.length > 0) {
          slideData.bullets.forEach((bullet: string, bulletIndex: number) => {
            slide.addText(`• ${bullet}`, {
              x: 1,
              y: 2.5 + (bulletIndex * 0.5),
              w: 8,
              h: 0.4,
              fontSize: 14,
              color: '666666'
            });
          });
        }
      });

      // Generate the presentation
      const pptBlob = await pptx.write({ outputType: 'blob' } as any);
      
      // Create download URL
      const downloadUrl = URL.createObjectURL(pptBlob as Blob);
      
      // Generate unique ID and share URL
      const pptId = crypto.randomUUID();
      const shareUrl = `${window.location.origin}/share/ppt/${pptId}`;

      // Store PPT data in Supabase for sharing
      const { error: uploadError } = await supabase.storage
        .from('presentations')
        .upload(`${pptId}.pptx`, pptBlob);

      if (uploadError) {
        console.warn('Could not upload for sharing:', uploadError);
      }

      setGeneratedPPT({
        id: pptId,
        title: prompt.substring(0, 50) + '...',
        downloadUrl,
        shareUrl
      });

      toast.success('Presentation generated successfully!');
    } catch (error) {
      console.error('Error generating PPT:', error);
      toast.error('Failed to generate presentation. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadPPT = () => {
    if (generatedPPT) {
      const link = document.createElement('a');
      link.href = generatedPPT.downloadUrl;
      link.download = `${generatedPPT.title}.pptx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Presentation downloaded!');
    }
  };

  const sharePPT = async () => {
    if (generatedPPT) {
      try {
        await navigator.clipboard.writeText(generatedPPT.shareUrl);
        toast.success('Share link copied to clipboard!');
      } catch (error) {
        toast.error('Failed to copy link');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-full px-6 py-2 mb-6">
          <Sparkles className="h-5 w-5 text-purple-600" />
          <span className="text-sm font-medium text-purple-600">AI-Powered PPT Generator</span>
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
          Generate presentations
          <br />
          with AI magic
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Transform your ideas into professional presentations instantly. 
          Just describe what you need, and our AI will create stunning slides for you.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-6"
      >
        <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50/50">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">
                  What would you like to present?
                </label>
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your presentation topic... (e.g., 'Create a presentation about renewable energy sources, including solar, wind, and hydroelectric power with market statistics and future trends')"
                  className="min-h-32 text-base border-2 border-gray-200 focus:border-purple-500 rounded-xl resize-none"
                  disabled={isGenerating}
                />
              </div>

              <Button
                onClick={generatePPT}
                disabled={isGenerating || !prompt.trim()}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:transform-none"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Generating your presentation...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5 mr-2" />
                    Generate Presentation
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {generatedPPT && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <FileText className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">Presentation Ready!</h3>
                    <p className="text-gray-600">{generatedPPT.title}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={downloadPPT}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium transition-colors"
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Download PPT
                  </Button>
                  <Button
                    onClick={sharePPT}
                    variant="outline"
                    className="flex-1 border-green-200 text-green-700 hover:bg-green-50 py-3 rounded-xl font-medium"
                  >
                    <Share2 className="h-5 w-5 mr-2" />
                    Copy Share Link
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};