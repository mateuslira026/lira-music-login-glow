
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayer } from '@/contexts/PlayerContext';
import AppHeader from '@/components/layout/AppHeader';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Heart, ChevronRight } from 'lucide-react';

const LibraryPage = () => {
  const navigate = useNavigate();
  const { likedSongs } = usePlayer();

  return (
    <div className="flex flex-col min-h-screen h-full bg-gradient-to-b from-lira-dark-page to-black text-white">
      <AppHeader />
      
      <ScrollArea className="flex-1 overflow-y-auto pb-36">
        <div className="p-4 pt-6">
          <h2 className="text-2xl font-bold text-white mb-6">Sua Biblioteca</h2>
          
          {/* Músicas Curtidas */}
          <div 
            onClick={() => navigate('/liked-songs')}
            className="flex items-center space-x-4 p-4 rounded-lg hover:bg-white/5 cursor-pointer transition-colors mb-4"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-md flex items-center justify-center">
              <Heart className="h-6 w-6 text-white fill-current" />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium">Músicas Curtidas</p>
              <p className="text-gray-400 text-sm">
                {likedSongs.length} {likedSongs.length === 1 ? 'música' : 'músicas'}
              </p>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>

          <div className="border-t border-white/10 pt-4">
            <p className="text-gray-400">Playlists e álbuns salvos aparecerão aqui.</p>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default LibraryPage;
