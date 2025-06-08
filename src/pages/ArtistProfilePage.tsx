
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Shuffle, Heart, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { usePlayer } from '@/contexts/PlayerContext';
import { Artist } from '@/components/music/ArtistCard';

const ArtistProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { playSong, currentSong, isPlaying } = usePlayer();
  const artist = location.state?.artist as Artist;

  if (!artist) {
    return (
      <div className="min-h-screen bg-lira-dark-page flex items-center justify-center">
        <p className="text-white">Artista não encontrado</p>
      </div>
    );
  }

  const handlePlaySong = (song: any) => {
    playSong(song);
  };

  const popularSongs = artist.songs || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-lira-dark-page to-black text-white">
      <div className="relative">
        <div className="absolute top-4 left-4 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full bg-black/50 hover:bg-black/70 text-white"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </div>

        <div className="h-80 bg-gradient-to-b from-purple-900/50 to-transparent">
          <div className="flex items-end h-full p-6">
            <div className="flex items-end space-x-6">
              <img
                src={artist.profileImageUrl}
                alt={artist.name}
                className="w-48 h-48 rounded-full shadow-2xl"
              />
              <div className="pb-4">
                <p className="text-sm font-medium mb-2">Artista</p>
                <h1 className="text-6xl font-bold mb-4">{artist.name}</h1>
                <p className="text-gray-400">
                  {popularSongs.length} músicas populares
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-6">
          <div className="flex items-center space-x-4 mb-8">
            <Button
              className="w-14 h-14 rounded-full bg-lira-blue hover:bg-lira-blue/80"
              onClick={() => popularSongs.length > 0 && handlePlaySong(popularSongs[0])}
            >
              <Play className="h-6 w-6 fill-white" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <Shuffle className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <Heart className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <MoreHorizontal className="h-6 w-6" />
            </Button>
          </div>

          <ScrollArea className="h-96">
            <div className="space-y-2">
              <h2 className="text-xl font-bold mb-4">Populares</h2>
              {popularSongs.map((song, index) => (
                <div
                  key={song.id}
                  className="flex items-center space-x-4 p-2 rounded-lg hover:bg-white/10 cursor-pointer group"
                  onClick={() => handlePlaySong(song)}
                >
                  <span className="text-gray-400 w-4 text-right group-hover:hidden">
                    {index + 1}
                  </span>
                  <Play className="h-4 w-4 text-white hidden group-hover:block" />
                  <img
                    src={song.albumArtUrl}
                    alt={song.title}
                    className="w-10 h-10 rounded"
                  />
                  <div className="flex-1">
                    <p className="text-white font-medium">{song.title}</p>
                    <p className="text-gray-400 text-sm">{song.artist}</p>
                  </div>
                  <div className="text-gray-400 text-sm">3:45</div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default ArtistProfilePage;
