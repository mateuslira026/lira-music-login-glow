
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayer } from '@/contexts/PlayerContext';
import { Button } from '@/components/ui/button';
import { ChevronDown, Play, Pause, SkipBack, SkipForward, MoreHorizontal } from 'lucide-react';
import { Slider } from "@/components/ui/slider";
import { FastAverageColor, FastAverageColorResult } from 'fast-average-color';

const PlayerPage = () => {
  const { currentSong, isPlaying, togglePlay, playNext, playPrevious } = usePlayer();
  const navigate = useNavigate();
  const [bgColor, setBgColor] = useState<string>('rgb(88, 28, 135)'); // Fallback roxo escuro

  useEffect(() => {
    if (currentSong?.albumArtUrl) {
      const fac = new FastAverageColor();
      let imageUrl = currentSong.albumArtUrl;
      if (imageUrl.includes('picsum.photos')) {
        imageUrl = `${imageUrl}?ts=${new Date().getTime()}`; // Ensure timestamp key is unique
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
          // console.log('Attempting direct color extraction for:', imageUrl);
          const color = await fac.getColorAsync(imageUrl, { crossOrigin: 'anonymous' });
          updateBackgroundColor(color);
        } catch (directError) {
          console.warn(`Direct getColorAsync failed for ${imageUrl}: ${directError}. Attempting fetch workaround for CORS.`);
          // console.log('Direct error details:', directError);
          await attemptFetchWorkaround(imageUrl, fac, updateBackgroundColor);
        }
      };

      const attemptFetchWorkaround = async (url: string, facInstance: FastAverageColor, callback: (colorResult: FastAverageColorResult | null) => void) => {
        try {
          // console.log('Attempting fetch workaround for:', url);
          // Using a proxy for picsum.photos as it often has CORS issues
          const proxyUrl = url.includes('picsum.photos') ? `https://images.weserv.nl/?url=${encodeURIComponent(url.split('?')[0])}&t=${new Date().getTime()}` : url;
          // console.log('Using proxy URL:', proxyUrl);

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
          // console.log('Fetch error details:', fetchError);
          callback(null); 
        }
      };

      attemptDirectColorExtraction();

    } else {
      setBgColor('rgb(26, 20, 36)'); 
    }
  }, [currentSong?.albumArtUrl, currentSong?.id]);

  if (!currentSong) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-lira-dark-page to-black text-white p-4">
        <p>Nenhuma música selecionada.</p>
        <Button onClick={() => navigate('/home')} className="mt-4">Voltar para Home</Button>
      </div>
    );
  }

  const backgroundStyle = {
    background: `linear-gradient(to bottom, ${bgColor} 0%, #100C1C 60%, black 100%)`
  };

  return (
    <div 
      className="fixed inset-0 text-white z-50 flex flex-col p-4 overflow-y-auto transition-all duration-500 ease-in-out"
      style={backgroundStyle}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-white hover:bg-white/10">
          <ChevronDown className="h-6 w-6" />
        </Button>
        <div className="text-center">
          <p className="text-xs uppercase">Tocando do Álbum</p>
          <p className="text-sm font-semibold truncate">{currentSong.albumTitle || currentSong.title}</p>
        </div>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
          <MoreHorizontal className="h-6 w-6" />
        </Button>
      </div>

      {/* Album Art */}
      <div className="flex-shrink-0 px-6 sm:px-8 md:px-12 mb-6 sm:mb-8">
        <img 
          src={currentSong.albumArtUrl.replace('/200/200', '/500/500').replace('/300/300', '/500/500')}
          alt={`Capa de ${currentSong.title}`}
          className="w-full aspect-square rounded-lg shadow-2xl object-cover"
          crossOrigin="anonymous"
        />
      </div>

      {/* Song Info & Controls */}
      <div className="flex-grow flex flex-col justify-end">
        <div className="mb-4 sm:mb-6 px-2">
          <h2 className="text-2xl font-bold truncate">{currentSong.title}</h2>
          <p className="text-lg text-gray-300 truncate">{currentSong.artist}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-4 sm:mb-6 px-2">
          <Slider
            defaultValue={[0]} 
            max={100}
            step={1}
            className="w-full [&>span:first-child]:h-1 [&>span:first-child>span]:bg-white [&>span:nth-child(2)]:bg-white/30 [&>span:nth-child(2)]:h-1"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>0:00</span> 
            <span>3:30</span> 
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex items-center justify-evenly mb-4 sm:mb-6">
          <Button variant="ghost" size="icon" className="text-white hover:text-lira-blue h-12 w-12" onClick={playPrevious}>
            <SkipBack className="h-6 w-6" />
          </Button>
          <Button 
            variant="default" 
            size="icon" 
            onClick={togglePlay} 
            className="bg-white text-black hover:bg-gray-200 h-16 w-16 rounded-full shadow-lg"
          >
            {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:text-lira-blue h-12 w-12" onClick={playNext}>
            <SkipForward className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlayerPage;

