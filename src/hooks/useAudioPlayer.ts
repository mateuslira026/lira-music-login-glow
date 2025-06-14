
import { useState, useRef, useEffect, useCallback } from 'react';

export interface AudioPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isLoading: boolean;
  error: string | null;
}

export const useAudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<AudioPlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isLoading: false,
    error: null,
  });

  const loadAudio = useCallback((url: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }

    // Create new audio element
    const audio = new Audio();
    audioRef.current = audio;

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    audio.addEventListener('loadstart', () => {
      setState(prev => ({ ...prev, isLoading: true }));
    });

    audio.addEventListener('loadedmetadata', () => {
      setState(prev => ({ 
        ...prev, 
        duration: audio.duration,
        isLoading: false 
      }));
    });

    audio.addEventListener('timeupdate', () => {
      setState(prev => ({ 
        ...prev, 
        currentTime: audio.currentTime 
      }));
    });

    audio.addEventListener('ended', () => {
      setState(prev => ({ ...prev, isPlaying: false, currentTime: 0 }));
    });

    audio.addEventListener('error', (e) => {
      console.error('Audio error:', e);
      setState(prev => ({ 
        ...prev, 
        error: 'Erro ao carregar áudio',
        isLoading: false,
        isPlaying: false 
      }));
    });

    audio.addEventListener('play', () => {
      setState(prev => ({ ...prev, isPlaying: true }));
    });

    audio.addEventListener('pause', () => {
      setState(prev => ({ ...prev, isPlaying: false }));
    });

    // Set source and load
    audio.src = url;
    audio.load();
  }, []);

  const play = useCallback(async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
      } catch (error) {
        console.error('Play error:', error);
        setState(prev => ({ ...prev, error: 'Erro ao reproduzir áudio' }));
      }
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  }, []);

  const setVolume = useCallback((volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      setState(prev => ({ ...prev, volume }));
    }
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  return {
    ...state,
    loadAudio,
    play,
    pause,
    seek,
    setVolume,
  };
};
