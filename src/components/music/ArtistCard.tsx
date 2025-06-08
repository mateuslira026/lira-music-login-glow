
import React from 'react';
import { useNavigate } from 'react-router-dom';
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
    navigate(`/artist/${artist.id}`, { state: { artist } });
  };

  return (
    <div 
      className="w-full flex flex-col items-center cursor-pointer group"
      onClick={handleCardClick}
    >
      <div className="w-full aspect-square relative overflow-hidden rounded-full bg-gradient-to-br from-lira-blue/20 to-purple-600/20">
        <img 
          src={artist.profileImageUrl} 
          alt={artist.name} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full">
          <Play className="h-8 w-8 text-white fill-white" />
        </div>
      </div>
      <div className="mt-2 text-center">
        <p className="text-xs font-semibold text-white truncate w-full" title={artist.name}>{artist.name}</p>
        <p className="text-xs text-gray-400 truncate w-full">Artista</p>
      </div>
    </div>
  );
};

export default ArtistCard;
