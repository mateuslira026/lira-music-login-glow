
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const SearchBar = () => {
  return (
    <div className="relative my-6 px-4">
      <Search className="absolute left-7 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      <Input
        type="search"
        placeholder="Buscar músicas, artistas, álbuns..."
        className="w-full pl-12 pr-4 py-3 bg-lira-dark-card border-gray-700 text-white focus:ring-lira-blue focus:border-lira-blue rounded-lg placeholder:text-gray-500"
      />
    </div>
  );
};

export default SearchBar;
