
import React from 'react';
import FeaturedCard from './FeaturedCard';

const FeaturedSection: React.FC = () => {
  const featuredCards = [
    {
      id: 'today-hits',
      title: "Today's Top Hits",
      subtitle: "Os hits do momento",
      backgroundImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop',
      gradientFrom: 'from-purple-600',
      gradientTo: 'to-blue-600'
    },
    {
      id: 'pop-hits',
      title: 'Pop Hits',
      subtitle: 'Os maiores sucessos pop',
      backgroundImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=200&h=200&fit=crop',
      gradientFrom: 'from-pink-500',
      gradientTo: 'to-orange-500'
    },
    {
      id: 'chill-hits',
      title: 'Chill Hits',
      subtitle: 'Para relaxar',
      backgroundImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop',
      gradientFrom: 'from-green-500',
      gradientTo: 'to-teal-500'
    },
    {
      id: 'rap-hits',
      title: 'RapCaviar',
      subtitle: 'O melhor do rap',
      backgroundImage: 'https://images.unsplash.com/photo-1571974599782-87663a5d9c44?w=200&h=200&fit=crop',
      gradientFrom: 'from-red-600',
      gradientTo: 'to-yellow-500'
    },
    {
      id: 'feel-good',
      title: 'Feel Good Pop',
      subtitle: 'Música para se sentir bem',
      backgroundImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=200&h=200&fit=crop',
      gradientFrom: 'from-indigo-500',
      gradientTo: 'to-purple-600'
    },
    {
      id: 'throwback',
      title: 'Throwback Hits',
      subtitle: 'Clássicos atemporais',
      backgroundImage: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=200&h=200&fit=crop',
      gradientFrom: 'from-amber-500',
      gradientTo: 'to-red-500'
    }
  ];

  return (
    <section className="mb-6 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {featuredCards.map((card) => (
          <FeaturedCard key={card.id} {...card} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedSection;
