
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aqui iria a lógica de logout real.
    // Por enquanto, apenas redirecionamos para a página de login.
    console.log('Logout simulado');
    navigate('/login');
  };

  return (
    <div className="min-h-screen w-full bg-lira-dark-page flex flex-col items-center justify-center p-4 selection:bg-lira-blue/30 selection:text-white font-inter">
      <div className="relative w-full max-w-2xl bg-lira-dark-card p-8 rounded-xl shadow-2xl space-y-6 animate-fade-in text-center">
        <h1 className="text-4xl font-bold text-white">Bem-vindo à Lira Music!</h1>
        <p className="text-lg text-gray-300">
          Sua jornada musical começa aqui. Explore, descubra e curta suas músicas favoritas.
        </p>
        <div className="mt-8">
          <Button 
            onClick={handleLogout}
            className="bg-lira-blue text-lira-blue-foreground hover:bg-lira-blue/85 active:scale-[0.98] transition-all duration-150 py-3 px-6 text-base font-semibold rounded-md"
          >
            <LogOut className="mr-2 h-5 w-5" />
            Sair
          </Button>
        </div>
      </div>
      <footer className="text-center text-xs text-gray-600 mt-8">
        © {new Date().getFullYear()} Lira Music. Todos os direitos reservados.
      </footer>
    </div>
  );
};

export default HomePage;
