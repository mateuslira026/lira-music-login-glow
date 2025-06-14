
import React from 'react';
import AppHeader from '@/components/layout/AppHeader';
import MusicSection from '@/components/music/MusicSection';
import FeaturedSection from '@/components/music/FeaturedSection';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Album } from '@/components/music/AlbumCard'; 
import { Artist } from '@/components/music/ArtistCard';
import { usePlayer } from '@/contexts/PlayerContext';
import { realArtists, realAlbums, popularMixes, getRealAlbumById } from '@/data/musicData';

export interface AlbumWithSongs extends Album {
  songs: any[];
}

// Converter dados reais para formato esperado pelos componentes
const convertRealAlbumsToAlbums = (realAlbums: any[]): AlbumWithSongs[] => {
  return realAlbums.map(album => ({
    id: album.id,
    title: album.title,
    artist: album.artist,
    coverUrl: album.coverUrl,
    songs: album.songs,
  }));
};

const convertRealArtistsToArtists = (realArtists: any[]): Artist[] => {
  return realArtists.map(artist => ({
    id: artist.id,
    name: artist.name,
    profileImageUrl: artist.profileImageUrl,
    songs: artist.songs,
  }));
};

// Dados organizados
const mixesMaisOuvidos = convertRealAlbumsToAlbums(popularMixes);
const recentesAlbums = convertRealAlbumsToAlbums([...realAlbums].sort(() => 0.5 - Math.random()).slice(0, 8));
const paraVoceAlbums = convertRealAlbumsToAlbums([...realAlbums, ...popularMixes].sort(() => Math.random() - 0.5).slice(0, 6));
const novosLancamentosAlbums = convertRealAlbumsToAlbums(realAlbums.filter(album => album.year >= 2020));

const seusArtistasFavoritos = convertRealArtistsToArtists(realArtists);

const flashbackData = convertRealAlbumsToAlbums([
  {
    id: 'flashback-2010s',
    title: 'Flashback 2010s',
    artist: 'Clássicos da Década',
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop',
    year: 2010,
    songs: [
      ...realArtists.find(a => a.name === 'Taylor Swift')?.songs.slice(2, 4) || [],
      ...realArtists.find(a => a.name === 'Adele')?.songs.slice(0, 2) || [],
      ...realArtists.find(a => a.name === 'Ed Sheeran')?.songs.slice(2, 3) || [],
    ],
  },
  {
    id: 'flashback-2020s',
    title: 'Flashback 2020s',
    artist: 'Hits Recentes',
    coverUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=200&h=200&fit=crop',
    year: 2020,
    songs: [
      ...realArtists.find(a => a.name === 'Taylor Swift')?.songs.slice(0, 2) || [],
      ...realArtists.find(a => a.name === 'Billie Eilish')?.songs.slice(0, 2) || [],
      ...realArtists.find(a => a.name === 'Drake')?.songs.slice(0, 2) || [],
    ],
  },
]);

const placeholderPodcasts = convertRealAlbumsToAlbums([
  {
    id: 'podcast-1',
    title: 'The Joe Rogan Experience',
    artist: 'Joe Rogan',
    coverUrl: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=200&h=200&fit=crop',
    year: 2024,
    songs: [
      {
        id: 'podcast-1-ep-1',
        title: 'Episódio #2081 - Conversas Profundas',
        artist: 'Joe Rogan',
        albumArtUrl: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=200&h=200&fit=crop',
        albumTitle: 'The Joe Rogan Experience',
        trackNumber: 1,
      },
    ],
  },
  {
    id: 'podcast-2',
    title: 'Podpah',
    artist: 'Igor & Mitico',
    coverUrl: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=200&h=200&fit=crop',
    year: 2024,
    songs: [
      {
        id: 'podcast-2-ep-1',
        title: 'Episódio #479 - Papo Aleatório',
        artist: 'Igor & Mitico',
        albumArtUrl: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=200&h=200&fit=crop',
        albumTitle: 'Podpah',
        trackNumber: 1,
      },
    ],
  },
]);

export const getAlbumById = (id: string): AlbumWithSongs | undefined => {
  const realAlbum = getRealAlbumById(id);
  if (realAlbum) {
    return {
      id: realAlbum.id,
      title: realAlbum.title,
      artist: realAlbum.artist,
      coverUrl: realAlbum.coverUrl,
      songs: realAlbum.songs,
    };
  }
  
  const allAlbums = [
    ...convertRealAlbumsToAlbums(realAlbums),
    ...convertRealAlbumsToAlbums(popularMixes),
    ...flashbackData,
    ...placeholderPodcasts,
  ];
  return allAlbums.find(album => album.id === id);
}

const HomePage = () => {
  const { currentSong } = usePlayer();

  return (
    <div className="flex flex-col min-h-screen h-full bg-gradient-to-b from-lira-dark-page to-black text-white">
      <AppHeader />
      
      <ScrollArea className="flex-1 overflow-y-auto">
        <div className="pt-2 pb-32">
          <div className="space-y-6 mt-4">
            {currentSong && (
              <MusicSection title="Recentes" albums={recentesAlbums} />
            )}
            
            <MusicSection title="Seus artistas favoritos" artists={seusArtistasFavoritos} />
            
            <MusicSection title="Podcasts" albums={placeholderPodcasts} />
            <MusicSection title="Flashback" albums={flashbackData} />
            <MusicSection title="Novos lançamentos" albums={novosLancamentosAlbums} />
            <MusicSection title="Para você" albums={paraVoceAlbums} />
            <FeaturedSection />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default HomePage;
