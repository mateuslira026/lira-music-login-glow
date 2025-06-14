
import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AppHeader = () => {
  const navigate = useNavigate();

  const userName = "Usuário"; 

  return (
    <header className="bg-black p-1 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex items-center justify-end">
        <div 
          onClick={() => navigate('/profile')} 
          className="cursor-pointer p-1 rounded-full hover:bg-lira-dark-page/50 transition-colors"
          title="Ver perfil"
        >
          <Avatar className="h-7 w-7">
            <AvatarImage src="https://github.com/shadcn.png" alt="Foto do usuário" />
            <AvatarFallback>{userName.substring(0,1).toUpperCase() || 'U'}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;

