
import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import AppHeader from '@/components/layout/AppHeader';
import BottomNav from '@/components/layout/BottomNav';
import MiniPlayer from '@/components/music/MiniPlayer';
import AlbumCard, { Album } from '@/components/music/AlbumCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

const CategoryDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams(); // Para obter o título da URL se o estado não estiver disponível

  // Tenta obter dados do estado da rota, senão usa o título dos parâmetros
  const categoryTitle = location.state?.categoryTitle || decodeURIComponent(params.categoryTitle || 'Categoria');
  const albums = location.state?.albums as Album[] || [];

  if (!albums.length && !location.state) {
    // Poderia adicionar uma lógica para buscar álbuns se o estado não estiver presente
    // Por agora, apenas mostra uma mensagem e um botão para voltar
    return (
      <div className="flex flex-col min-h-screen h-full bg-gradient-to-b from-lira-dark-page to-black text-white">
        <AppHeader />
        <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
          <p className="text-xl text-gray-400 mb-4">Não foi possível carregar os álbuns para "{categoryTitle}".</p>
          <Button onClick={() => navigate('/home')} className="bg-lira-blue hover:bg-lira-blue/80">
            Voltar para Home
          </Button>
        </div>
        <MiniPlayer />
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen h-full bg-gradient-to-b from-lira-dark-page to-black text-white">
      <AppHeader />
      <ScrollArea className="flex-1 overflow-y-auto pb-36">
        <div className="p-4">
          <div className="flex items-center mb-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="mr-2 text-white hover:bg-white/10">
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-2xl font-bold">{categoryTitle}</h1>
          </div>
          
          {albums.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {albums.map(album => (
                <AlbumCard key={album.id} album={album} />
              ))}
            </div>
          ) : (
             <p className="text-gray-400">Nenhum álbum encontrado nesta categoria.</p>
          )}
        </div>
      </ScrollArea>
      <MiniPlayer />
      <BottomNav />
    </div>
  );
};

export default CategoryDetailPage;
