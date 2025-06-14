
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

// Royalty-free audio URLs for testing
const getRoyaltyFreeAudioUrl = (songId: string): string => {
  const royaltyFreeAudioUrls: Record<string, string> = {
    // Relaxing/Ambient tracks
    '1': 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_7bf21c5b9c.mp3?filename=relaxing-music-1-6033.mp3',
    '2': 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3',
    '3': 'https://cdn.pixabay.com/download/audio/2022/08/04/audio_884c9b4f1e.mp3?filename=chill-abstract-12099.mp3',
    
    // Upbeat/Electronic tracks
    'taylor-1': 'https://cdn.pixabay.com/download/audio/2022/02/22/audio_d1718ab41b.mp3?filename=beat-tokyo-114751.mp3',
    'taylor-2': 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_12b0c7443c.mp3?filename=summer-walk-152722.mp3',
    'taylor-3': 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_7bf21c5b9c.mp3?filename=relaxing-music-1-6033.mp3',
    'taylor-4': 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3',
    
    // Hip-hop/Rap style tracks
    'drake-1': 'https://cdn.pixabay.com/download/audio/2022/08/02/audio_2dde668d05.mp3?filename=energy-111134.mp3',
    'drake-2': 'https://cdn.pixabay.com/download/audio/2022/02/22/audio_d1718ab41b.mp3?filename=beat-tokyo-114751.mp3',
    'drake-3': 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_12b0c7443c.mp3?filename=summer-walk-152722.mp3',
    'drake-4': 'https://cdn.pixabay.com/download/audio/2022/08/04/audio_884c9b4f1e.mp3?filename=chill-abstract-12099.mp3',
    
    // Alternative/Indie style tracks
    'billie-1': 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3',
    'billie-2': 'https://cdn.pixabay.com/download/audio/2022/08/04/audio_884c9b4f1e.mp3?filename=chill-abstract-12099.mp3',
    'billie-3': 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_7bf21c5b9c.mp3?filename=relaxing-music-1-6033.mp3',
    'billie-4': 'https://cdn.pixabay.com/download/audio/2022/08/02/audio_2dde668d05.mp3?filename=energy-111134.mp3',
    
    // Acoustic/Folk style tracks
    'ed-1': 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_12b0c7443c.mp3?filename=summer-walk-152722.mp3',
    'ed-2': 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_7bf21c5b9c.mp3?filename=relaxing-music-1-6033.mp3',
    'ed-3': 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3',
    'ed-4': 'https://cdn.pixabay.com/download/audio/2022/08/04/audio_884c9b4f1e.mp3?filename=chill-abstract-12099.mp3',
    
    // Soul/R&B style tracks
    'adele-1': 'https://cdn.pixabay.com/download/audio/2022/08/02/audio_2dde668d05.mp3?filename=energy-111134.mp3',
    'adele-2': 'https://cdn.pixabay.com/download/audio/2022/02/22/audio_d1718ab41b.mp3?filename=beat-tokyo-114751.mp3',
    'adele-3': 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_12b0c7443c.mp3?filename=summer-walk-152722.mp3',
    'adele-4': 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3',
  };
  
  // Fallback to a default royalty-free track
  return royaltyFreeAudioUrls[songId] || 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_7bf21c5b9c.mp3?filename=relaxing-music-1-6033.mp3';
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
    console.log('Loading royalty-free audio for song:', song.title);
    
    // Use the royalty-free audio URL or get one based on song ID
    const audioUrl = song.audioUrl || getRoyaltyFreeAudioUrl(song.id);
    console.log('Royalty-free Audio URL:', audioUrl);
    
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
