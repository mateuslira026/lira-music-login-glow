
import React, { useEffect } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000); // 3 segundos

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 w-screen h-screen bg-gradient-to-b from-lira-dark-page to-black flex items-center justify-center z-50 overflow-hidden">
      <div className="flex flex-col items-center justify-center w-full h-full space-y-8">
        <div className="relative">
          <img 
            src="/lovable-uploads/ba367f49-9e5a-462e-918a-12285af2db03.png" 
            alt="Lira Music" 
            className="w-32 h-32 object-contain animate-pulse"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse"></div>
        </div>
        
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white">Lira Music</h1>
          <p className="text-gray-400 text-lg">Sua música, sua vibe</p>
        </div>
        
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
