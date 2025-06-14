
import { useState, useEffect } from 'react';
import { SpotifyService } from '@/services/spotifyService';
import { Song } from '@/contexts/PlayerContext';

interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  album: {
    name: string;
    images: Array<{ url: string }>;
  };
  preview_url: string | null;
}

export const useSpotify = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [playlists, setPlaylists] = useState<any[]>([]);

  useEffect(() => {
    setIsAuthenticated(SpotifyService.isAuthenticated());
  }, []);

  const login = () => {
    window.location.href = SpotifyService.getAuthUrl();
  };

  const logout = () => {
    SpotifyService.logout();
    setIsAuthenticated(false);
    setPlaylists([]);
  };

  const searchTracks = async (query: string): Promise<Song[]> => {
    if (!isAuthenticated) throw new Error('Not authenticated with Spotify');
    
    setIsLoading(true);
    try {
      const response = await SpotifyService.searchTracks(query);
      const tracks = response.tracks.items.map((track: SpotifyTrack) => ({
        id: track.id,
        title: track.name,
        artist: track.artists.map(a => a.name).join(', '),
        albumTitle: track.album.name,
        albumArtUrl: track.album.images[0]?.url || '',
        audioUrl: track.preview_url || '' // Spotify só oferece 30s de preview na API pública
      }));
      return tracks;
    } finally {
      setIsLoading(false);
    }
  };

  const getUserPlaylists = async () => {
    if (!isAuthenticated) throw new Error('Not authenticated with Spotify');
    
    setIsLoading(true);
    try {
      const response = await SpotifyService.getUserPlaylists();
      setPlaylists(response.items);
      return response.items;
    } finally {
      setIsLoading(false);
    }
  };

  const getPlaylistTracks = async (playlistId: string): Promise<Song[]> => {
    if (!isAuthenticated) throw new Error('Not authenticated with Spotify');
    
    setIsLoading(true);
    try {
      const response = await SpotifyService.getPlaylistTracks(playlistId);
      const tracks = response.items.map((item: any) => {
        const track = item.track;
        return {
          id: track.id,
          title: track.name,
          artist: track.artists.map((a: any) => a.name).join(', '),
          albumTitle: track.album.name,
          albumArtUrl: track.album.images[0]?.url || '',
          audioUrl: track.preview_url || ''
        };
      });
      return tracks;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isAuthenticated,
    isLoading,
    playlists,
    login,
    logout,
    searchTracks,
    getUserPlaylists,
    getPlaylistTracks
  };
};
