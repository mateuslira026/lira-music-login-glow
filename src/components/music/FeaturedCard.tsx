
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';

interface FeaturedCardProps {
  id: string;
  title: string;
  subtitle: string;
  backgroundImage: string;
  gradientFrom: string;
  gradientTo: string;
}

const FeaturedCard: React.FC<FeaturedCardProps> = ({ 
  id, 
  title, 
  subtitle, 
  backgroundImage, 
  gradientFrom, 
  gradientTo 
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/album/${id}`);
  };

  return (
    <div 
      className="relative h-24 rounded-lg overflow-hidden cursor-pointer group transition-transform duration-300 hover:scale-105"
      onClick={handleClick}
    >
      <div 
        className={`absolute inset-0 bg-gradient-to-r ${gradientFrom} ${gradientTo}`}
      >
        <div className="absolute right-0 top-0 w-16 h-full opacity-30">
          <img 
            src={backgroundImage} 
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      <div className="relative z-10 p-4 h-full flex items-center justify-between">
        <div>
          <h3 className="text-white font-bold text-sm">{title}</h3>
          <p className="text-white/80 text-xs mt-1">{subtitle}</p>
        </div>
        
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-8 h-8 bg-lira-blue rounded-full flex items-center justify-center">
            <Play className="w-4 h-4 text-white fill-white ml-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCard;
