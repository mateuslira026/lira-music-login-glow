
import React from 'react';
import AppHeader from '@/components/layout/AppHeader';
import MiniPlayer from '@/components/music/MiniPlayer';
import BottomNav from '@/components/layout/BottomNav';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Settings, LogOut } from 'lucide-react';

const ProfilePage = () => {
  return (
    <div className="flex flex-col min-h-screen h-full bg-gradient-to-b from-lira-dark-page to-black text-white">
      <AppHeader />
      
      <ScrollArea className="flex-1 overflow-y-auto pb-36">
        <div className="p-4 pt-6 flex flex-col items-center">
          <Avatar className="w-24 h-24 mb-4">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-bold text-white mb-1">Usuário Lira</h2>
          <p className="text-gray-400 mb-6">usuario@liramail.com</p>

          <div className="w-full max-w-md space-y-3">
            <Button variant="outline" className="w-full justify-start bg-lira-dark-card border-gray-700 hover:bg-gray-700/70">
              <Settings className="mr-2 h-5 w-5 text-lira-blue" />
              Configurações da Conta
            </Button>
            <Button variant="outline" className="w-full justify-start bg-lira-dark-card border-gray-700 hover:bg-gray-700/70 text-red-500 hover:text-red-400">
              <LogOut className="mr-2 h-5 w-5" />
              Sair
            </Button>
          </div>
          {/* TODO: Implementar funcionalidade do perfil */}
        </div>
      </ScrollArea>
      
      <MiniPlayer />
      <BottomNav />
    </div>
  );
};

export default ProfilePage;
