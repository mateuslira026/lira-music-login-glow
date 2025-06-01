import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayer } from '@/contexts/PlayerContext';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipForward, SkipBack, Heart } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { FastAverageColor, FastAverageColorResult } from 'fast-average-color';

const MiniPlayer = () => {
  const { currentSong, isPlaying, togglePlay, playNext, playPrevious, playlist, currentTrackIndex, toggleLike, isLiked } = usePlayer();
  const navigate = useNavigate();
  const [bgColor, setBgColor] = useState<string>('rgb(88, 28, 135)');

  console.log('MiniPlayer render - currentSong:', currentSong, 'isPlaying:', isPlaying);

  useEffect(() => {
    if (currentSong?.albumArtUrl) {
      const fac = new FastAverageColor();
      let imageUrl = currentSong.albumArtUrl;
      if (imageUrl.includes('picsum.photos')) {
        imageUrl = `${imageUrl}?ts=${new Date().getTime()}`;
      }

      const updateBackgroundColor = (colorResult: FastAverageColorResult | null) => {
        if (colorResult && colorResult.hex) {
          const r = parseInt(colorResult.hex.slice(1, 3), 16);
          const g = parseInt(colorResult.hex.slice(3, 5), 16);
          const b = parseInt(colorResult.hex.slice(5, 7), 16);
          const darkR = Math.floor(r * 0.7);
          const darkG = Math.floor(g * 0.7);
          const darkB = Math.floor(b * 0.7);
          setBgColor(`rgb(${darkR}, ${darkG}, ${darkB})`);
        } else {
          setBgColor('rgb(50, 50, 70)'); 
        }
      };

      const attemptDirectColorExtraction = async () => {
        try {
          const color = await fac.getColorAsync(imageUrl, { crossOrigin: 'anonymous' });
          updateBackgroundColor(color);
        } catch (directError) {
          console.warn(`Direct getColorAsync failed for ${imageUrl}: ${directError}. Attempting fetch workaround for CORS.`);
          await attemptFetchWorkaround(imageUrl, fac, updateBackgroundColor);
        }
      };

      const attemptFetchWorkaround = async (url: string, facInstance: FastAverageColor, callback: (colorResult: FastAverageColorResult | null) => void) => {
        try {
          const proxyUrl = url.includes('picsum.photos') ? `https://images.weserv.nl/?url=${encodeURIComponent(url.split('?')[0])}&t=${new Date().getTime()}` : url;
          const response = await fetch(proxyUrl, { mode: 'cors' });
          if (!response.ok) {
            throw new Error(`Fetch failed for album art: ${response.status} ${response.statusText} from ${proxyUrl}`);
          }
          const blob = await response.blob();
          const objectURL = URL.createObjectURL(blob);
          try {
            const color = await facInstance.getColorAsync(objectURL);
            callback(color);
          } finally {
            URL.revokeObjectURL(objectURL); 
          }
        } catch (fetchError) {
          console.error(`Fetch workaround failed for ${url}: ${fetchError}`);
          callback(null); 
        }
      };

      attemptDirectColorExtraction();

    } else {
      setBgColor('rgb(26, 20, 36)'); 
    }
  }, [currentSong?.albumArtUrl, currentSong?.id]);

  if (!currentSong) {
    console.log('MiniPlayer: No current song, not rendering');
    return null;
  }

  console.log('MiniPlayer: Rendering with song:', currentSong.title);

  const handlePlayerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    navigate('/player');
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentSong) {
      toggleLike(currentSong);
    }
  };

  const canSkip = playlist.length > 1 && currentTrackIndex !== null;
  const songIsLiked = currentSong ? isLiked(currentSong.id) : false;

  const backgroundStyle = {
    background: `linear-gradient(to right, ${bgColor} 0%, rgba(0,0,0,0.3) 100%)`
  };

  return (
    <div className="fixed bottom-16 left-0 right-0 z-40">
      {/* Progress Bar */}
      <div className="w-full px-4">
        <Progress value={33} className="h-1 bg-white/20" />
      </div>
      
      {/* Mini Player */}
      <div 
        className="backdrop-blur-sm p-2 shadow-lg-top border-t border-white/5 cursor-pointer"
        style={backgroundStyle}
        onClick={handlePlayerClick}
      >
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 flex-1 min-w-0">
            <img 
              src={currentSong.albumArtUrl} 
              alt="Capa do Álbum" 
              className="w-8 h-8 rounded-md"
            />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">{currentSong.title}</p>
              <p className="text-xs text-gray-400 truncate">{currentSong.artist}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-transparent hover:text-lira-blue h-7 w-7 disabled:opacity-50 disabled:hover:bg-transparent disabled:text-gray-500"
              onClick={(e) => { 
                e.stopPropagation(); 
                console.log('Previous button clicked, canSkip:', canSkip, 'playlist length:', playlist.length, 'currentTrackIndex:', currentTrackIndex);
                playPrevious(); 
              }}
              disabled={!canSkip}
            >
              <SkipBack className="h-3 w-3" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={(e) => { e.stopPropagation(); togglePlay(); }} 
              className="text-white hover:bg-transparent hover:text-lira-blue h-8 w-8 rounded-full"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-transparent hover:text-lira-blue h-7 w-7 disabled:opacity-50 disabled:hover:bg-transparent disabled:text-gray-500"
              onClick={(e) => { 
                e.stopPropagation(); 
                console.log('Next button clicked, canSkip:', canSkip, 'playlist length:', playlist.length, 'currentTrackIndex:', currentTrackIndex);
                playNext(); 
              }}
              disabled={!canSkip}
            >
              <SkipForward className="h-3 w-3" />
            </Button>

            <Button 
              variant="ghost" 
              size="icon" 
              className={`h-7 w-7 hover:bg-transparent ${songIsLiked ? 'text-red-500 hover:text-red-400' : 'text-white hover:text-red-500'}`}
              onClick={handleLikeClick}
            >
              <Heart className={`h-3 w-3 ${songIsLiked ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniPlayer;
