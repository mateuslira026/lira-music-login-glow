
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayer } from '@/contexts/PlayerContext';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronLeft, Play, Heart } from 'lucide-react';

const LikedSongsPage = () => {
  const { likedSongs, setCurrentSong, playPlaylist, toggleLike } = usePlayer();
  const navigate = useNavigate();

  const handlePlaySong = (song: any, index: number) => {
    playPlaylist(likedSongs, index);
  };

  const handleUnlike = (e: React.MouseEvent, song: any) => {
    e.stopPropagation();
    toggleLike(song);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-lira-dark-page to-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate(-1)} 
          className="text-white hover:bg-white/10"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-bold">Músicas Curtidas</h1>
        <div className="w-10" />
      </div>

      <ScrollArea className="flex-1 overflow-y-auto pb-32">
        <div className="p-4">
          {likedSongs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Heart className="h-16 w-16 text-gray-500 mb-4" />
              <p className="text-gray-400 text-center">Nenhuma música curtida ainda</p>
              <p className="text-gray-500 text-sm text-center mt-2">
                Curta suas músicas favoritas para vê-las aqui
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {likedSongs.map((song, index) => (
                <div
                  key={song.id}
                  onClick={() => handlePlaySong(song, index)}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                >
                  <div className="relative">
                    <img 
                      src={song.albumArtUrl} 
                      alt={`Capa de ${song.title}`}
                      className="w-12 h-12 rounded-md"
                    />
                    <div className="absolute inset-0 bg-black/40 rounded-md opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">{song.title}</p>
                    <p className="text-gray-400 text-sm truncate">{song.artist}</p>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => handleUnlike(e, song)}
                    className="text-red-500 hover:text-red-400 hover:bg-transparent h-8 w-8"
                  >
                    <Heart className="h-4 w-4 fill-current" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default LikedSongsPage;
