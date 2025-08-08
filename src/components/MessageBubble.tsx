
import React from 'react';
import { User, Atom, Image as ImageIcon, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Message } from '@/hooks/useChat';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.role === 'user';

  return (
    <div className={cn(
      "flex gap-3 p-4 rounded-lg",
      isUser ? "bg-secondary ml-12" : "bg-card border border-border"
    )}>
      {/* Avatar */}
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
        isUser 
          ? "bg-primary" 
          : "bg-primary"
      )}>
        {isUser ? (
          <User className="h-4 w-4 text-primary-foreground" />
        ) : (
          <Atom className="h-4 w-4 text-primary-foreground" />
        )}
      </div>

      {/* Message Content */}
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm text-foreground">
            {isUser ? 'You' : 'MaterialScienceGPT'}
          </span>
          <span className="text-xs text-muted-foreground">
            {message.timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        </div>
        <div className="space-y-3">
          {/* Attachments */}
          {message.attachments && message.attachments.length > 0 && (
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {message.attachments.map(att => (
                  <div key={att.id} className="border border-border bg-muted/50 rounded-md p-2 flex items-center gap-2">
                    {att.type === 'image' ? (
                      (att.previewUrl || att.dataUrl) ? (
                        <>
                          <img
                            src={att.previewUrl || att.dataUrl}
                            alt={att.name || 'Attached image'}
                            className="h-20 w-20 object-cover rounded"
                          />
                          <span className="text-xs text-muted-foreground truncate max-w-[120px]">
                            {att.name || 'image'}
                          </span>
                        </>
                      ) : (
                        <>
                          <ImageIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground truncate max-w-[160px]">
                            {att.name || 'image'}
                          </span>
                        </>
                      )
                    ) : (
                      <>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground truncate max-w-[160px]">
                          {att.name || 'document.pdf'}
                        </span>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Text */}
          <div className="prose prose-sm max-w-none">
            <p className="text-foreground whitespace-pre-wrap leading-relaxed">
              {message.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
