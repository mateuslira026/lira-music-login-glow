import { Song as PlayerSong } from '@/contexts/PlayerContext';

export interface RealArtist {
  id: string;
  name: string;
  profileImageUrl: string;
  monthlyListeners: number;
  songs: PlayerSong[];
}

export interface RealAlbum {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  year: number;
  songs: PlayerSong[];
}

// Taylor Swift
const taylorSwiftSongs: PlayerSong[] = [
  {
    id: 'taylor-1',
    title: 'Anti-Hero',
    artist: 'Taylor Swift',
    albumArtUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop',
    albumTitle: 'Midnights',
    trackNumber: 1,
    audioUrl: 'https://www.youtube.com/watch?v=bJojPLzLyLY',
  },
  {
    id: 'taylor-2',
    title: 'Shake It Off',
    artist: 'Taylor Swift',
    albumArtUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&h=500&fit=crop',
    albumTitle: '1989',
    trackNumber: 1,
    audioUrl: 'https://www.youtube.com/watch?v=nfWlot6h_JM',
  },
  {
    id: 'taylor-3',
    title: 'Blank Space',
    artist: 'Taylor Swift',
    albumArtUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&h=500&fit=crop',
    albumTitle: '1989',
    trackNumber: 2,
    audioUrl: 'https://www.youtube.com/watch?v=mWmT8f43FQk',
  },
  {
    id: 'taylor-4',
    title: 'Love Story',
    artist: 'Taylor Swift',
    albumArtUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=500&fit=crop',
    albumTitle: 'Fearless',
    trackNumber: 1,
    audioUrl: 'https://www.youtube.com/watch?v=8xg3vE8Ie_E',
  },
];

// Drake
const drakeSongs: PlayerSong[] = [
  {
    id: 'drake-1',
    title: "God's Plan",
    artist: 'Drake',
    albumArtUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=500&h=500&fit=crop',
    albumTitle: 'Scorpion',
    trackNumber: 1,
    audioUrl: 'https://www.youtube.com/watch?v=xpVfcZ0ZcFM',
  },
  {
    id: 'drake-2',
    title: 'In My Feelings',
    artist: 'Drake',
    albumArtUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=500&h=500&fit=crop',
    albumTitle: 'Scorpion',
    trackNumber: 2,
    audioUrl: 'https://www.youtube.com/watch?v=DRS_PpOrUZ4',
  },
  {
    id: 'drake-3',
    title: 'Hotline Bling',
    artist: 'Drake',
    albumArtUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500&h=500&fit=crop',
    albumTitle: 'Views',
    trackNumber: 1,
    audioUrl: 'https://www.youtube.com/watch?v=uxpDa-c-4Mc',
  },
  {
    id: 'drake-4',
    title: 'One Dance',
    artist: 'Drake',
    albumArtUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500&h=500&fit=crop',
    albumTitle: 'Views',
    trackNumber: 2,
    audioUrl: 'https://www.youtube.com/watch?v=DhCWBxNanuM',
  },
];

// Billie Eilish
const billieEilishSongs: PlayerSong[] = [
  {
    id: 'billie-1',
    title: 'Bad Guy',
    artist: 'Billie Eilish',
    albumArtUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&h=500&fit=crop',
    albumTitle: 'When We All Fall Asleep, Where Do We Go?',
    trackNumber: 1,
    audioUrl: 'https://www.youtube.com/watch?v=DyDfgMOUjCI',
  },
  {
    id: 'billie-2',
    title: 'Happier Than Ever',
    artist: 'Billie Eilish',
    albumArtUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop',
    albumTitle: 'Happier Than Ever',
    trackNumber: 1,
    audioUrl: 'https://www.youtube.com/watch?v=5GJWxDKyk3A',
  },
  {
    id: 'billie-3',
    title: 'Ocean Eyes',
    artist: 'Billie Eilish',
    albumArtUrl: 'https://images.unsplash.com/photo-1571974599782-87663a5d9c44?w=500&h=500&fit=crop',
    albumTitle: 'Dont Smile At Me',
    trackNumber: 1,
    audioUrl: 'https://www.youtube.com/watch?v=viimfQi_pUw',
  },
  {
    id: 'billie-4',
    title: 'Therefore I Am',
    artist: 'Billie Eilish',
    albumArtUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop',
    albumTitle: 'Happier Than Ever',
    trackNumber: 2,
    audioUrl: 'https://www.youtube.com/watch?v=RUQl6YcMalg',
  },
];

