
import React from 'react';
import AppHeader from '@/components/layout/AppHeader';
import SearchBar from '@/components/music/SearchBar';
import MiniPlayer from '@/components/music/MiniPlayer';
import BottomNav from '@/components/layout/BottomNav';
import { ScrollArea } from '@/components/ui/scroll-area';

const SearchPage = () => {
  return (
    <div className="flex flex-col min-h-screen h-full bg-gradient-to-b from-lira-dark-page to-black text-white">
      <AppHeader />
      
      <ScrollArea className="flex-1 overflow-y-auto pb-36"> {/* pb-36 para evitar sobreposição com o MiniPlayer e BottomNav */}
        <div className="pt-2 pb-4">
          <SearchBar />
          <div className="px-4">
            <h2 className="text-2xl font-bold text-white mb-4">Buscar</h2>
            <p className="text-gray-400">Conteúdo da página de busca aparecerá aqui.</p>
            {/* TODO: Implementar a lógica de busca e exibição de resultados */}
          </div>
        </div>
      </ScrollArea>
      
      <MiniPlayer />
      <BottomNav />
    </div>
  );
};

export default SearchPage;
