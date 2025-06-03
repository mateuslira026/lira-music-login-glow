
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Play } from 'lucide-react';
import { Song as PlayerSong } from '@/contexts/PlayerContext';

export interface Artist {
  id: string;
  name: string;
  profileImageUrl: string;
  songs?: PlayerSong[];
}

interface ArtistCardProps {
  artist: Artist;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/album/${artist.id}`);
  };

  return (
    <Card 
      className="w-full bg-lira-dark-card border-transparent rounded-lg overflow-hidden shadow-lg hover:shadow-lira-blue/30 transition-shadow duration-300 group cursor-pointer"
      onClick={handleCardClick}
    >
      <CardContent className="p-0 relative">
        <div className="w-full aspect-square bg-gradient-to-br from-lira-blue/20 to-purple-600/20 flex items-center justify-center relative overflow-hidden">
          <img 
            src={artist.profileImageUrl} 
            alt={artist.name} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-full p-4" 
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Play className="h-10 w-10 text-white fill-white" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-2 flex flex-col items-center">
        <CardTitle className="text-xs font-semibold text-white truncate w-full text-center" title={artist.name}>{artist.name}</CardTitle>
        <p className="text-xs text-gray-400 truncate w-full text-center">Artista</p>
      </CardFooter>
    </Card>
  );
};

export default ArtistCard;
