
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Music, Search, Library, User } from 'lucide-react'; 
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/home', label: 'Início', icon: Music },
  { path: '/search', label: 'Buscar', icon: Search },
  { path: '/library', label: 'Biblioteca', icon: Library },
  { path: '/profile', label: 'Perfil', icon: User },
];

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-lira-dark-page/90 backdrop-blur-sm shadow-lg-top z-30 border-t border-white/10">
      <div className="container mx-auto flex justify-around items-center h-12">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center justify-center w-full py-1 touch-manipulation",
                isActive ? "text-lira-blue" : "text-gray-400 hover:text-white"
              )}
            >
              <item.icon className="h-4 w-4 mb-1" strokeWidth={isActive ? 2.5 : 2} />
              <span className={cn("text-xs font-medium", isActive ? "font-semibold" : "")}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
