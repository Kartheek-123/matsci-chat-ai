import React, { useState, useEffect } from 'react';

const heroTexts = [
  "AI assistant for material science research",
  "Accelerate your materials discovery",
  "Expert knowledge at your fingertips",
  "Intelligent materials analysis platform"
];

const GeneratedHeroText = () => {
  const [currentText, setCurrentText] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const text = heroTexts[currentText];
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < text.length) {
          setDisplayText(text.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentText((prev) => (prev + 1) % heroTexts.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentText]);

  return (
    <div className="space-y-6">
      <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200">
        <span className="text-sm font-medium text-blue-700">✨ Powered by AI</span>
      </div>
      
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
        Your smart
        <br />
        <span className="bg-gradient-to-r from-[#2563EB] to-[#9333EA] bg-clip-text text-transparent">
          {displayText}
          <span className="animate-pulse">|</span>
        </span>
      </h1>
      
      <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
        MaterialScienceGPT combines cutting-edge AI with comprehensive materials knowledge to help researchers, 
        engineers, and students accelerate their work and make breakthrough discoveries.
      </p>
    </div>
  );
};

export default GeneratedHeroText;