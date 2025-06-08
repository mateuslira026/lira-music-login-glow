
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
    <div className="fixed inset-0 w-screen h-screen bg-lira-dark-page flex items-center justify-center z-50 overflow-hidden">
      <div className="w-full h-full flex items-center justify-center">
        <img 
          src="/lovable-uploads/297ff519-7e5b-4a26-88bf-d6ccb505cd68.png" 
          alt="Lira Music" 
          className="w-48 h-48 object-contain animate-pulse"
        />
      </div>
    </div>
  );
};

export default SplashScreen;
