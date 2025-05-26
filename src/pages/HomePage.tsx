
import React from 'react';
import AppHeader from '@/components/layout/AppHeader';
import SearchBar from '@/components/music/SearchBar';
import MusicSection from '@/components/music/MusicSection';
import MiniPlayer from '@/components/music/MiniPlayer';
import BottomNav from '@/components/layout/BottomNav';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Album } from '@/components/music/AlbumCard'; 
import { usePlayer, Song as PlayerSong } from '@/contexts/PlayerContext'; // Renomeado para evitar conflito

// Atualizando a interface Album para incluir músicas
export interface AlbumWithSongs extends Album {
  songs: PlayerSong[];
}

// Placeholder data com músicas
const placeholderAlbums: AlbumWithSongs[] = Array.from({ length: 10 }, (_, i) => {
  const albumId = `album-${i + 1}`;
  const albumCover = `https://picsum.photos/seed/${albumId}/200/200`;
  const artistName = `Artista Top ${i % 4 + 1}`;
  const albumTitle = `Álbum Fantástico ${i + 1}`;
  return {
    id: albumId,
    title: albumTitle,
    artist: artistName,
    coverUrl: albumCover,
    songs: Array.from({ length: 5 + (i % 5) }, (s, songIdx) => ({ // Cada álbum terá entre 5 e 9 músicas
      id: `${albumId}-song-${songIdx + 1}`,
      title: `Música ${songIdx + 1} do Álbum ${i + 1}`,
      artist: artistName,
      albumArtUrl: albumCover,
      albumTitle: albumTitle,
      trackNumber: songIdx + 1,
    })),
  };
});

const mixesMaisOuvidos = placeholderAlbums.slice(0, 7);
const recentesAlbums = [...placeholderAlbums].sort(() => 0.5 - Math.random()).slice(0, 8);
const paraVoceAlbums = [...placeholderAlbums].sort(() => Math.random() - 0.5).slice(0, 6);
const novosLancamentosAlbums = [...placeholderAlbums].sort(() => Math.random() - 0.5).slice(0, 5);

// Exportar dados para serem usados em AlbumDetailPage
export const getAlbumById = (id: string): AlbumWithSongs | undefined => {
  return placeholderAlbums.find(album => album.id === id);
}

const HomePage = () => {
  const { currentSong } = usePlayer();

  return (
    <div className="flex flex-col min-h-screen h-full bg-gradient-to-b from-lira-dark-page to-black text-white">
      <AppHeader />
      
      <ScrollArea className="flex-1 overflow-y-auto pb-36"> {/* pb-36 para evitar sobreposição com o MiniPlayer e BottomNav */}
        <div className="pt-2 pb-4">
          <SearchBar />
          {/* Botão de teste removido */}
          <div className="space-y-6 mt-4"> {/* Adicionado mt-4 para espaçamento após SearchBar */}
            <MusicSection title="Seus Mixes Mais Ouvidos" albums={mixesMaisOuvidos} />
            
            {currentSong && ( // Só mostra "Recentes" se uma música já foi "tocada"
              <MusicSection title="Recentes" albums={recentesAlbums} />
            )}
            
            <MusicSection title="Novos Lançamentos" albums={novosLancamentosAlbums} />
            <MusicSection title="Para Você" albums={paraVoceAlbums} />
          </div>
        </div>
      </ScrollArea>
      
      <MiniPlayer />
      <BottomNav />
    </div>
  );
};

export default HomePage;
