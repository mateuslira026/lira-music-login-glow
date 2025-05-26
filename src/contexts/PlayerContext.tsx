
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Song {
  id: string;
  title: string;
  artist: string;
  albumArtUrl: string;
  // duration?: number; // Futuramente
}

interface PlayerContextType {
  currentSong: Song | null;
  setCurrentSong: (song: Song | null) => void;
  isPlaying: boolean;
  togglePlay: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (currentSong) {
      setIsPlaying(!isPlaying);
    }
  };

  const handleSetCurrentSong = (song: Song | null) => {
    setCurrentSong(song);
    if (song) {
      setIsPlaying(true); // Auto-play when a new song is set
    } else {
      setIsPlaying(false);
    }
  };

  return (
    <PlayerContext.Provider value={{ currentSong, setCurrentSong: handleSetCurrentSong, isPlaying, togglePlay }}>
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
