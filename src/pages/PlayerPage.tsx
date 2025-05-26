
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayer } from '@/contexts/PlayerContext';
import { Button } from '@/components/ui/button';
import { ChevronDown, Play, Pause, SkipBack, SkipForward, MoreHorizontal } from 'lucide-react';
import { Slider } from "@/components/ui/slider";
import { FastAverageColor } from 'fast-average-color';

const PlayerPage = () => {
  const { currentSong, isPlaying, togglePlay, playNext, playPrevious } = usePlayer();
  const navigate = useNavigate();
  const [bgColor, setBgColor] = useState<string | null>('rgb(88, 28, 135)'); // Fallback roxo escuro

  useEffect(() => {
    if (currentSong?.albumArtUrl) {
      const fac = new FastAverageColor();
      // Adicionando um timestamp para evitar problemas de cache com CORS se a URL for a mesma mas a imagem mudou
      const imageUrl = currentSong.albumArtUrl.includes('?') 
        ? `${currentSong.albumArtUrl}&v=${Date.now()}`
        : `${currentSong.albumArtUrl}?v=${Date.now()}`;

      // Para contornar o CORS com picsum.photos, precisaria de um proxy ou uma API que não tenha essa restrição.
      // No entanto, para o picsum, podemos tentar buscar a imagem como blob.
      // Se a imagem estiver no mesmo domínio ou tiver cabeçalhos CORS corretos, `getColorAsync` funciona diretamente.
      
      // Tentativa de usar fetch para imagens com CORS restrito (como picsum.photos)
      fetch(imageUrl, { mode: 'cors' })
        .then(response => {
          if (!response.ok) {
            // Se falhar com CORS, tenta diretamente (pode funcionar para algumas URLs)
            console.warn(`Fetch failed for ${imageUrl}, trying direct getColorAsync`);
            return fac.getColorAsync(currentSong.albumArtUrl);
          }
          return response.blob();
        })
        .then(dataOrColor => {
            if (typeof dataOrColor === 'string' || (dataOrColor && typeof dataOrColor.hex === 'string')) { // Direct color result
                 // @ts-ignore
                setBgColor(dataOrColor.hex || dataOrColor); // Handle both string and object return
            } else if (dataOrColor instanceof Blob) { // Blob result
                const objectURL = URL.createObjectURL(dataOrColor);
                return fac.getColorAsync(objectURL).then(color => {
                    URL.revokeObjectURL(objectURL); // Clean up
                    return color;
                });
            }
            return null;
        })
        .then(color => {
          if (color && color.hex) {
            // Para escurecer a cor um pouco e garantir contraste com texto branco:
            // Esta é uma forma simples, idealmente usaria uma lib de manipulação de cores
            const r = parseInt(color.hex.slice(1, 3), 16);
            const g = parseInt(color.hex.slice(3, 5), 16);
            const b = parseInt(color.hex.slice(5, 7), 16);
            // Escurecer um pouco, ex: 70% da cor original
            const darkR = Math.floor(r * 0.7);
            const darkG = Math.floor(g * 0.7);
            const darkB = Math.floor(b * 0.7);
            setBgColor(`rgb(${darkR}, ${darkG}, ${darkB})`);
          }
        })
        .catch(e => {
          console.error('Error getting album art color:', e);
          setBgColor('rgb(50, 50, 70)'); // Fallback mais escuro em caso de erro
        });
    } else {
      setBgColor('rgb(26, 20, 36)'); // Default para quando não há música
    }
  }, [currentSong?.albumArtUrl]);

  if (!currentSong) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-lira-dark-page to-black text-white p-4">
        <p>Nenhuma música selecionada.</p>
        <Button onClick={() => navigate('/home')} className="mt-4">Voltar para Home</Button>
      </div>
    );
  }

  const backgroundStyle = {
    background: `linear-gradient(to bottom, ${bgColor || 'rgb(88, 28, 135)'} 0%, #100C1C 60%, black 100%)`
  };

  return (
    <div 
      className="fixed inset-0 text-white z-50 flex flex-col p-4 overflow-y-auto transition-all duration-500 ease-in-out"
      style={backgroundStyle}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
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
      <div className="flex-shrink-0 px-4 sm:px-8 md:px-16 lg:px-24 mb-8">
        <img 
          src={currentSong.albumArtUrl.replace('/200/200', '/500/500').replace('/300/300', '/500/500')}
          alt={`Capa de ${currentSong.title}`}
          className="w-full aspect-square rounded-lg shadow-2xl object-cover"
        />
      </div>

      {/* Song Info & Controls */}
      <div className="flex-grow flex flex-col justify-end">
        <div className="mb-6 px-2">
          <h2 className="text-2xl font-bold truncate">{currentSong.title}</h2>
          <p className="text-lg text-gray-300 truncate">{currentSong.artist}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6 px-2">
          <Slider
            defaultValue={[0]} // Placeholder, futuramente será o progresso real
            max={100}
            step={1}
            className="w-full [&>span:first-child]:h-1 [&>span:first-child>span]:bg-white [&>span:nth-child(2)]:bg-white/30 [&>span:nth-child(2)]:h-1"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>0:00</span> {/* Placeholder */}
            <span>3:30</span> {/* Placeholder */}
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex items-center justify-evenly mb-6">
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
