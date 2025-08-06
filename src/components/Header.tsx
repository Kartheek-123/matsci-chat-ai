
import React from 'react';
import { Menu, Atom } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserButton, useUser } from '@clerk/clerk-react';

interface HeaderProps {
  onMenuClick: () => void;
  isMobile: boolean;
}

export const Header = ({ onMenuClick, isMobile }: HeaderProps) => {
  const { user } = useUser();

  return (
    <header className="bg-card border-b border-border px-4 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        {isMobile && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="p-2"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Atom className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">MaterialScienceGPT</h1>
            <p className="text-xs text-muted-foreground">AI Assistant for Material Science</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-medium text-foreground">
                {user.firstName} {user.lastName}
              </span>
              <span className="text-xs text-muted-foreground">
                {user.primaryEmailAddress?.emailAddress}
              </span>
            </div>
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8"
                }
              }}
            />
          </>
        ) : (
          <div className="text-sm text-muted-foreground">
            Guest Mode
          </div>
        )}
      </div>
    </header>
  );
};
