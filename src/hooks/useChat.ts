
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Attachment {
  id: string;
  type: 'image' | 'pdf';
  mimeType: string;
  dataUrl: string; // data URL (base64) for sending to the edge function
  name?: string;
  previewUrl?: string; // object URL for local preview (images)
}

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  attachments?: Attachment[];
}

export const useChat = (onChatSave?: (messages: Message[]) => void) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (content: string, attachments?: Attachment[]) => {
    if (!content.trim() && (!attachments || attachments.length === 0)) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
      attachments: attachments && attachments.length > 0 ? attachments : undefined,
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Get all messages for context
      const conversationMessages = [...messages, userMessage];
      
      console.log('Sending message to edge function:', {
        messages: conversationMessages.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        attachments: userMessage.attachments?.map(a => ({ mimeType: a.mimeType, size: a.dataUrl?.length ?? 0 }))
      });

      const { data, error } = await supabase.functions.invoke('chat-completion', {
        body: {
          messages: conversationMessages.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          attachments: userMessage.attachments?.map(a => ({
            mimeType: a.mimeType,
            data: a.dataUrl,
            name: a.name,
            type: a.type,
          })) ?? []
        }
      });

      console.log('Edge function response:', { data, error });

      if (error) {
        console.error('Supabase function error:', error);
        
        // Handle different types of errors
        let errorMessage = 'Sorry, I encountered an error. Please try again.';
        
        if (error.message) {
          if (error.message.includes('API key')) {
            errorMessage = 'Gemini API key configuration issue. Please check your API key.';
          } else if (error.message.includes('rate limit')) {
            errorMessage = 'Rate limit exceeded. Please wait a moment and try again.';
          } else if (error.message.includes('network') || error.message.includes('timeout')) {
            errorMessage = 'Network error. Please check your connection and try again.';
          } else {
            errorMessage = `Error: ${error.message}`;
          }
        }
        
        throw new Error(errorMessage);
      }

      if (!data) {
        console.error('No data received from edge function');
        throw new Error('No response received from the AI service');
      }

      if (data.error) {
        console.error('Error in edge function response:', data.error);
        throw new Error(data.error);
      }

      if (!data.message) {
        console.error('No message in response:', data);
        throw new Error('Invalid response format from AI service');
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Auto-save the conversation after each assistant response
      const updatedMessages = [...messages, userMessage, assistantMessage];
      if (onChatSave && updatedMessages.length > 0) {
        onChatSave(updatedMessages);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: error instanceof Error ? error.message : 'Sorry, I encountered an error. Please try again.',
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
      
      // Auto-save even error conversations
      const updatedMessages = [...messages, userMessage, errorMessage];
      if (onChatSave && updatedMessages.length > 0) {
        onChatSave(updatedMessages);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    // Save current chat before clearing if it has messages
    if (messages.length > 0 && onChatSave) {
      onChatSave(messages);
    }
    setMessages([]);
  };

  const loadMessages = (loadedMessages: Message[]) => {
    setMessages(loadedMessages);
  };

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
    loadMessages,
  };
};
