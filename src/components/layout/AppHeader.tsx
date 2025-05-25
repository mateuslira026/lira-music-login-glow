
import React from 'react';
import { Music2, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AppHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-lira-dark-card p-3 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Music2 className="h-7 w-7 text-lira-blue mr-2" />
          <h1 className="text-xl font-bold text-white">Lira</h1>
        </div>
        <button 
          onClick={() => navigate('/search')}
          className="p-2 rounded-full hover:bg-lira-dark-page/50"
        >
          <Search className="h-5 w-5 text-white" />
        </button>
      </div>
    </header>
  );
};

export default AppHeader;
