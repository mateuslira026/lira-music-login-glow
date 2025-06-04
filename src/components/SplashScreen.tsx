
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
      <div className="flex flex-col items-center justify-center w-full h-full">
        <img 
          src="/lovable-uploads/fcd79cd8-e42e-4a86-afc3-9995b932f687.png" 
          alt="Lira Music" 
          className="w-80 h-80 object-contain animate-pulse"
        />
      </div>
    </div>
  );
};

export default SplashScreen;
