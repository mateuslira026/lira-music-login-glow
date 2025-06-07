
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
      <div className="flex items-center justify-center w-full h-full">
        <img 
          src="/lovable-uploads/67d79e14-3917-4c3d-89b3-60a9271b45d2.png" 
          alt="Lira Music" 
          className="w-48 h-48 object-contain"
        />
      </div>
    </div>
  );
};

export default SplashScreen;
