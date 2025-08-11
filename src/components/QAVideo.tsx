import React, { useState, useEffect } from 'react';
import { Bot, User } from 'lucide-react';

interface QAItem {
  q: string;
  a: string;
}

interface QAVideoProps {
  qa: QAItem[];
}

const QAVideo: React.FC<QAVideoProps> = ({ qa }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (showAnswer) {
        // Move to next question
        setCurrentIndex((prev) => (prev + 1) % qa.length);
        setShowAnswer(false);
      } else {
        // Show answer
        setShowAnswer(true);
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [showAnswer, qa.length]);

  const currentQA = qa[currentIndex];

  return (
    <div className="p-6 space-y-4 min-h-[280px]">
      {/* Question */}
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="h-4 w-4 text-blue-600" />
        </div>
        <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
          <p className="text-sm text-gray-800">{currentQA.q}</p>
        </div>
      </div>

      {/* Answer */}
      <div className={`flex items-start gap-3 transition-opacity duration-500 ${showAnswer ? 'opacity-100' : 'opacity-30'}`}>
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
          <Bot className="h-4 w-4 text-white" />
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
          <p className="text-sm text-gray-800">{currentQA.a}</p>
        </div>
      </div>

      {/* Progress indicators */}
      <div className="flex justify-center gap-2 pt-4">
        {qa.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-purple-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default QAVideo;