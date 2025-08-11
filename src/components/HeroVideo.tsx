import React from 'react';
import { Play } from 'lucide-react';

const HeroVideo = () => {
  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl">
      <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        {/* Placeholder for video - you can replace with actual video */}
        <div className="text-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Play className="h-8 w-8 text-gray-600 ml-1" />
          </div>
          <p className="text-gray-600 font-medium">Watch Demo</p>
        </div>
      </div>
      
      {/* Chat interface overlay */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-white rounded-2xl p-4 shadow-lg border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            <div>
              <div className="font-semibold text-sm">MaterialScienceGPT</div>
              <div className="text-xs text-gray-500">AI Assistant</div>
            </div>
          </div>
          <div className="text-sm text-gray-700">
            Ask me anything about material properties, synthesis, or analysis...
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroVideo;