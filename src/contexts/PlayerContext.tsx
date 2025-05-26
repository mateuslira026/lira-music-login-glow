
import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export interface Song {
  id: string;
  title: string;
  artist: string;
  albumArtUrl: string;
  albumTitle?: string; // Adicionado
  trackNumber?: number; // Adicionado
  // duration?: number; // Futuramente
}

interface PlayerContextType {
  currentSong: Song | null;
  setCurrentSong: (song: Song | null) => void;
  playlist: Song[];
  currentTrackIndex: number | null;
  playPlaylist: (songs: Song[], startIndex?: number) => void;
  playNext: () => void;
  playPrevious: () => void;
  isPlaying: boolean;
  togglePlay: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSongInternal] = useState<Song | null>(null);
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (currentSong) {
      setIsPlaying(!isPlaying);
    }
  };

  const setCurrentSong = useCallback((song: Song | null) => {
    setCurrentSongInternal(song);
    if (song) {
      setIsPlaying(true); // Auto-play when a new song is set directly
      // If a single song is set, clear playlist context or find it in current playlist
      const indexInPlaylist = playlist.findIndex(s => s.id === song.id);
      if (indexInPlaylist !== -1) {
        setCurrentTrackIndex(indexInPlaylist);
      } else {
        // Clears playlist if song is not part of current one
        setPlaylist(song ? [song] : []);
        setCurrentTrackIndex(song ? 0 : null);
      }
    } else {
      setIsPlaying(false);
      setPlaylist([]);
      setCurrentTrackIndex(null);
    }
  }, [playlist]);

  const playPlaylist = useCallback((songs: Song[], startIndex: number = 0) => {
    setPlaylist(songs);
    if (songs.length > 0 && startIndex < songs.length) {
      setCurrentTrackIndex(startIndex);
      setCurrentSongInternal(songs[startIndex]);
      setIsPlaying(true);
    } else {
      setCurrentSongInternal(null);
      setIsPlaying(false);
      setCurrentTrackIndex(null);
    }
  }, []);

  const playNext = useCallback(() => {
    if (playlist.length > 0 && currentTrackIndex !== null) {
      const nextIndex = (currentTrackIndex + 1) % playlist.length;
      setCurrentTrackIndex(nextIndex);
      setCurrentSongInternal(playlist[nextIndex]);
      setIsPlaying(true);
    }
  }, [playlist, currentTrackIndex]);

  const playPrevious = useCallback(() => {
    if (playlist.length > 0 && currentTrackIndex !== null) {
      const prevIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
      setCurrentTrackIndex(prevIndex);
      setCurrentSongInternal(playlist[prevIndex]);
      setIsPlaying(true);
    }
  }, [playlist, currentTrackIndex]);


  return (
    <PlayerContext.Provider value={{ 
      currentSong, 
      setCurrentSong, 
      playlist,
      currentTrackIndex,
      playPlaylist,
      playNext,
      playPrevious,
      isPlaying, 
      togglePlay 
    }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = (): PlayerContextType => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
