
import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AppHeader = () => {
  const navigate = useNavigate();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 5) return "Boa madrugada";
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  };

  const userName = "Usuário"; 

  return (
    <header className="bg-lira-dark-card p-3 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/7439f52f-034e-4da5-bb4a-51903f87c328.png" 
            alt="Lira Music Logo" 
            className="h-12 w-12 mr-3 object-contain"
            style={{ 
              filter: 'brightness(1.2) contrast(1.2)',
              mixBlendMode: 'screen'
            }}
          />
          <h1 className="text-xl font-semibold text-white truncate" title={`${getGreeting()}, ${userName}!`}>
            {`${getGreeting()}, ${userName}!`}
          </h1>
        </div>
        
        <div 
          onClick={() => navigate('/profile')} 
          className="cursor-pointer p-1 rounded-full hover:bg-lira-dark-page/50 transition-colors"
          title="Ver perfil"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="Foto do usuário" />
            <AvatarFallback>{userName.substring(0,1).toUpperCase() || 'U'}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
