
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
    <div className="fixed inset-0 w-screen h-screen bg-black flex items-center justify-center z-50 overflow-hidden">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <img 
          src="/lovable-uploads/b379a479-9722-4757-bfba-fafea93dd456.png" 
          alt="Lira Music" 
          className="w-96 h-96 object-contain animate-pulse"
        />
      </div>
    </div>
  );
};

export default SplashScreen;
