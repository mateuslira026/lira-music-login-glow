
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleClearSearch = () => {
    setSearchValue('');
  };

  return (
    <div className="relative my-4 px-4 w-full">
      <Search className="absolute left-7 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      <Input
        type="search"
        placeholder="Buscar músicas, artistas, álbuns..."
        className="w-full pl-12 pr-10 py-3 bg-lira-dark-card border-gray-700 text-white focus:ring-lira-blue focus:border-lira-blue rounded-full placeholder:text-gray-500"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {searchValue && (
        <button 
          onClick={handleClearSearch}
          className="absolute right-7 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