// Ed Sheeran
const edSheeranSongs: PlayerSong[] = [
  {
    id: 'ed-1',
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    albumArtUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=500&fit=crop',
    albumTitle: '÷ (Divide)',
    trackNumber: 1,
    audioUrl: 'https://www.youtube.com/watch?v=JGwWNGJdvx8',
  },
  {
    id: 'ed-2',
    title: 'Perfect',
    artist: 'Ed Sheeran',
    albumArtUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=500&fit=crop',
    albumTitle: '÷ (Divide)',
    trackNumber: 2,
    audioUrl: 'https://www.youtube.com/watch?v=2Vv-BfVoq4g',
  },
  {
    id: 'ed-3',
    title: 'Thinking Out Loud',
    artist: 'Ed Sheeran',
    albumArtUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&h=500&fit=crop',
    albumTitle: 'x (Multiply)',
    trackNumber: 1,
    audioUrl: 'https://www.youtube.com/watch?v=lp-EO5I60KA',
  },
  {
    id: 'ed-4',
    title: 'Castle on the Hill',
    artist: 'Ed Sheeran',
    albumArtUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=500&fit=crop',
    albumTitle: '÷ (Divide)',
    trackNumber: 3,
    audioUrl: 'https://www.youtube.com/watch?v=K0ibBPhiaG0',
  },
];

// Adele
const adeleSongs: PlayerSong[] = [
  {
    id: 'adele-1',
    title: 'Rolling in the Deep',
    artist: 'Adele',
    albumArtUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500&h=500&fit=crop',
    albumTitle: '21',
    trackNumber: 1,
    audioUrl: 'https://www.youtube.com/watch?v=rYEDA3JcQqw',
  },
  {
    id: 'adele-2',
    title: 'Someone Like You',
    artist: 'Adele',
    albumArtUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500&h=500&fit=crop',
    albumTitle: '21',
    trackNumber: 2,
    audioUrl: 'https://www.youtube.com/watch?v=hLQl3WQQoQ0',
  },
  {
    id: 'adele-3',
    title: 'Hello',
    artist: 'Adele',
    albumArtUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&h=500&fit=crop',
    albumTitle: '25',
    trackNumber: 1,
    audioUrl: 'https://www.youtube.com/watch?v=YQHsXMglC9A',
  },
  {
    id: 'adele-4',
    title: 'Set Fire to the Rain',
    artist: 'Adele',
    albumArtUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500&h=500&fit=crop',
    albumTitle: '21',
    trackNumber: 3,
    audioUrl: 'https://www.youtube.com/watch?v=FlsBObg-1BQ',
  },
];

// Artistas Reais
export const realArtists: RealArtist[] = [
  {
    id: 'taylor-swift',
    name: 'Taylor Swift',
    profileImageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    monthlyListeners: 83000000,
    songs: taylorSwiftSongs,
  },
  {
    id: 'drake',
    name: 'Drake',
    profileImageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop',
    monthlyListeners: 78000000,
    songs: drakeSongs,
  },
  {
    id: 'billie-eilish',
    name: 'Billie Eilish',
    profileImageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop',
    monthlyListeners: 65000000,
    songs: billieEilishSongs,
  },
  {
    id: 'ed-sheeran',
    name: 'Ed Sheeran',
    profileImageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
    monthlyListeners: 72000000,
    songs: edSheeranSongs,
  },
  {
    id: 'adele',
    name: 'Adele',
    profileImageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=400&fit=crop',
    monthlyListeners: 54000000,
    songs: adeleSongs,
  },
];

