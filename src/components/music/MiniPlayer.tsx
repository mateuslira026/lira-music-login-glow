
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';

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
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <img 
            src={currentSong.albumArtUrl} 
            alt="Capa do Álbum" 
            className="w-10 h-10 rounded-md"
          />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">{currentSong.title}</p>
            <p className="text-xs text-gray-400 truncate">{currentSong.artist}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-lira-blue/20 hover:text-lira-blue h-8 w-8"
          >
            <SkipBack className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={togglePlay} 
            className="text-white hover:bg-lira-blue/20 hover:text-lira-blue h-10 w-10 rounded-full bg-lira-blue/10"
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-lira-blue/20 hover:text-lira-blue h-8 w-8"
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MiniPlayer;
