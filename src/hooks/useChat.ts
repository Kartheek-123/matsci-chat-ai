
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export const useChat = (onChatSave?: (messages: Message[]) => void) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
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
        }))
      });

      const { data, error } = await supabase.functions.invoke('chat-completion', {
        body: {
          messages: conversationMessages.map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        }
      });

      console.log('Edge function response:', { data, error });

      if (error) {
        console.error('Supabase function error:', error);
        
        // Handle different types of errors
        let errorMessage = 'Sorry, I encountered an error. Please try again.';
        
        if (error.message) {
          if (error.message.includes('API key')) {
            errorMessage = 'OpenAI API key configuration issue. Please check your API key.';
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
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: error instanceof Error ? error.message : 'Sorry, I encountered an error. Please try again.',
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
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
