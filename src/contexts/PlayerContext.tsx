
import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';

export interface Song {
  id: string;
  title: string;
  artist: string;
  albumArtUrl: string;
  albumTitle?: string; 
  trackNumber?: number;
  audioUrl?: string;
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
  likedSongs: Song[];
  toggleLike: (song: Song) => void;
  isLiked: (songId: string) => boolean;
  // Audio player state
  currentTime: number;
  duration: number;
  volume: number;
  isLoading: boolean;
  audioError: string | null;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

// Real audio URLs for testing
const getAudioUrl = (songId: string): string => {
  const audioUrls: Record<string, string> = {
    '1': 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_7bf21c5b9c.mp3?filename=relaxing-music-1-6033.mp3',
    '2': 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    '3': 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_7bf21c5b9c.mp3?filename=relaxing-music-1-6033.mp3',
    // Add more real audio URLs as needed
  };
  
  return audioUrls[songId] || 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav';
};

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSongInternal] = useState<Song | null>(null);
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);
  const [likedSongs, setLikedSongs] = useState<Song[]>([]);
  
  const audioPlayer = useAudioPlayer();

  const togglePlay = useCallback(async () => {
    if (currentSong) {
      if (audioPlayer.isPlaying) {
        audioPlayer.pause();
      } else {
        await audioPlayer.play();
      }
    }
  }, [currentSong, audioPlayer]);

  const toggleLike = useCallback((song: Song) => {
    setLikedSongs(prev => {
      const isAlreadyLiked = prev.some(likedSong => likedSong.id === song.id);
      if (isAlreadyLiked) {
        return prev.filter(likedSong => likedSong.id !== song.id);
      } else {
        return [...prev, song];
      }
    });
  }, []);

  const isLiked = useCallback((songId: string) => {
    return likedSongs.some(song => song.id === songId);
  }, [likedSongs]);

  const loadSongAudio = useCallback(async (song: Song) => {
    console.log('Loading audio for song:', song.title);
    
    // Use the real audio URL or get one based on song ID
    const audioUrl = song.audioUrl || getAudioUrl(song.id);
    console.log('Audio URL:', audioUrl);
    
    audioPlayer.loadAudio(audioUrl);
  }, [audioPlayer]);

  const setCurrentSong = useCallback((song: Song | null) => {
    console.log('PlayerContext: setCurrentSong called with:', song);
    setCurrentSongInternal(song);
    if (song) {
      loadSongAudio(song);
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
      audioPlayer.pause();
      setPlaylist([]);
      setCurrentTrackIndex(null);
    }
  }, [playlist, loadSongAudio, audioPlayer]);

  const playPlaylist = useCallback((songs: Song[], startIndex: number = 0) => {
    console.log('PlayerContext: playPlaylist called with:', songs.length, 'songs, startIndex:', startIndex);
    setPlaylist(songs);
    if (songs.length > 0 && startIndex < songs.length) {
      setCurrentTrackIndex(startIndex);
      setCurrentSongInternal(songs[startIndex]);
      loadSongAudio(songs[startIndex]);
      console.log('PlayerContext: Set current song to:', songs[startIndex]);
    } else {
      setCurrentSongInternal(null);
      setCurrentTrackIndex(null);
    }
  }, [loadSongAudio]);

  const playNext = useCallback(() => {
    console.log('playNext called - playlist length:', playlist.length, 'currentTrackIndex:', currentTrackIndex);
    if (playlist.length > 0 && currentTrackIndex !== null) {
      const nextIndex = (currentTrackIndex + 1) % playlist.length;
      console.log('Moving to next index:', nextIndex, 'song:', playlist[nextIndex]?.title);
      setCurrentTrackIndex(nextIndex);
      setCurrentSongInternal(playlist[nextIndex]);
      loadSongAudio(playlist[nextIndex]);
    }
  }, [playlist, currentTrackIndex, loadSongAudio]);

  const playPrevious = useCallback(() => {
    console.log('playPrevious called - playlist length:', playlist.length, 'currentTrackIndex:', currentTrackIndex);
    if (playlist.length > 0 && currentTrackIndex !== null) {
      const prevIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
      console.log('Moving to previous index:', prevIndex, 'song:', playlist[prevIndex]?.title);
      setCurrentTrackIndex(prevIndex);
      setCurrentSongInternal(playlist[prevIndex]);
      loadSongAudio(playlist[prevIndex]);
    }
  }, [playlist, currentTrackIndex, loadSongAudio]);

  // Auto-play next song when current one ends
  useEffect(() => {
    if (!audioPlayer.isPlaying && audioPlayer.currentTime > 0 && audioPlayer.duration > 0 && audioPlayer.currentTime >= audioPlayer.duration) {
      if (playlist.length > 1) {
        playNext();
      }
    }
  }, [audioPlayer.isPlaying, audioPlayer.currentTime, audioPlayer.duration, playlist.length, playNext]);

  return (
    <PlayerContext.Provider value={{ 
      currentSong, 
      setCurrentSong, 
      playlist,
      currentTrackIndex,
      playPlaylist,
      playNext,
      playPrevious,
      isPlaying: audioPlayer.isPlaying, 
      togglePlay,
      likedSongs,
      toggleLike,
      isLiked,
      currentTime: audioPlayer.currentTime,
      duration: audioPlayer.duration,
      volume: audioPlayer.volume,
      isLoading: audioPlayer.isLoading,
      audioError: audioPlayer.error,
      seek: audioPlayer.seek,
      setVolume: audioPlayer.setVolume,
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
