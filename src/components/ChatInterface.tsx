
import React, { useState, useRef, useEffect } from 'react';
import { Send, Atom, Image as ImageIcon, FileText, X, Presentation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageBubble } from '@/components/MessageBubble';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { PPTGenerator } from '@/components/PPTGenerator';
import { useChat, Message, Attachment } from '@/hooks/useChat';
import { useToast } from '@/hooks/use-toast';
interface ChatInterfaceProps {
  onChatSave?: (messages: Message[]) => void;
  loadedMessages?: Message[] | null;
}

export const ChatInterface = ({ onChatSave, loadedMessages }: ChatInterfaceProps) => {
  const { messages, isLoading, sendMessage, loadMessages } = useChat(onChatSave);
  const [input, setInput] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [showPPTGenerator, setShowPPTGenerator] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (loadedMessages) {
      loadMessages(loadedMessages);
    }
  }, [loadedMessages, loadMessages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && attachments.length === 0) || isLoading) return;

    await sendMessage(input.trim(), attachments);
    setInput('');
    setAttachments([]);
    if (imageInputRef.current) imageInputRef.current.value = '';
    if (pdfInputRef.current) pdfInputRef.current.value = '';
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const MAX_ATTACHMENTS = 3;
  const MAX_IMAGE_MB = 8;
  const MAX_PDF_MB = 15;

  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const addAttachments = async (files: File[], type: 'image' | 'pdf') => {
    if (!files || files.length === 0) return;

    const remainingSlots = MAX_ATTACHMENTS - attachments.length;
    if (remainingSlots <= 0) {
      toast({ title: 'Attachment limit reached', description: `You can attach up to ${MAX_ATTACHMENTS} items.` });
      return;
    }

    const toProcess = files.slice(0, remainingSlots);
    const newItems: Attachment[] = [];

    for (const file of toProcess) {
      if (type === 'image' && !file.type.startsWith('image/')) continue;
      if (type === 'pdf' && file.type !== 'application/pdf') continue;

      const sizeMB = file.size / (1024 * 1024);
      if ((type === 'image' && sizeMB > MAX_IMAGE_MB) || (type === 'pdf' && sizeMB > MAX_PDF_MB)) {
        toast({ title: 'File too large', description: `${file.name} exceeds the size limit.` });
        continue;
      }

      const dataUrl = await readFileAsDataURL(file);
      const previewUrl = type === 'image' ? URL.createObjectURL(file) : undefined;
      newItems.push({
        id: crypto.randomUUID(),
        type,
        mimeType: file.type,
        dataUrl,
        name: file.name,
        previewUrl,
      });
    }

    setAttachments(prev => [...prev, ...newItems]);
  };

  const onSelectImages: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    await addAttachments(files, 'image');
  };

  const onSelectPdfs: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    await addAttachments(files, 'pdf');
  };
  
  if (showPPTGenerator) {
    return (
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border bg-card">
          <h2 className="text-lg font-semibold">PPT Generator</h2>
          <Button 
            variant="outline" 
            onClick={() => setShowPPTGenerator(false)}
          >
            Back to Chat
          </Button>
        </div>
        <div className="flex-1 overflow-auto">
          <PPTGenerator />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Messages Area */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        {messages.length === 0 ? (
          <WelcomeScreen />
        ) : (
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex items-center gap-3 p-4">
                <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-full">
                  <Atom className="h-4 w-4 text-white animate-spin" />
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            )}
          </div>
        )}
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-border bg-card p-4">
        <div className="max-w-4xl mx-auto space-y-3">
          {/* Attachments Preview */}
          {attachments.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {attachments.map(att => (
                <div key={att.id} className="relative border border-border bg-muted/50 rounded-md p-2 flex items-center gap-2">
                  {att.type === 'image' ? (
                    <img src={att.previewUrl || att.dataUrl} alt={att.name || 'image'} className="h-16 w-16 object-cover rounded" />
                  ) : (
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground max-w-[160px] truncate">{att.name || 'document.pdf'}</span>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => setAttachments(prev => prev.filter(a => a.id !== att.id))}
                    className="absolute -top-2 -right-2 bg-card border border-border rounded-full p-1"
                    aria-label="Remove attachment"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex gap-3 items-end">
            <div className="flex-1 flex flex-col gap-2">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question or attach an image/PDF..."
                className="min-h-[50px] max-h-32 resize-none"
                disabled={isLoading}
              />
              <div className="flex items-center gap-2">
                <input ref={imageInputRef} type="file" accept="image/*" multiple className="hidden" onChange={onSelectImages} />
                <input ref={pdfInputRef} type="file" accept="application/pdf" multiple className="hidden" onChange={onSelectPdfs} />
                <Button type="button" variant="outline" size="sm" onClick={() => imageInputRef.current?.click()}>
                  <ImageIcon className="h-4 w-4" />
                  Image
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={() => pdfInputRef.current?.click()}>
                  <FileText className="h-4 w-4" />
                  PDF
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={() => setShowPPTGenerator(true)}>
                  <Presentation className="h-4 w-4" />
                  PPT Generator
                </Button>
              </div>
            </div>
            <Button
              type="submit"
              disabled={(!input.trim() && attachments.length === 0) || isLoading}
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-4 py-2 h-[50px]"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>

          <p className="text-xs text-muted-foreground mt-1 text-center">
            MaterialScienceGPT can make mistakes. Consider checking important information.
          </p>
        </div>
      </div>
    </div>
  );
};
