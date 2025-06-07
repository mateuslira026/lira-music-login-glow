
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
      <div className="w-full h-full flex items-center justify-center">
        <img 
          src="/lovable-uploads/1ed216b7-1aac-4ffc-b69e-ae705216745f.png" 
          alt="Lira Music" 
          className="w-32 h-32 object-contain animate-pulse"
        />
      </div>
    </div>
  );
};

export default SplashScreen;
