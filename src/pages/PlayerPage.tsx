
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayer, Song } from '@/contexts/PlayerContext';
import { Button } from '@/components/ui/button';
import { ChevronDown, Play, Pause, SkipBack, SkipForward, MoreHorizontal } from 'lucide-react';
import { Slider } from "@/components/ui/slider";

const PlayerPage = () => {
  const { currentSong, isPlaying, togglePlay } = usePlayer();
  const navigate = useNavigate();

  if (!currentSong) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-lira-dark-page to-black text-white p-4">
        <p>Nenhuma música selecionada.</p>
        <Button onClick={() => navigate('/home')} className="mt-4">Voltar para Home</Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-purple-800 via-lira-dark-page to-black text-white z-50 flex flex-col p-4 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-white hover:bg-white/10">
          <ChevronDown className="h-6 w-6" />
        </Button>
        <div className="text-center">
          <p className="text-xs uppercase">Tocando do Álbum</p>
          <p className="text-sm font-semibold truncate">{currentSong.title}</p> {/* Placeholder for album name if different */}
        </div>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
          <MoreHorizontal className="h-6 w-6" />
        </Button>
      </div>

      {/* Album Art */}
      <div className="flex-shrink-0 px-4 sm:px-8 md:px-16 lg:px-24 mb-8">
        <img 
          src={currentSong.albumArtUrl.replace('/200/200', '/500/500')} // Request larger image
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
            defaultValue={[33]} // Placeholder
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
          <Button variant="ghost" size="icon" className="text-white hover:text-lira-blue h-12 w-12">
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
          <Button variant="ghost" size="icon" className="text-white hover:text-lira-blue h-12 w-12">
            <SkipForward className="h-6 w-6" />
          </Button>
        </div>

        {/* Bottom Controls (Optional: Shuffle, Repeat) */}
        {/* Add more controls if needed */}
      </div>
    </div>
  );
};

export default PlayerPage;
