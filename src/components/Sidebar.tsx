
import React, { useState } from 'react';
import { X, Plus, MessageSquare, History, Settings, HelpCircle, Clock, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isMobile: boolean;
  onNewChat?: () => void;
  onClearHistory?: () => void;
  chatHistory?: Array<{
    id: number;
    title: string;
    preview: string;
    date: string;
    time: string;
    messageCount: number;
  }>;
}

export const Sidebar = ({ isOpen, onClose, isMobile, onNewChat, onClearHistory, chatHistory = [] }: SidebarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  
  const sidebarClasses = cn(
    "bg-gray-900 text-white w-80 flex flex-col transition-transform duration-300 ease-in-out shadow-xl",
    isMobile ? "fixed left-0 top-0 z-50 h-screen" : "relative h-screen",
    isMobile && !isOpen && "-translate-x-full"
  );

  // Filter chat history based on search term
  const filteredHistory = chatHistory.filter(chat =>
    chat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.preview.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedHistory = {
    Today: filteredHistory.filter(chat => chat.date === "Today"),
    Yesterday: filteredHistory.filter(chat => chat.date === "Yesterday"),
    "This Week": filteredHistory.filter(chat => !["Today", "Yesterday"].includes(chat.date) && (chat.date.includes("days ago") || chat.date.includes("week ago")))
  };

  const handleNewChat = () => {
    if (onNewChat) {
      onNewChat();
    }
    if (isMobile) {
      onClose();
    }
  };

  const handleClearHistory = () => {
    if (onClearHistory) {
      const confirmed = window.confirm('Are you sure you want to clear all chat history? This action cannot be undone.');
      if (confirmed) {
        onClearHistory();
      }
    }
  };

  const handleSettings = () => {
    setShowSettings(true);
  };

  const handleHelp = () => {
    setShowHelp(true);
  };

  const handleChatSelect = (chatId: number) => {
    console.log(`Loading chat ${chatId}...`);
    // This would load the selected chat conversation
  };

  return (
    <div className={sidebarClasses}>
      {/* Header - Fixed at top */}
      <div className="p-4 border-b border-gray-700 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Chat History
          </h2>
          {isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-gray-700 p-2"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <Button 
          onClick={handleNewChat}
          className="w-full mb-3 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white shadow-lg"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Chat
        </Button>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search conversations..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Chat History - Scrollable area that takes remaining space */}
      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full p-4">
          <div className="space-y-6">
            {Object.entries(groupedHistory).map(([period, chats]) => (
              chats.length > 0 && (
                <div key={period} className="space-y-2">
                  <div className="flex items-center gap-2 px-2 py-1">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider">{period}</h3>
                  </div>
                  {chats.map((chat) => (
                    <div
                      key={chat.id}
                      onClick={() => handleChatSelect(chat.id)}
                      className="p-3 rounded-lg hover:bg-gray-800 cursor-pointer transition-all duration-200 group border border-transparent hover:border-gray-700"
                    >
                      <div className="flex items-start gap-3">
                        <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg shrink-0 group-hover:scale-110 transition-transform">
                          <MessageSquare className="h-3 w-3 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium truncate text-white group-hover:text-blue-300 transition-colors">
                            {chat.title}
                          </h4>
                          <p className="text-xs text-gray-400 truncate mt-1 leading-relaxed">
                            {chat.preview}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {chat.time}
                            </span>
                            <span className="text-xs bg-gray-700 px-2 py-1 rounded-full text-gray-300">
                              {chat.messageCount} msgs
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ))}
            {filteredHistory.length === 0 && searchTerm && (
              <div className="text-center text-gray-400 py-8">
                <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No conversations found matching "{searchTerm}"</p>
              </div>
            )}
            {chatHistory.length === 0 && !searchTerm && (
              <div className="text-center text-gray-400 py-8">
                <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No chat history yet</p>
                <p className="text-sm mt-1">Start a new conversation to see it here</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Footer - Fixed at bottom */}
      <div className="p-4 border-t border-gray-700 space-y-2 flex-shrink-0">
        <Button 
          variant="ghost" 
          onClick={handleClearHistory}
          className="w-full justify-start text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <History className="h-4 w-4 mr-3" />
          Clear History
        </Button>
        <Button 
          variant="ghost" 
          onClick={handleSettings}
          className="w-full justify-start text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <Settings className="h-4 w-4 mr-3" />
          Settings
        </Button>
        <Button 
          variant="ghost" 
          onClick={handleHelp}
          className="w-full justify-start text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <HelpCircle className="h-4 w-4 mr-3" />
          Help & FAQ
        </Button>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Settings</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4 text-gray-700">
              <div>
                <h4 className="font-medium mb-2">Theme</h4>
                <p className="text-sm text-gray-600">Dark mode is currently active</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Language</h4>
                <p className="text-sm text-gray-600">English (US)</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Data</h4>
                <p className="text-sm text-gray-600">Chat history is stored locally</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Help & FAQ</h3>
              <button
                onClick={() => setShowHelp(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4 text-gray-700">
              <div>
                <h4 className="font-medium mb-2">How to start a new chat?</h4>
                <p className="text-sm text-gray-600">Click the "New Chat" button in the sidebar</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">How to clear chat history?</h4>
                <p className="text-sm text-gray-600">Use the "Clear History" button in the sidebar footer</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">How to search conversations?</h4>
                <p className="text-sm text-gray-600">Use the search box at the top of the sidebar</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Need more help?</h4>
                <p className="text-sm text-gray-600">Contact support for additional assistance</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
