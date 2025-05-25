
import React from 'react';
import AppHeader from '@/components/layout/AppHeader';
import MiniPlayer from '@/components/music/MiniPlayer';
import BottomNav from '@/components/layout/BottomNav';
import { ScrollArea } from '@/components/ui/scroll-area';

const LibraryPage = () => {
  return (
    <div className="flex flex-col min-h-screen h-full bg-gradient-to-b from-lira-dark-page to-black text-white">
      <AppHeader />
      
      <ScrollArea className="flex-1 overflow-y-auto pb-36">
        <div className="p-4 pt-6">
          <h2 className="text-2xl font-bold text-white mb-4">Sua Biblioteca</h2>
          <p className="text-gray-400">Playlists, álbuns e artistas salvos aparecerão aqui.</p>
          {/* TODO: Implementar conteúdo da biblioteca */}
        </div>
      </ScrollArea>
      
      <MiniPlayer />
      <BottomNav />
    </div>
  );
};

export default LibraryPage;
