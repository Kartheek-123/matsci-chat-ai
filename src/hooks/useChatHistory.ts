import { useState, useEffect } from 'react';
import { Message } from './useChat';

export interface ChatSession {
  id: number;
  title: string;
  preview: string;
  date: string;
  time: string;
  messageCount: number;
  messages: Message[];
  createdAt: Date;
}

export const useChatHistory = () => {
  const [chatHistory, setChatHistory] = useState<ChatSession[]>([]);

  // Load chat history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('chatHistory');
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        // Convert date strings back to Date objects
        const historyWithDates = parsed.map((session: any) => ({
          ...session,
          createdAt: new Date(session.createdAt),
          messages: session.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
        }));
        setChatHistory(historyWithDates);
      } catch (error) {
        console.error('Error loading chat history:', error);
        setChatHistory([]);
      }
    }
  }, []);

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
  }, [chatHistory]);

  const saveChatSession = (messages: Message[]) => {
    if (messages.length === 0) return;

    // Get the first user message as the title
    const firstUserMessage = messages.find(msg => msg.role === 'user');
    if (!firstUserMessage) return;

    const now = new Date();
    const title = firstUserMessage.content.slice(0, 50) + (firstUserMessage.content.length > 50 ? '...' : '');
    
    // Get preview from the first assistant response
    const firstAssistantMessage = messages.find(msg => msg.role === 'assistant');
    const preview = firstAssistantMessage ? 
      firstAssistantMessage.content.slice(0, 100) + (firstAssistantMessage.content.length > 100 ? '...' : '') :
      'No response yet';

    const newSession: ChatSession = {
      id: Date.now(),
      title,
      preview,
      date: getRelativeDate(now),
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      messageCount: messages.length,
      messages: [...messages],
      createdAt: now
    };

    setChatHistory(prev => [newSession, ...prev]);
  };

  const clearHistory = () => {
    setChatHistory([]);
    localStorage.removeItem('chatHistory');
  };

  const loadChatSession = (sessionId: number): Message[] | null => {
    const session = chatHistory.find(chat => chat.id === sessionId);
    return session ? session.messages : null;
  };

  const getRelativeDate = (date: Date): string => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    if (diffDays <= 14) return '1 week ago';
    return date.toLocaleDateString();
  };

  // Update relative dates for existing sessions
  const updateChatHistoryDates = () => {
    setChatHistory(prev => prev.map(session => ({
      ...session,
      date: getRelativeDate(session.createdAt)
    })));
  };

  return {
    chatHistory,
    saveChatSession,
    clearHistory,
    loadChatSession,
    updateChatHistoryDates
  };
};