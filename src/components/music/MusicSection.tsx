
import React from 'react';
import AlbumCarousel from './AlbumCarousel';
import { Album } from './AlbumCard';

interface MusicSectionProps {
  title: string;
  albums: Album[];
}

const MusicSection: React.FC<MusicSectionProps> = ({ title, albums }) => {
  return (
    <section className="mb-6 px-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <button className="text-xs text-lira-blue">Ver mais</button>
      </div>
      <AlbumCarousel albums={albums} />
    </section>
  );
};

export default MusicSection;
