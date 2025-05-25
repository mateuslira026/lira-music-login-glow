
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Music, Search, Library, User } from 'lucide-react'; // Using 'Home' icon as 'Music' for main screen
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/home', label: 'Início', icon: Music },
  { path: '/search', label: 'Buscar', icon: Search }, // Placeholder path
  { path: '/library', label: 'Biblioteca', icon: Library }, // Placeholder path
  { path: '/profile', label: 'Perfil', icon: User }, // Placeholder path
];

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-lira-dark-card shadow-lg-top z-50 border-t border-gray-700/50">
      <div className="container mx-auto flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-md transition-colors duration-200",
                isActive ? "text-lira-blue" : "text-gray-400 hover:text-white"
              )}
            >
              <item.icon className="h-6 w-6 mb-1" strokeWidth={isActive ? 2.5 : 2} />
              <span className={cn("text-xs font-medium", isActive ? "font-semibold" : "")}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
