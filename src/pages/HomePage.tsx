
import React from 'react';
import AppHeader from '@/components/layout/AppHeader';
import SearchBar from '@/components/music/SearchBar';
import MusicSection from '@/components/music/MusicSection';
import MiniPlayer from '@/components/music/MiniPlayer';
import BottomNav from '@/components/layout/BottomNav';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Album } from '@/components/music/AlbumCard';

// Placeholder data
const placeholderAlbums: Album[] = Array.from({ length: 10 }, (_, i) => ({
  id: `album-${i + 1}`,
  title: `Álbum Fantástico ${i + 1}`,
  artist: `Artista Top ${i % 4 + 1}`,
  coverUrl: `https://picsum.photos/seed/album${i + 1}/200/200`,
}));

const recommendedAlbums = placeholderAlbums.slice(0, 7);
const topChartsAlbums = [...placeholderAlbums].sort(() => 0.5 - Math.random()).slice(0, 8);
const forYouAlbums = [...placeholderAlbums].sort(() => Math.random() - 0.5).slice(0, 6);
const newReleasesAlbums = [...placeholderAlbums].sort(() => Math.random() - 0.5).slice(0, 5);

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen h-full bg-gradient-to-b from-lira-dark-page to-black text-white">
      <AppHeader />
      
      <ScrollArea className="flex-1 overflow-y-auto pb-36"> {/* pb-36 para evitar sobreposição com o MiniPlayer e BottomNav */}
        <div className="pt-2 pb-4">
          <SearchBar />
          <div className="space-y-6">
            <MusicSection title="Recomendados para Você" albums={recommendedAlbums} />
            <MusicSection title="Top Charts" albums={topChartsAlbums} />
            <MusicSection title="Novos Lançamentos" albums={newReleasesAlbums} />
            <MusicSection title="Para Você" albums={forYouAlbums} />
          </div>
        </div>
      </ScrollArea>
      
      <MiniPlayer />
      <BottomNav />
    </div>
  );
};

export default HomePage;
