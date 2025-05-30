import React from 'react';
import AppHeader from '@/components/layout/AppHeader';
import MusicSection from '@/components/music/MusicSection';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Album } from '@/components/music/AlbumCard'; 
import { usePlayer, Song as PlayerSong } from '@/contexts/PlayerContext';

export interface AlbumWithSongs extends Album {
  songs: PlayerSong[];
}

const createPlaceholderSongs = (albumId: string, artistName: string, albumCover: string, albumTitle: string, numSongs: number): PlayerSong[] => {
  return Array.from({ length: numSongs }, (s, songIdx) => ({
    id: `${albumId}-song-${songIdx + 1}`,
    title: `Música ${songIdx + 1}`,
    artist: artistName,
    albumArtUrl: albumCover,
    albumTitle: albumTitle,
    trackNumber: songIdx + 1,
  }));
};

const createPlaceholderEpisodes = (podcastId: string, showHost: string, showCover: string, showName: string, numEpisodes: number): PlayerSong[] => {
  return Array.from({ length: numEpisodes }, (s, episodeIdx) => ({
    id: `${podcastId}-episode-${episodeIdx + 1}`,
    title: `Episódio ${episodeIdx + 1}: Tema Interessante`,
    artist: showHost,
    albumArtUrl: showCover,
    albumTitle: showName,
    trackNumber: episodeIdx + 1,
  }));
};

const placeholderAlbums: AlbumWithSongs[] = Array.from({ length: 20 }, (_, i) => {
  const albumId = `album-${i + 1}`;
  const albumCover = `https://picsum.photos/seed/${albumId}/200/200`;
  const artistName = `Artista Variado ${i % 5 + 1}`;
  const albumTitle = `Coletânea ${i + 1}`;
  return {
    id: albumId,
    title: albumTitle,
    artist: artistName,
    coverUrl: albumCover,
    songs: createPlaceholderSongs(albumId, artistName, albumCover, albumTitle, 5 + (i % 5)),
  };
});

const mixesMaisOuvidos = placeholderAlbums.slice(0, 7);
const recentesAlbums = [...placeholderAlbums].sort(() => 0.5 - Math.random()).slice(0, 8);
const paraVoceAlbums = [...placeholderAlbums].sort(() => Math.random() - 0.5).slice(0, 6);
const novosLancamentosAlbums = [...placeholderAlbums].sort(() => Math.random() - 0.5).slice(0, 5);

const seusArtistasFavoritosData: AlbumWithSongs[] = Array.from({ length: 5 }, (_, i) => {
  const artistId = `fav-artist-${i + 1}`;
  const artistName = `Artista Favorito ${i + 1}`;
  const coverUrl = `https://picsum.photos/seed/${artistId}/200/200`;
  return {
    id: artistId,
    title: artistName,
    artist: "Destaque",
    coverUrl: coverUrl,
    songs: createPlaceholderSongs(artistId, artistName, coverUrl, artistName, 1 + (i % 3)),
  };
});

const flashbackData: AlbumWithSongs[] = Array.from({ length: 6 }, (_, i) => {
  const flashbackId = `flashback-${i + 1}`;
  const year = 1980 + i * 5;
  const title = `Flashback ${year}s`;
  const coverUrl = `https://picsum.photos/seed/${flashbackId}/200/200`;
  return {
    id: flashbackId,
    title: title,
    artist: "Clássicos Inesquecíveis",
    coverUrl: coverUrl,
    songs: createPlaceholderSongs(flashbackId, "Vários Artistas", coverUrl, title, 7 + (i % 4)),
  };
});

const placeholderPodcasts: AlbumWithSongs[] = Array.from({ length: 7 }, (_, i) => {
  const podcastId = `podcast-${i + 1}`;
  const podcastCover = `https://picsum.photos/seed/${podcastId}/200/200`;
  const showHost = `Apresentador ${i + 1}`;
  const showName = `Podcast Show ${i + 1}`;
  return {
    id: podcastId,
    title: showName,
    artist: showHost,
    coverUrl: podcastCover,
    songs: createPlaceholderEpisodes(podcastId, showHost, podcastCover, showName, 3 + (i % 3)),
  };
});

export const getAlbumById = (id: string): AlbumWithSongs | undefined => {
  const allAlbums = [
    ...placeholderAlbums,
    ...seusArtistasFavoritosData,
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
            <MusicSection title="Mixes Mais Ouvidos" albums={mixesMaisOuvidos} />
            <MusicSection title="Seus artistas favoritos" albums={seusArtistasFavoritosData} />
            <MusicSection title="Podcasts" albums={placeholderPodcasts} />
            
            {currentSong && (
              <MusicSection title="Recentes" albums={recentesAlbums} />
            )}
            
            <MusicSection title="Flashback" albums={flashbackData} />
            <MusicSection title="Novos Lançamentos" albums={novosLancamentosAlbums} />
            <MusicSection title="Para Você" albums={paraVoceAlbums} />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default HomePage;
