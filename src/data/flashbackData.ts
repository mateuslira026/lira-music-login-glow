
import { AlbumWithSongs } from './homePageData';
import { realArtists } from './musicData';

// Expandir flashback com mais variedade
export const flashbackData: AlbumWithSongs[] = [
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
];
