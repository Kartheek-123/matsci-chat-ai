
import React from 'react';
import { Menu, Atom, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onMenuClick: () => void;
  isMobile: boolean;
}

export const Header = ({ onMenuClick, isMobile }: HeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
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
          <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
            <Atom className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">MaterialScienceGPT</h1>
            <p className="text-xs text-gray-500">AI Assistant for Material Science</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          {!isMobile && <span>Sign In</span>}
        </Button>
      </div>
    </header>
  );
};