// Álbuns Reais Populares
export const realAlbums: RealAlbum[] = [
  {
    id: 'midnights',
    title: 'Midnights',
    artist: 'Taylor Swift',
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop',
    year: 2022,
    songs: taylorSwiftSongs.filter(song => song.albumTitle === 'Midnights'),
  },
  {
    id: '1989',
    title: '1989',
    artist: 'Taylor Swift',
    coverUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&h=500&fit=crop',
    year: 2014,
    songs: taylorSwiftSongs.filter(song => song.albumTitle === '1989'),
  },
  {
    id: 'scorpion',
    title: 'Scorpion',
    artist: 'Drake',
    coverUrl: 'https://images.unsplash.com/photo-1571974599782-87663a5d9c44?w=500&h=500&fit=crop',
    year: 2018,
    songs: drakeSongs.filter(song => song.albumTitle === 'Scorpion'),
  },
  {
    id: 'views',
    title: 'Views',
    artist: 'Drake',
    coverUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500&h=500&fit=crop',
    year: 2016,
    songs: drakeSongs.filter(song => song.albumTitle === 'Views'),
  },
  {
    id: 'when-we-all-fall-asleep',
    title: 'When We All Fall Asleep, Where Do We Go?',
    artist: 'Billie Eilish',
    coverUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&h=500&fit=crop',
    year: 2019,
    songs: billieEilishSongs.filter(song => song.albumTitle === 'When We All Fall Asleep, Where Do We Go?'),
  },
  {
    id: 'happier-than-ever',
    title: 'Happier Than Ever',
    artist: 'Billie Eilish',
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop',
    year: 2021,
    songs: billieEilishSongs.filter(song => song.albumTitle === 'Happier Than Ever'),
  },
  {
    id: 'divide',
    title: '÷ (Divide)',
    artist: 'Ed Sheeran',
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=500&fit=crop',
    year: 2017,
    songs: edSheeranSongs.filter(song => song.albumTitle === '÷ (Divide)'),
  },
  {
    id: '21',
    title: '21',
    artist: 'Adele',
    coverUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500&h=500&fit=crop',
    year: 2011,
    songs: adeleSongs.filter(song => song.albumTitle === '21'),
  },
  {
    id: '25',
    title: '25',
    artist: 'Adele',
    coverUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&h=500&fit=crop',
    year: 2015,
    songs: adeleSongs.filter(song => song.albumTitle === '25'),
  },
];

// Playlists e Mixes Populares
export const popularMixes: RealAlbum[] = [
  {
    id: 'today-hits',
    title: "Today's Top Hits",
    artist: 'Lira Music',
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop',
    year: 2024,
    songs: [
      ...taylorSwiftSongs.slice(0, 2),
      ...drakeSongs.slice(0, 2),
      ...billieEilishSongs.slice(0, 1),
    ],
  },
  {
    id: 'pop-hits',
    title: 'Pop Hits',
    artist: 'Lira Music',
    coverUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&h=500&fit=crop',
    year: 2024,
    songs: [
      ...taylorSwiftSongs.slice(0, 2),
      ...edSheeranSongs.slice(0, 2),
      ...billieEilishSongs.slice(0, 1),
    ],
  },
  {
    id: 'chill-hits',
    title: 'Chill Hits',
    artist: 'Lira Music',
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=500&fit=crop',
    year: 2024,
    songs: [
      ...edSheeranSongs.slice(0, 2),
      ...adeleSongs.slice(0, 2),
      ...billieEilishSongs.slice(2, 3),
    ],
  },
  {
    id: 'rap-hits',
    title: 'RapCaviar',
    artist: 'Lira Music',
    coverUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=500&h=500&fit=crop',
    year: 2024,
    songs: drakeSongs,
  },
  {
    id: 'feel-good',
    title: 'Feel Good Pop',
    artist: 'Lira Music',
    coverUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500&h=500&fit=crop',
    year: 2024,
    songs: [
      ...taylorSwiftSongs.slice(1, 3),
      ...edSheeranSongs.slice(0, 2),
    ],
  },
  {
    id: 'throwback',
    title: 'Throwback Hits',
    artist: 'Lira Music',
    coverUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&h=500&fit=crop',
    year: 2024,
    songs: [
      ...adeleSongs.slice(0, 2),
      ...taylorSwiftSongs.slice(2, 4),
      ...edSheeranSongs.slice(2, 3),
    ],
  },
];

// Função para buscar álbum por ID
export const getRealAlbumById = (id: string): RealAlbum | undefined => {
  const allAlbums = [...realAlbums, ...popularMixes];
  return allAlbums.find(album => album.id === id);
};

// Função para buscar artista por ID
export const getRealArtistById = (id: string): RealArtist | undefined => {
  return realArtists.find(artist => artist.id === id);
};

// Todas as músicas disponíveis
export const getAllSongs = (): PlayerSong[] => {
  return realArtists.flatMap(artist => artist.songs);
};
