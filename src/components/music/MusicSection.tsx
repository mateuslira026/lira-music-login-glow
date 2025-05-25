
import React from 'react';
import AlbumCarousel from './AlbumCarousel';
import { Album } from './AlbumCard'; // Re-export or import Album type

interface MusicSectionProps {
  title: string;
  albums: Album[];
}

const MusicSection: React.FC<MusicSectionProps> = ({ title, albums }) => {
  return (
    <section className="mb-8 px-4">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      <AlbumCarousel albums={albums} />
    </section>
  );
};

export default MusicSection;
