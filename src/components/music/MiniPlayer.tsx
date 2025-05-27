
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayer } from '@/contexts/PlayerContext';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';

const MiniPlayer = () => {
  const { currentSong, isPlaying, togglePlay, playNext, playPrevious, playlist, currentTrackIndex } = usePlayer();
  const navigate = useNavigate();

  // Don't render if no song is current
  if (!currentSong) {
    return null;
  }

  const handlePlayerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    navigate('/player');
  };

  const canSkip = playlist.length > 1 && currentTrackIndex !== null;

  return (
    <div 
      className="fixed bottom-16 left-0 right-0 bg-black/40 backdrop-blur-md p-3 shadow-lg-top z-40 border-t border-white/10 cursor-pointer" // Fundo mais transparente, blur ajustado e borda mais clara
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
            className="text-white hover:bg-lira-blue/20 hover:text-lira-blue h-8 w-8 disabled:opacity-50 disabled:hover:bg-transparent disabled:text-gray-500"
            onClick={(e) => { e.stopPropagation(); playPrevious(); }}
            disabled={!canSkip}
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
            className="text-white hover:bg-lira-blue/20 hover:text-lira-blue h-8 w-8 disabled:opacity-50 disabled:hover:bg-transparent disabled:text-gray-500"
            onClick={(e) => { e.stopPropagation(); playNext(); }}
            disabled={!canSkip}
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MiniPlayer;
