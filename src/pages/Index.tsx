
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { ChatInterface } from '@/components/ChatInterface';
import { Sidebar } from '@/components/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatKey, setChatKey] = useState(0); // Key to force ChatInterface re-render
  const isMobile = useIsMobile();

  const handleNewChat = () => {
    // Force a new chat by re-rendering the ChatInterface component
    setChatKey(prev => prev + 1);
    console.log('Starting new chat...');
  };

  const handleClearHistory = () => {
    // Clear chat history from localStorage and force re-render
    localStorage.removeItem('chatHistory');
    setChatKey(prev => prev + 1);
    console.log('Chat history cleared');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        onNewChat={handleNewChat}
        onClearHistory={handleClearHistory}
        isMobile={isMobile}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          isMobile={isMobile}
        />
        <ChatInterface key={chatKey} />
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
