
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayer } from '@/contexts/PlayerContext';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';

const MiniPlayer = () => {
  const { currentSong, isPlaying, togglePlay } = usePlayer();
  const navigate = useNavigate();

  if (!currentSong) {
    return null; // Don't render if no song is current
  }

  const handlePlayerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Navigate only if the click is not on a button
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    navigate('/player');
  };

  return (
    <div 
      className="fixed bottom-16 left-0 right-0 bg-lira-dark-card/60 backdrop-blur-md p-3 shadow-lg-top z-40 border-t border-gray-700/50 cursor-pointer"
      onClick={handlePlayerClick}
    >
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
            onClick={(e) => { e.stopPropagation(); /* TODO: Implement SkipBack */ }}
          >
            <SkipBack className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={(e) => { e.stopPropagation(); togglePlay(); }} 
            className="text-white hover:bg-lira-blue/20 hover:text-lira-blue h-10 w-10 rounded-full bg-lira-blue/10"
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-lira-blue/20 hover:text-lira-blue h-8 w-8"
            onClick={(e) => { e.stopPropagation(); /* TODO: Implement SkipForward */ }}
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MiniPlayer;
