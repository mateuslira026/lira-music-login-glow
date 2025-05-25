
import React from 'react';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'; // Assuming CardDescription is not needed here based on common album card design.
import { Play } from 'lucide-react';

export interface Album {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
}

interface AlbumCardProps {
  album: Album;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album }) => {
  return (
    <Card className="w-[180px] bg-lira-dark-card border-transparent rounded-lg overflow-hidden shadow-lg hover:shadow-lira-blue/30 transition-shadow duration-300 group cursor-pointer">
      <CardContent className="p-0 relative">
        <img src={album.coverUrl} alt={album.title} className="w-full h-[180px] object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Play className="h-12 w-12 text-white fill-white" />
        </div>
      </CardContent>
      <CardFooter className="p-3 flex flex-col items-start">
        <CardTitle className="text-sm font-semibold text-white truncate w-full" title={album.title}>{album.title}</CardTitle>
        <p className="text-xs text-gray-400 truncate w-full" title={album.artist}>{album.artist}</p>
      </CardFooter>
    </Card>
  );
};

export default AlbumCard;
