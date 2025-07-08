
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { ChatInterface } from '@/components/ChatInterface';
import { Sidebar } from '@/components/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { useChatHistory } from '@/hooks/useChatHistory';
import { Message } from '@/hooks/useChat';

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatKey, setChatKey] = useState(0); // Key to force ChatInterface re-render
  const [loadedMessages, setLoadedMessages] = useState<Message[] | null>(null);
  const isMobile = useIsMobile();
  const { chatHistory, saveChatSession, clearHistory, loadChatSession } = useChatHistory();

  const handleNewChat = () => {
    // Clear loaded messages and force new chat
    setLoadedMessages(null);
    setChatKey(prev => prev + 1);
    console.log('Starting new chat...');
  };

  const handleClearHistory = () => {
    // Clear chat history and force re-render
    clearHistory();
    setLoadedMessages(null);
    setChatKey(prev => prev + 1);
    console.log('Chat history cleared');
  };

  const handleChatSave = (messages: Message[]) => {
    console.log('handleChatSave called with messages:', messages.length);
    saveChatSession(messages);
  };

  const handleLoadChat = (chatId: number) => {
    const messages = loadChatSession(chatId);
    if (messages) {
      setLoadedMessages(messages);
      setChatKey(prev => prev + 1);
      if (isMobile) {
        setSidebarOpen(false);
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        onNewChat={handleNewChat}
        onClearHistory={handleClearHistory}
        onLoadChat={handleLoadChat}
        chatHistory={chatHistory}
        isMobile={isMobile}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          isMobile={isMobile}
        />
        <ChatInterface 
          key={chatKey} 
          onChatSave={handleChatSave}
          loadedMessages={loadedMessages}
        />
      </div>
      
      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Index;
