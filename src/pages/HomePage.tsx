
import React from 'react';
import AppHeader from '@/components/layout/AppHeader';
import MusicSection from '@/components/music/MusicSection';
import FeaturedSection from '@/components/music/FeaturedSection';
import { usePlayer } from '@/contexts/PlayerContext';
import {
  recentesAlbums,
  seusArtistasFavoritos,
  placeholderPodcasts,
  flashbackData,
  novosLancamentosAlbums,
  paraVoceAlbums,
  getAlbumById,
  AlbumWithSongs
} from '@/data/homePageData';

// Export the interface and function for backward compatibility
export interface AlbumWithSongs extends AlbumWithSongs {}
export { getAlbumById };

const HomePage = () => {
  const { currentSong } = usePlayer();

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <AppHeader />
      
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <div className="pt-4 pb-32">
          <div className="space-y-6">
            <MusicSection title="Recentes" albums={recentesAlbums} />
            <MusicSection title="Seus artistas favoritos" artists={seusArtistasFavoritos} />
            <MusicSection title="Podcasts" albums={placeholderPodcasts} />
            <MusicSection title="Flashback" albums={flashbackData} />
            <MusicSection title="Novos lançamentos" albums={novosLancamentosAlbums} />
            <MusicSection title="Para você" albums={paraVoceAlbums} />
            <FeaturedSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
