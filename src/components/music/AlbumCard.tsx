
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Play } from 'lucide-react';
import { Song as PlayerSong } from '@/contexts/PlayerContext'; // Importar Song

export interface Album {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  songs?: PlayerSong[]; // Adicionar songs opcionalmente, se precisar aqui
}

interface AlbumCardProps {
  album: Album;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/album/${album.id}`);
  };

  return (
    <Card 
      className="w-full bg-lira-dark-card border-transparent rounded-lg overflow-hidden shadow-lg hover:shadow-lira-blue/30 transition-shadow duration-300 group cursor-pointer"
      onClick={handleCardClick} // Adicionar onClick handler
    >
      <CardContent className="p-0 relative">
        <img 
          src={album.coverUrl} 
          alt={album.title} 
          className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Play className="h-10 w-10 text-white fill-white" />
        </div>
      </CardContent>
      <CardFooter className="p-2 flex flex-col items-start">
        <CardTitle className="text-xs font-semibold text-white truncate w-full" title={album.title}>{album.title}</CardTitle>
        <p className="text-xs text-gray-400 truncate w-full" title={album.artist}>{album.artist}</p>
      </CardFooter>
    </Card>
  );
};

export default AlbumCard;
