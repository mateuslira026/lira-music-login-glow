
import React from 'react';
import AppHeader from '@/components/layout/AppHeader';
import SearchBar from '@/components/music/SearchBar';
import MusicSection from '@/components/music/MusicSection';
import MiniPlayer from '@/components/music/MiniPlayer';
import BottomNav from '@/components/layout/BottomNav';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Album } from '@/components/music/AlbumCard'; // Import Album type

// Placeholder data
const placeholderAlbums: Album[] = Array.from({ length: 10 }, (_, i) => ({
  id: `album-${i + 1}`,
  title: `Álbum Fantástico ${i + 1}`,
  artist: `Artista Top ${i % 4 + 1}`,
  coverUrl: `https://picsum.photos/seed/album${i + 1}/200/200`,
}));

const recommendedAlbums = placeholderAlbums.slice(0, 7);
const topChartsAlbums = [...placeholderAlbums].sort(() => 0.5 - Math.random()).slice(0, 8); // Shuffle for variety
const forYouAlbums = [...placeholderAlbums].sort(() => Math.random() - 0.5).slice(0, 6); // Shuffle for variety


const HomePage = () => {
  return (
    <div className="flex flex-col h-screen bg-lira-dark-page text-white font-inter selection:bg-lira-blue/30 selection:text-white">
      <AppHeader />
      
      <ScrollArea className="flex-1 overflow-y-auto pt-2 pb-32"> {/* pb-32 to avoid overlap with fixed bottom elements */}
        <SearchBar />
        <div className="space-y-8">
          <MusicSection title="Recomendados" albums={recommendedAlbums} />
          <MusicSection title="Top Charts" albums={topChartsAlbums} />
          <MusicSection title="Para Você" albums={forYouAlbums} />
        </div>
      </ScrollArea>
      
      <MiniPlayer />
      <BottomNav />
    </div>
  );
};

export default HomePage;
