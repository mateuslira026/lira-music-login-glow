
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAlbumById } from './HomePage'; // Importar a função para buscar álbuns
import { usePlayer, Song } from '@/contexts/PlayerContext';
import { Button } from '@/components/ui/button';
import { ChevronLeft, PlayCircle, Music } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const AlbumDetailPage = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const navigate = useNavigate();
  const { playPlaylist, currentSong, isPlaying, togglePlay } = usePlayer();
  const album = albumId ? getAlbumById(albumId) : undefined;

  if (!album) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-lira-dark-page to-black text-white p-4">
        <p>Álbum não encontrado.</p>
        <Button onClick={() => navigate('/home')} className="mt-4">Voltar para Home</Button>
      </div>
    );
  }

  const handlePlayAlbum = (startIndex: number = 0) => {
    playPlaylist(album.songs, startIndex);
  };

  const handlePlaySong = (songIndex: number) => {
    playPlaylist(album.songs, songIndex);
  };
  
  // Determina se a música específica está tocando
  const isSongPlaying = (song: Song) => currentSong?.id === song.id && isPlaying;
  // Determina se a música específica está pausada mas é a atual
  const isSongCurrentPaused = (song: Song) => currentSong?.id === song.id && !isPlaying;


  return (
    <div className="flex flex-col min-h-screen h-full bg-gradient-to-b from-gray-800 via-lira-dark-page to-black text-white">
      <header className="p-4 flex items-center sticky top-0 bg-lira-dark-page/80 backdrop-blur-md z-10">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="mr-2">
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-semibold truncate">{album.title}</h1>
      </header>

      <ScrollArea className="flex-1">
        <div className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
            <img 
              src={album.coverUrl.replace('/200/200', '/300/300')} 
              alt={`Capa de ${album.title}`}
              className="w-48 h-48 md:w-60 md:h-60 rounded-lg shadow-xl object-cover flex-shrink-0"
            />
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold">{album.title}</h2>
              <p className="text-lg text-gray-300 mb-1">Por {album.artist}</p>
              <p className="text-sm text-gray-400 mb-4">{album.songs.length} músicas</p>
              <Button 
                onClick={() => handlePlayAlbum()} 
                className="bg-lira-blue hover:bg-lira-blue/80 text-white px-6 py-3 rounded-full text-base font-semibold"
              >
                <PlayCircle className="mr-2 h-5 w-5" /> Tocar Álbum
              </Button>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-4">Músicas</h3>
          <ul className="space-y-2">
            {album.songs.map((song, index) => (
              <li 
                key={song.id} 
                className={`p-3 rounded-md hover:bg-lira-dark-card/70 flex items-center justify-between cursor-pointer transition-colors group
                            ${currentSong?.id === song.id ? 'bg-lira-dark-card' : 'bg-lira-dark-card/30'}`}
                onClick={() => {
                  if (currentSong?.id === song.id) {
                    togglePlay(); // Se for a mesma música, apenas alterna play/pause
                  } else {
                    handlePlaySong(index); // Senão, toca a nova música
                  }
                }}
              >
                <div className="flex items-center space-x-3">
                  {isSongPlaying(song) || isSongCurrentPaused(song) ? (
                     <Music className={`h-5 w-5 ${isSongPlaying(song) ? 'text-lira-blue animate-pulse' : 'text-gray-400'}`} />
                  ) : (
                    <span className="text-sm text-gray-400 w-5 text-center">{song.trackNumber || index + 1}</span>
                  )}
                  <div>
                    <p className={`font-medium truncate ${currentSong?.id === song.id ? 'text-lira-blue' : 'text-white'}`}>{song.title}</p>
                    <p className="text-xs text-gray-400 truncate">{song.artist}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-white">
                  {/* Aqui poderia ser um ícone de 'Mais Opções' ou similar */}
                  {/* <MoreHorizontal className="h-5 w-5" /> */}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </ScrollArea>
      {/* O MiniPlayer global continuará visível se uma música estiver tocando */}
    </div>
  );
};

export default AlbumDetailPage;
