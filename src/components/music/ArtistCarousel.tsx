
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ArtistCard, { Artist } from './ArtistCard';

interface ArtistCarouselProps {
  artists: Artist[];
}

const ArtistCarousel: React.FC<ArtistCarouselProps> = ({ artists }) => {
  if (!artists || artists.length === 0) {
    return <p className="text-gray-400">Nenhum artista encontrado.</p>;
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
        {artists.map((artist) => (
          <CarouselItem key={artist.id} className="pl-2 md:pl-4 basis-[140px] md:basis-[180px]">
            <ArtistCard artist={artist} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-1 h-7 w-7 bg-lira-dark-card/80 hover:bg-lira-dark-card border-lira-blue text-lira-blue hover:text-white disabled:bg-lira-dark-card/50" />
      <CarouselNext className="mr-1 h-7 w-7 bg-lira-dark-card/80 hover:bg-lira-dark-card border-lira-blue text-lira-blue hover:text-white disabled:bg-lira-dark-card/50" />
    </Carousel>
  );
};

export default ArtistCarousel;
