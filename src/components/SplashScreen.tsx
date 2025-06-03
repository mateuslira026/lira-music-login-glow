
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
    <div className="fixed inset-0 w-full h-full bg-black flex items-center justify-center z-50">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <img 
          src="/lovable-uploads/7439f52f-034e-4da5-bb4a-51903f87c328.png" 
          alt="Lira Music" 
          className="w-80 h-80 object-contain animate-pulse"
        />
      </div>
    </div>
  );
};

export default SplashScreen;
