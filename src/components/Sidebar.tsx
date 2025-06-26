
import React from 'react';
import { X, Plus, MessageSquare, History, Settings, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isMobile: boolean;
}

export const Sidebar = ({ isOpen, onClose, isMobile }: SidebarProps) => {
  const sidebarClasses = cn(
    "bg-gray-900 text-white w-80 h-full flex flex-col transition-transform duration-300 ease-in-out",
    isMobile ? "fixed left-0 top-0 z-50" : "relative",
    isMobile && !isOpen && "-translate-x-full"
  );

  // Sample chat history
  const chatHistory = [
    { id: 1, title: "Properties of Graphene", date: "Today" },
    { id: 2, title: "Steel Alloy Compositions", date: "Yesterday" },
    { id: 3, title: "Polymer Crystallization", date: "2 days ago" },
    { id: 4, title: "Ceramic Phase Diagrams", date: "3 days ago" },
    { id: 5, title: "Nanomaterial Synthesis", date: "1 week ago" },
  ];

  return (
    <div className={sidebarClasses}>
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Chat History</h2>
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
        <Button className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          New Chat
        </Button>
      </div>

      {/* Chat History */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          {chatHistory.map((chat) => (
            <div
              key={chat.id}
              className="p-3 rounded-lg hover:bg-gray-800 cursor-pointer transition-colors"
            >
              <div className="flex items-start gap-3">
                <MessageSquare className="h-4 w-4 mt-1 text-gray-400" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{chat.title}</p>
                  <p className="text-xs text-gray-400">{chat.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700 space-y-2">
        <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-800">
          <History className="h-4 w-4 mr-3" />
          Clear History
        </Button>
        <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-800">
          <Settings className="h-4 w-4 mr-3" />
          Settings
        </Button>
        <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-800">
          <HelpCircle className="h-4 w-4 mr-3" />
          Help & FAQ
        </Button>
      </div>
    </div>
  );
};
