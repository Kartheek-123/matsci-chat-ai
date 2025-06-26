
import React from 'react';
import { User, Atom } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.role === 'user';

  return (
    <div className={cn(
      "flex gap-3 p-4 rounded-lg",
      isUser ? "bg-blue-50 ml-12" : "bg-white border border-gray-200"
    )}>
      {/* Avatar */}
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
        isUser 
          ? "bg-blue-600" 
          : "bg-gradient-to-r from-blue-600 to-green-600"
      )}>
        {isUser ? (
          <User className="h-4 w-4 text-white" />
        ) : (
          <Atom className="h-4 w-4 text-white" />
        )}
      </div>

      {/* Message Content */}
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm text-gray-900">
            {isUser ? 'You' : 'MaterialScienceGPT'}
          </span>
          <span className="text-xs text-gray-500">
            {message.timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        </div>
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
            {message.content}
          </p>
        </div>
      </div>
    </div>
  );
};
