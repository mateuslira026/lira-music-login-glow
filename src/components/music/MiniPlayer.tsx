
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Music } from 'lucide-react'; // Using Music as a placeholder album art

const MiniPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const currentSong = { // Placeholder
    title: "Nome da Música Atual",
    artist: "Artista da Música",
    albumArtUrl: "https://picsum.photos/seed/currentsong/40/40" // Placeholder image
  };

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div className="fixed bottom-16 left-0 right-0 bg-lira-dark-card/90 backdrop-blur-md p-3 shadow-lg-top z-40 border-t border-gray-700/50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img 
            src={currentSong.albumArtUrl} 
            alt="Capa do Álbum" 
            className="w-10 h-10 rounded"
          />
          <div>
            <p className="text-sm font-semibold text-white truncate max-w-[150px] sm:max-w-xs">{currentSong.title}</p>
            <p className="text-xs text-gray-400 truncate max-w-[150px] sm:max-w-xs">{currentSong.artist}</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={togglePlay} 
          className="text-white hover:bg-lira-blue/20 hover:text-lira-blue"
        >
          {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
        </Button>
      </div>
    </div>
  );
};

export default MiniPlayer;
