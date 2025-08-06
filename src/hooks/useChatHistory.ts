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
    try {
      // Persist a lightweight version (strip heavy base64 data)
      const lightweightHistory = chatHistory.map(session => ({
        ...session,
        messages: session.messages.map(msg => ({
          ...msg,
          attachments: msg.attachments?.map(att => ({
            ...att,
            // Keep keys but drop heavy payloads to avoid quota errors
            dataUrl: '',
            previewUrl: undefined,
          })),
        })),
      }));
      localStorage.setItem('chatHistory', JSON.stringify(lightweightHistory));
    } catch (err) {
      console.error('Failed to persist chat history (likely quota exceeded):', err);
    }
  }, [chatHistory]);

  const saveChatSession = (messages: Message[]) => {
    console.log('Saving chat session with messages:', messages.length);
    if (messages.length === 0) return;

    // Get the first user message as the title
    const firstUserMessage = messages.find(msg => msg.role === 'user');
    if (!firstUserMessage) return;

    const sessionId = firstUserMessage.id; // Use first message ID as session identifier
    
    // Check if this conversation already exists
    const existingSessionIndex = chatHistory.findIndex(session => 
      session.messages.length > 0 && session.messages[0].id === sessionId
    );

    const now = new Date();
    const title = firstUserMessage.content.slice(0, 50) + (firstUserMessage.content.length > 50 ? '...' : '');
    
    // Get preview from the first assistant response
    const firstAssistantMessage = messages.find(msg => msg.role === 'assistant');
    const preview = firstAssistantMessage ? 
      firstAssistantMessage.content.slice(0, 100) + (firstAssistantMessage.content.length > 100 ? '...' : '') :
      'No response yet';

    const sessionData: ChatSession = {
      id: existingSessionIndex >= 0 ? chatHistory[existingSessionIndex].id : Date.now(),
      title,
      preview,
      date: getRelativeDate(now),
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      messageCount: messages.length,
      messages: [...messages],
      createdAt: existingSessionIndex >= 0 ? chatHistory[existingSessionIndex].createdAt : now
    };

    if (existingSessionIndex >= 0) {
      // Update existing session
      setChatHistory(prev => {
        const updated = [...prev];
        updated[existingSessionIndex] = sessionData;
        return updated;
      });
    } else {
      // Add new session
      console.log('Adding new chat session:', sessionData.title);
      setChatHistory(prev => [sessionData, ...prev]);
    }
    console.log('Chat history updated, total sessions:', chatHistory.length + 1);
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