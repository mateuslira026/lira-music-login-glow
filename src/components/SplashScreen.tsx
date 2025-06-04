
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
          src="/lovable-uploads/9e92afb9-f8fa-4d01-bf68-f63ded4ee8cd.png" 
          alt="Lira Music" 
          className="w-48 h-48 object-contain animate-pulse"
        />
      </div>
    </div>
  );
};

export default SplashScreen;
