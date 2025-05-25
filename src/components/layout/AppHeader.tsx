
import React from 'react';
import { Music2 } from 'lucide-react';

const AppHeader = () => {
  return (
    <header className="bg-lira-dark-card p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center">
        <Music2 className="h-8 w-8 text-lira-blue mr-2" />
        <h1 className="text-2xl font-bold text-white">Lira Music</h1>
      </div>
    </header>
  );
};

export default AppHeader;
