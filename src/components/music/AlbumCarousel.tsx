
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import AlbumCard, { Album } from './AlbumCard';

interface AlbumCarouselProps {
  albums: Album[];
}

const AlbumCarousel: React.FC<AlbumCarouselProps> = ({ albums }) => {
  if (!albums || albums.length === 0) {
    return <p className="text-gray-400">Nenhum álbum encontrado.</p>;
  }

  return (
    <Carousel
      opts={{
        align: "start",
        loop: false, // Loop can be true if desired
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-4">
        {albums.map((album) => (
          <CarouselItem key={album.id} className="pl-4 basis-auto">
            <AlbumCard album={album} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-2 bg-lira-dark-card/80 hover:bg-lira-dark-card border-lira-blue text-lira-blue hover:text-white disabled:bg-lira-dark-card/50" />
      <CarouselNext className="mr-2 bg-lira-dark-card/80 hover:bg-lira-dark-card border-lira-blue text-lira-blue hover:text-white disabled:bg-lira-dark-card/50" />
    </Carousel>
  );
};

export default AlbumCarousel;
