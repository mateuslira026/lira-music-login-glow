
import React, { useEffect } from 'react';
import { Music2 } from 'lucide-react';

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
        <Music2 className="w-32 h-32 text-lira-blue animate-pulse" />
      </div>
    </div>
  );
};

export default SplashScreen;
