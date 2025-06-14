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
const recentesAlbums = convertRealAlbumsToAlbums([...realAlbums, ...popularMixes].sort(() => 0.5 - Math.random()).slice(0, 8));

// Criar uma lista personalizada para "Para você" com mais variedade
const createParaVoceAlbums = (): AlbumWithSongs[] => {
  const allContent = [...realAlbums, ...popularMixes];
  const shuffled = allContent.sort(() => Math.random() - 0.5);
  return convertRealAlbumsToAlbums(shuffled.slice(0, 8));
};

const paraVoceAlbums = createParaVoceAlbums();

// Expandir novos lançamentos para incluir mais álbums
const novosLancamentosAlbums = convertRealAlbumsToAlbums([
  ...realAlbums.filter(album => album.year >= 2020),
  // Adicionar alguns mixes como "novos lançamentos"
  ...popularMixes.slice(0, 4)
]);

const seusArtistasFavoritos = convertRealArtistsToArtists(realArtists);

// Expandir flashback com mais variedade
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
  {
    id: 'flashback-90s',
    title: 'Flashback 90s',
    artist: 'Nostalgia dos 90',
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop',
    year: 1990,
    songs: [
      ...realArtists.find(a => a.name === 'Adele')?.songs.slice(2, 4) || [],
      ...realArtists.find(a => a.name === 'Ed Sheeran')?.songs.slice(0, 2) || [],
    ],
  },
  {
    id: 'flashback-2000s',
    title: 'Flashback 2000s',
    artist: 'Milênio Musical',
    coverUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=200&h=200&fit=crop',
    year: 2000,
    songs: [
      ...realArtists.find(a => a.name === 'Drake')?.songs.slice(2, 4) || [],
      ...realArtists.find(a => a.name === 'Taylor Swift')?.songs.slice(1, 2) || [],
    ],
  },
  {
    id: 'flashback-rock',
    title: 'Rock Classics',
    artist: 'Clássicos do Rock',
    coverUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=200&h=200&fit=crop',
    year: 1980,
    songs: [
      ...realArtists.find(a => a.name === 'Ed Sheeran')?.songs.slice(1, 3) || [],
      ...realArtists.find(a => a.name === 'Adele')?.songs.slice(1, 2) || [],
    ],
  },
  {
    id: 'flashback-pop',
    title: 'Pop Legends',
    artist: 'Lendas do Pop',
    coverUrl: 'https://images.unsplash.com/photo-1571974599782-87663a5d9c44?w=200&h=200&fit=crop',
    year: 1995,
    songs: [
      ...realArtists.find(a => a.name === 'Billie Eilish')?.songs.slice(2, 4) || [],
      ...realArtists.find(a => a.name === 'Drake')?.songs.slice(1, 2) || [],
    ],
  },
]);

// Expandir podcasts com muito mais variedade
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
  {
    id: 'podcast-3',
    title: 'Flow Podcast',
    artist: 'Igor Coelho & Bruno Aiub',
    coverUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=200&h=200&fit=crop',
    year: 2024,
    songs: [
      {
        id: 'podcast-3-ep-1',
        title: 'Episódio #333 - Tecnologia e Futuro',
        artist: 'Igor Coelho & Bruno Aiub',
        albumArtUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=200&h=200&fit=crop',
        albumTitle: 'Flow Podcast',
        trackNumber: 1,
      },
    ],
  },
  {
    id: 'podcast-4',
    title: 'Mano a Mano',
    artist: 'Mano Brown',
    coverUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=200&h=200&fit=crop',
    year: 2024,
    songs: [
      {
        id: 'podcast-4-ep-1',
        title: 'Episódio #42 - Rap Nacional',
        artist: 'Mano Brown',
        albumArtUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=200&h=200&fit=crop',
        albumTitle: 'Mano a Mano',
        trackNumber: 1,
      },
    ],
  },
  {
    id: 'podcast-5',
    title: 'Venus Podcast',
    artist: 'Ju Ferreira',
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop',
    year: 2024,
    songs: [
      {
        id: 'podcast-5-ep-1',
        title: 'Episódio #128 - Empoderamento Feminino',
        artist: 'Ju Ferreira',
        albumArtUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop',
        albumTitle: 'Venus Podcast',
        trackNumber: 1,
      },
    ],
  },
  {
    id: 'podcast-6',
    title: 'Inteligência LTDA',
    artist: 'Rogério Vilela & Débora Garofalo',
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop',
    year: 2024,
    songs: [
      {
        id: 'podcast-6-ep-1',
        title: 'Episódio #87 - IA e Educação',
        artist: 'Rogério Vilela & Débora Garofalo',
        albumArtUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop',
        albumTitle: 'Inteligência LTDA',
        trackNumber: 1,
      },
    ],
  },
  {
    id: 'podcast-7',
    title: 'Papagaio Falante',
    artist: 'Sérgio Mallandro & Fausto Silva',
    coverUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=200&h=200&fit=crop',
    year: 2024,
    songs: [
      {
        id: 'podcast-7-ep-1',
        title: 'Episódio #156 - Humor e Nostalgia',
        artist: 'Sérgio Mallandro & Fausto Silva',
        albumArtUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=200&h=200&fit=crop',
        albumTitle: 'Papagaio Falante',
        trackNumber: 1,
      },
    ],
  },
  {
    id: 'podcast-8',
    title: 'Nerdcast',
    artist: 'Jovem Nerd',
    coverUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=200&h=200&fit=crop',
    year: 2024,
    songs: [
      {
        id: 'podcast-8-ep-1',
        title: 'NerdTech #156 - Tecnologia do Futuro',
        artist: 'Jovem Nerd',
        albumArtUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=200&h=200&fit=crop',
        albumTitle: 'Nerdcast',
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
