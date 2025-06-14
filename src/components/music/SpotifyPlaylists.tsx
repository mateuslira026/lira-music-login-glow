
import React, { useEffect, useState } from 'react';
import { useSpotify } from '@/hooks/useSpotify';
import { usePlayer } from '@/contexts/PlayerContext';
import { Button } from '@/components/ui/button';
import { Play, Music } from 'lucide-react';
import { Song } from '@/contexts/PlayerContext';

const SpotifyPlaylists = () => {
  const { isAuthenticated, getUserPlaylists, getPlaylistTracks, playlists, isLoading } = useSpotify();
  const { playPlaylist } = usePlayer();
  const [loadingPlaylist, setLoadingPlaylist] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated && playlists.length === 0) {
      getUserPlaylists();
    }
  }, [isAuthenticated]);

  const handlePlayPlaylist = async (playlistId: string, playlistName: string) => {
    setLoadingPlaylist(playlistId);
    try {
      const tracks = await getPlaylistTracks(playlistId);
      if (tracks.length > 0) {
        playPlaylist(tracks);
      }
    } catch (error) {
      console.error('Failed to load playlist:', error);
    } finally {
      setLoadingPlaylist(null);
    }
  };

  if (!isAuthenticated || playlists.length === 0) {
    return null;
  }

  return (
    <div className="px-4 mb-6">
      <h2 className="text-xl font-bold text-white mb-4">Suas Playlists do Spotify</h2>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {playlists.slice(0, 10).map((playlist) => (
          <div 
            key={playlist.id}
            className="flex-shrink-0 w-40 bg-gray-800/50 rounded-lg p-3 hover:bg-gray-700/50 transition-colors"
          >
            <div className="aspect-square mb-2 relative group">
              <img 
                src={playlist.images[0]?.url || '/placeholder.svg'} 
                alt={playlist.name}
                className="w-full h-full object-cover rounded-md"
              />
              <Button
                size="icon"
                className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-green-500 hover:bg-green-600 rounded-full"
                onClick={() => handlePlayPlaylist(playlist.id, playlist.name)}
                disabled={loadingPlaylist === playlist.id}
              >
                {loadingPlaylist === playlist.id ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-white text-sm font-semibold truncate">{playlist.name}</p>
            <p className="text-gray-400 text-xs">{playlist.tracks.total} músicas</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpotifyPlaylists;
