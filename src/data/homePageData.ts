
import { Album } from '@/components/music/AlbumCard';
import { Artist } from '@/components/music/ArtistCard';
import { Song as PlayerSong } from '@/contexts/PlayerContext';
import { realArtists, realAlbums, popularMixes, getRealAlbumById } from '@/data/musicData';
import { flashbackData } from './flashbackData';
import { placeholderPodcasts } from './podcastData';

export interface AlbumWithSongs extends Album {
  songs: any[];
  year?: number;
}

// Converter dados reais para formato esperado pelos componentes
const convertRealAlbumsToAlbums = (realAlbums: any[]): AlbumWithSongs[] => {
  return realAlbums.map(album => ({
    id: album.id,
    title: album.title,
    artist: album.artist,
    coverUrl: album.coverUrl,
    songs: album.songs,
    year: album.year,
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

// Criar uma lista personalizada para "Para você" com mais variedade
const createParaVoceAlbums = (): AlbumWithSongs[] => {
  const allContent = [...realAlbums, ...popularMixes];
  const shuffled = allContent.sort(() => Math.random() - 0.5);
  return convertRealAlbumsToAlbums(shuffled.slice(0, 8));
};

// Dados organizados
export const mixesMaisOuvidos = convertRealAlbumsToAlbums(popularMixes);

// Criar recentes albums removendo "Lira Music" dos mixes e deixando só o título
export const recentesAlbums = (() => {
  const allContent = [...realAlbums, ...popularMixes];
  const shuffled = allContent.sort(() => 0.5 - Math.random()).slice(0, 8);
  
  return shuffled.map(album => ({
    id: album.id,
    title: album.title,
    artist: album.artist === 'Lira Music' ? album.title : album.artist,
    coverUrl: album.coverUrl, // Garantir que coverUrl está sendo preservado
    songs: album.songs || [],
    year: album.year,
  }));
})();

export const paraVoceAlbums = createParaVoceAlbums();

// Expandir novos lançamentos para incluir mais álbuns
export const novosLancamentosAlbums = convertRealAlbumsToAlbums([
  ...realAlbums.filter(album => album.year >= 2020),
  // Adicionar alguns mixes como "novos lançamentos"
  ...popularMixes.slice(0, 4)
]);

export const seusArtistasFavoritos = convertRealArtistsToArtists(realArtists);

// Export the data from other files
export { flashbackData } from './flashbackData';
export { placeholderPodcasts } from './podcastData';

export const getAlbumById = (id: string): AlbumWithSongs | undefined => {
  const realAlbum = getRealAlbumById(id);
  if (realAlbum) {
    return {
      id: realAlbum.id,
      title: realAlbum.title,
      artist: realAlbum.artist,
      coverUrl: realAlbum.coverUrl,
      songs: realAlbum.songs,
      year: realAlbum.year,
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
