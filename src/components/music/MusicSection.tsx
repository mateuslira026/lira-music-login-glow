
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AlbumCarousel from './AlbumCarousel';
import { Album } from './AlbumCard';

interface MusicSectionProps {
  title: string;
  albums: Album[]; // Certifique-se que Album pode ser AlbumWithSongs se necessário
}

const MusicSection: React.FC<MusicSectionProps> = ({ title, albums }) => {
  const navigate = useNavigate();

  const handleSeeMore = () => {
    // Codificar o título para usar como parte da URL de forma segura
    const encodedTitle = encodeURIComponent(title);
    navigate(`/category/${encodedTitle}`, { state: { albums, categoryTitle: title } });
  };

  return (
    <section className="mb-6 px-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <button 
          onClick={handleSeeMore}
          className="text-xs text-lira-blue hover:underline"
        >
          Ver mais
        </button>
      </div>
      <AlbumCarousel albums={albums} />
    </section>
  );
};

export default MusicSection;
