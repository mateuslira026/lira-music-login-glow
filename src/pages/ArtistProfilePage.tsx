
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Shuffle, Heart, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { usePlayer } from '@/contexts/PlayerContext';
import { Artist } from '@/components/music/ArtistCard';

const ArtistProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setCurrentSong, currentSong, isPlaying } = usePlayer();
  const artist = location.state?.artist as Artist;

  if (!artist) {
    return (
      <div className="min-h-screen bg-lira-dark-page flex items-center justify-center">
        <p className="text-white">Artista não encontrado</p>
      </div>
    );
  }

  const handlePlaySong = (song: any) => {
    setCurrentSong(song);
  };

  const popularSongs = artist.songs || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-600 to-black text-white">
      <div className="relative">
        {/* Header com botão de voltar */}
        <div className="absolute top-4 left-4 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full bg-black/50 hover:bg-black/70 text-white"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </div>

        {/* Seção do perfil do artista */}
        <div className="relative h-96 bg-gradient-to-b from-gray-600 to-gray-800">
          <div className="absolute inset-0">
            <img
              src={artist.profileImageUrl}
              alt={artist.name}
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
          </div>
          
          <div className="relative flex flex-col justify-end h-full p-6">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={artist.profileImageUrl}
                alt={artist.name}
                className="w-20 h-20 rounded-full border-2 border-white shadow-lg"
              />
              <div>
                <h1 className="text-3xl font-bold mb-1">{artist.name}</h1>
                <p className="text-gray-300 text-sm">
                  {(popularSongs.length * 1000000).toLocaleString()} ouvintes mensais
                </p>
              </div>
            </div>
            
            {/* Botões de ação */}
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="text-white border-white hover:bg-white hover:text-black">
                Seguir
              </Button>
              <Button variant="ghost" size="icon" className="text-white">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white">
                <Shuffle className="h-5 w-5" />
              </Button>
              <Button
                className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-600"
                onClick={() => popularSongs.length > 0 && handlePlaySong(popularSongs[0])}
              >
                <Play className="h-6 w-6 fill-white" />
              </Button>
            </div>
          </div>
        </div>

        {/* Seção de conteúdo */}
        <div className="px-6 py-6">
          {/* Promoção de novo álbum */}
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-800 to-purple-800 rounded-lg flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={artist.profileImageUrl}
                alt="Novo álbum"
                className="w-12 h-12 rounded"
              />
              <div>
                <p className="text-white font-medium">Ouça o novo álbum</p>
                <p className="text-gray-300 text-sm">{artist.name}</p>
              </div>
            </div>
            <ArrowLeft className="h-5 w-5 text-white rotate-180" />
          </div>

          {/* Abas */}
          <div className="flex space-x-6 mb-6 border-b border-gray-700">
            <button className="text-white font-medium pb-2 border-b-2 border-green-500">
              Músicas
            </button>
            <button className="text-gray-400 font-medium pb-2">
              Clipes
            </button>
          </div>

          {/* Seção Popular */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Popular</h2>
            <div className="space-y-3">
              {popularSongs.slice(0, 5).map((song, index) => (
                <div
                  key={song.id}
                  className="flex items-center space-x-4 p-2 rounded-lg hover:bg-white/10 cursor-pointer group"
                  onClick={() => handlePlaySong(song)}
                >
                  <span className="text-gray-400 w-6 text-center text-sm group-hover:hidden">
                    {index + 1}
                  </span>
                  <Play className="h-4 w-4 text-white hidden group-hover:block" />
                  <img
                    src={song.albumArtUrl}
                    alt={song.title}
                    className="w-12 h-12 rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">{song.title}</p>
                    <p className="text-gray-400 text-sm truncate">
                      {(Math.floor(Math.random() * 50) + 10).toLocaleString()}.{Math.floor(Math.random() * 999).toString().padStart(3, '0')}.{Math.floor(Math.random() * 999).toString().padStart(3, '0')}
                    </p>
                  </div>
                  <div className="text-gray-400 text-sm">
                    {Math.floor(Math.random() * 3) + 2}:{Math.floor(Math.random() * 60).toString().padStart(2, '0')}
                  </div>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistProfilePage;
