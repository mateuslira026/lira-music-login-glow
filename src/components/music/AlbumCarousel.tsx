
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
        loop: true,
        dragFree: true,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {albums.map((album) => (
          <CarouselItem key={album.id} className="pl-2 md:pl-4 basis-[140px] md:basis-[180px]">
            <AlbumCard album={album} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-1 h-7 w-7 bg-lira-dark-card/80 hover:bg-lira-dark-card border-lira-blue text-lira-blue hover:text-white disabled:bg-lira-dark-card/50" />
      <CarouselNext className="mr-1 h-7 w-7 bg-lira-dark-card/80 hover:bg-lira-dark-card border-lira-blue text-lira-blue hover:text-white disabled:bg-lira-dark-card/50" />
    </Carousel>
  );
};

export default AlbumCarousel;
