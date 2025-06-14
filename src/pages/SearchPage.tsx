
import React, { useState } from 'react';
import AppHeader from '@/components/layout/AppHeader';
import MiniPlayer from '@/components/music/MiniPlayer';
import BottomNav from '@/components/layout/BottomNav';
import SpotifyLogin from '@/components/music/SpotifyLogin';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Play } from 'lucide-react';
import { useSpotify } from '@/hooks/useSpotify';
import { usePlayer } from '@/contexts/PlayerContext';
import { Song } from '@/contexts/PlayerContext';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { isAuthenticated, searchTracks } = useSpotify();
  const { setCurrentSong, playPlaylist } = usePlayer();

  const handleSearch = async () => {
    if (!searchQuery.trim() || !isAuthenticated) return;
    
    setIsSearching(true);
    try {
      const results = await searchTracks(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handlePlaySong = (song: Song, index: number) => {
    playPlaylist(searchResults, index);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col min-h-screen h-full bg-gradient-to-b from-lira-dark-page to-black text-white">
      <AppHeader />
      
      <ScrollArea className="flex-1 overflow-y-auto pb-36">
        <div className="pt-2 pb-4 px-4">
          <div className="mb-6">
            <SpotifyLogin />
          </div>

          {isAuthenticated && (
            <>
              <div className="flex gap-2 mb-6">
                <Input
                  type="text"
                  placeholder="Buscar músicas no Spotify..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
                <Button 
                  onClick={handleSearch} 
                  disabled={isSearching || !searchQuery.trim()}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isSearching ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {searchResults.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Resultados da Busca</h2>
                  <div className="space-y-2">
                    {searchResults.map((song, index) => (
                      <div 
                        key={song.id}
                        className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer"
                        onClick={() => handlePlaySong(song, index)}
                      >
                        <img 
                          src={song.albumArtUrl} 
                          alt={song.title}
                          className="w-12 h-12 rounded-md"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold truncate">{song.title}</p>
                          <p className="text-gray-400 text-sm truncate">{song.artist}</p>
                          <p className="text-gray-500 text-xs truncate">{song.albumTitle}</p>
                        </div>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="text-green-500 hover:text-green-400 hover:bg-green-500/10"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlaySong(song, index);
                          }}
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {searchQuery && searchResults.length === 0 && !isSearching && (
                <div className="text-center text-gray-400 py-8">
                  <p>Nenhum resultado encontrado para "{searchQuery}"</p>
                </div>
              )}
            </>
          )}

          {!isAuthenticated && (
            <div className="text-center text-gray-400 py-8">
              <h2 className="text-xl font-bold mb-2">Conecte-se ao Spotify</h2>
              <p>Para buscar e reproduzir músicas, conecte sua conta Spotify acima.</p>
            </div>
          )}
        </div>
      </ScrollArea>
      
      <MiniPlayer />
      <BottomNav />
    </div>
  );
};

export default SearchPage;
