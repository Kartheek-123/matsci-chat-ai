
import React from 'react';
import { X, Plus, MessageSquare, History, Settings, HelpCircle, Clock, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isMobile: boolean;
}

export const Sidebar = ({ isOpen, onClose, isMobile }: SidebarProps) => {
  const sidebarClasses = cn(
    "bg-gray-900 text-white w-80 flex flex-col transition-transform duration-300 ease-in-out shadow-xl",
    isMobile ? "fixed left-0 top-0 z-50 h-screen" : "relative h-screen",
    isMobile && !isOpen && "-translate-x-full"
  );

  // Enhanced sample chat history with more realistic data
  const chatHistory = [
    { 
      id: 1, 
      title: "Properties of Graphene and Carbon Nanotubes", 
      preview: "What are the mechanical properties of graphene compared to...",
      date: "Today",
      time: "2:30 PM",
      messageCount: 12
    },
    { 
      id: 2, 
      title: "Steel Alloy Compositions for Aerospace", 
      preview: "I need information about high-strength steel alloys...",
      date: "Today",
      time: "10:15 AM",
      messageCount: 8
    },
    { 
      id: 3, 
      title: "Polymer Crystallization Mechanisms", 
      preview: "Can you explain the different types of polymer...",
      date: "Yesterday",
      time: "4:45 PM",
      messageCount: 15
    },
    { 
      id: 4, 
      title: "Ceramic Phase Diagrams Analysis", 
      preview: "How do I interpret this Al2O3-SiO2 phase diagram?",
      date: "Yesterday",
      time: "11:20 AM",
      messageCount: 6
    },
    { 
      id: 5, 
      title: "Nanomaterial Synthesis Methods", 
      preview: "What are the most effective synthesis routes for...",
      date: "2 days ago",
      time: "3:10 PM",
      messageCount: 20
    },
    { 
      id: 6, 
      title: "Semiconductor Band Structure", 
      preview: "Explain the relationship between band gap and...",
      date: "3 days ago",
      time: "1:55 PM",
      messageCount: 9
    },
    { 
      id: 7, 
      title: "Corrosion Resistance in Marine Environments", 
      preview: "Which materials perform best in saltwater exposure?",
      date: "1 week ago",
      time: "9:30 AM",
      messageCount: 11
    },
    { 
      id: 8, 
      title: "Crystal Structure Analysis", 
      preview: "Understanding face-centered cubic structures...",
      date: "1 week ago",
      time: "2:15 PM",
      messageCount: 7
    },
    { 
      id: 9, 
      title: "Thermal Conductivity Measurements", 
      preview: "Best practices for measuring thermal properties...",
      date: "2 weeks ago",
      time: "11:45 AM",
      messageCount: 13
    },
    { 
      id: 10, 
      title: "Composite Material Design", 
      preview: "Fiber reinforcement strategies for composites...",
      date: "2 weeks ago",
      time: "4:30 PM",
      messageCount: 18
    }
  ];

  const groupedHistory = {
    Today: chatHistory.filter(chat => chat.date === "Today"),
    Yesterday: chatHistory.filter(chat => chat.date === "Yesterday"),
    "This Week": chatHistory.filter(chat => !["Today", "Yesterday"].includes(chat.date) && (chat.date.includes("days ago") || chat.date.includes("week ago")))
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
        
        <Button className="w-full mb-3 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white shadow-lg">
          <Plus className="h-4 w-4 mr-2" />
          New Chat
        </Button>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search conversations..." 
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
          </div>
        </ScrollArea>
      </div>

      {/* Footer - Fixed at bottom */}
      <div className="p-4 border-t border-gray-700 space-y-2 flex-shrink-0">
        <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
          <History className="h-4 w-4 mr-3" />
          Clear History
        </Button>
        <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
          <Settings className="h-4 w-4 mr-3" />
          Settings
        </Button>
        <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
          <HelpCircle className="h-4 w-4 mr-3" />
          Help & FAQ
        </Button>
      </div>
    </div>
  );
};
