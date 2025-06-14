
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AlbumCarousel from './AlbumCarousel';
import ArtistCarousel from './ArtistCarousel';
import { Album } from './AlbumCard';
import { Artist } from './ArtistCard';

interface MusicSectionProps {
  title: string;
  albums?: Album[];
  artists?: Artist[];
}

const MusicSection: React.FC<MusicSectionProps> = ({ title, albums, artists }) => {
  const navigate = useNavigate();

  const handleSeeMore = () => {
    const encodedTitle = encodeURIComponent(title);
    const dataToPass = albums || artists;
    navigate(`/category/${encodedTitle}`, { state: { albums: dataToPass, categoryTitle: title } });
  };

  console.log('MusicSection - Rendering title:', title);
  console.log('MusicSection - Albums:', albums?.length || 0);
  console.log('MusicSection - Artists:', artists?.length || 0);

  return (
    <section className="mb-8 px-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white block">{title}</h2>
        <button 
          onClick={handleSeeMore}
          className="text-xs text-lira-blue hover:underline font-medium flex-shrink-0"
        >
          Ver mais
        </button>
      </div>
      <div className="w-full">
        {artists ? <ArtistCarousel artists={artists} /> : <AlbumCarousel albums={albums || []} />}
      </div>
    </section>
  );
};

export default MusicSection;
