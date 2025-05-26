
import React from 'react';
import AppHeader from '@/components/layout/AppHeader';
import SearchBar from '@/components/music/SearchBar';
import MusicSection from '@/components/music/MusicSection';
import MiniPlayer from '@/components/music/MiniPlayer';
import BottomNav from '@/components/layout/BottomNav';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Album } from '@/components/music/AlbumCard'; // Assuming AlbumCard defines this type
import { usePlayer, Song } from '@/contexts/PlayerContext';
import { Button } from '@/components/ui/button';

// Placeholder data
const placeholderAlbums: Album[] = Array.from({ length: 10 }, (_, i) => ({
  id: `album-${i + 1}`,
  title: `Álbum Fantástico ${i + 1}`,
  artist: `Artista Top ${i % 4 + 1}`,
  coverUrl: `https://picsum.photos/seed/album${i + 1}/200/200`,
}));

const mixesMaisOuvidos = placeholderAlbums.slice(0, 7);
const recentesAlbums = [...placeholderAlbums].sort(() => 0.5 - Math.random()).slice(0, 8);
const paraVoceAlbums = [...placeholderAlbums].sort(() => Math.random() - 0.5).slice(0, 6);
const novosLancamentosAlbums = [...placeholderAlbums].sort(() => Math.random() - 0.5).slice(0, 5);

const HomePage = () => {
  const { currentSong, setCurrentSong } = usePlayer();

  const playTestSong = () => {
    const testSong: Song = {
      id: 'test-song-1',
      title: 'Música de Teste Legal',
      artist: 'Artista Demonstrativo',
      albumArtUrl: 'https://picsum.photos/seed/testsong/200/200',
    };
    setCurrentSong(testSong);
  };

  return (
    <div className="flex flex-col min-h-screen h-full bg-gradient-to-b from-lira-dark-page to-black text-white">
      <AppHeader />
      
      <ScrollArea className="flex-1 overflow-y-auto pb-36"> {/* pb-36 para evitar sobreposição com o MiniPlayer e BottomNav */}
        <div className="pt-2 pb-4">
          <SearchBar />
          <div className="space-y-2 mb-4 px-4">
             <Button onClick={playTestSong} className="w-full sm:w-auto bg-lira-blue hover:bg-lira-blue/80">
                Tocar Música de Teste (para ver Player e "Recentes")
            </Button>
          </div>
          <div className="space-y-6">
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
