
import React from 'react';
import { Music2 } from 'lucide-react';
// useNavigate não é mais necessário aqui se o botão de busca for removido e não houver outras navegações
// import { useNavigate } from 'react-router-dom'; 

const AppHeader = () => {
  // const navigate = useNavigate(); // Não é mais usado

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 5) return "Boa madrugada"; // Adicionando madrugada
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  };

  // Placeholder para o nome do usuário
  // Em uma aplicação real, isso viria de um contexto de autenticação ou estado global
  const userName = "Usuário"; 

  return (
    <header className="bg-lira-dark-card p-3 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Music2 className="h-7 w-7 text-lira-blue mr-2" />
          <h1 className="text-xl font-semibold text-white truncate" title={`${getGreeting()}, ${userName}!`}>
            {`${getGreeting()}, ${userName}!`}
          </h1>
        </div>
        {/* Botão de busca removido conforme solicitado */}
        {/* 
        <button 
          onClick={() => navigate('/search')}
          className="p-2 rounded-full hover:bg-lira-dark-page/50"
        >
          <Search className="h-5 w-5 text-white" />
        </button> 
        */}
      </div>
    </header>
  );
};

export default AppHeader;
