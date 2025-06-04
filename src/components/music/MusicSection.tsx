
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

  return (
    <section className="mb-6 px-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-white">{title}</h2>
        <button 
          onClick={handleSeeMore}
          className="text-xs text-lira-blue hover:underline"
        >
          Ver mais
        </button>
      </div>
      {artists ? <ArtistCarousel artists={artists} /> : <AlbumCarousel albums={albums || []} />}
    </section>
  );
};

export default MusicSection;
