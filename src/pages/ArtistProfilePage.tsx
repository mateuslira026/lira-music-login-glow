
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Pause, Shuffle, Heart, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePlayer } from '@/contexts/PlayerContext';
import { Artist } from '@/components/music/ArtistCard';

const ArtistProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setCurrentSong, currentSong, isPlaying, togglePlay } = usePlayer();
  const artist = location.state?.artist as Artist;

  if (!artist) {
    return (
      <div className="min-h-screen bg-lira-dark-page flex items-center justify-center pt-16">
        <p className="text-white">Artista não encontrado</p>
      </div>
    );
  }

  const handlePlaySong = (song: any) => {
    setCurrentSong(song);
  };

  const handleMainPlayButton = () => {
    const popularSongs = artist.songs || [];
    if (popularSongs.length > 0) {
      // Se não há música tocando ou a música atual não é do artista, toca a primeira
      if (!currentSong || !popularSongs.find(song => song.id === currentSong.id)) {
        handlePlaySong(popularSongs[0]);
      } else {
        // Se já está tocando música do artista, apenas pausa/despausa
        togglePlay();
      }
    }
  };

  const popularSongs = artist.songs || [];
  const isCurrentArtistPlaying = currentSong && popularSongs.find(song => song.id === currentSong.id) && isPlaying;

  return (
    <div className="min-h-screen bg-lira-dark-page text-white">
      <div className="relative">
        {/* Header com botão de voltar */}
        <div className="absolute top-4 left-4 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full bg-black/50 hover:bg-black/70 text-white"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </div>

        {/* Seção do perfil do artista */}
        <div className="relative h-80 bg-lira-dark-page">
          <div className="absolute inset-0">
            <img
              src={artist.profileImageUrl}
              alt={artist.name}
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-lira-dark-page" />
          </div>
          
          <div className="relative flex flex-col justify-end h-full p-6">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={artist.profileImageUrl}
                alt={artist.name}
                className="w-20 h-20 rounded-full border-2 border-white shadow-lg"
              />
              <div>
                <h1 className="text-3xl font-bold mb-1">{artist.name}</h1>
                <p className="text-gray-300 text-sm">
                  {(popularSongs.length * 1000000).toLocaleString()} ouvintes mensais
                </p>
              </div>
            </div>
            
            {/* Botões de ação */}
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="text-gray-300 border-gray-600 hover:bg-gray-700 hover:text-white bg-transparent">
                Seguir
              </Button>
              <Button variant="ghost" size="icon" className="text-white">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white">
                <Shuffle className="h-5 w-5" />
              </Button>
              <Button
                className="w-12 h-12 rounded-full bg-lira-blue hover:bg-lira-blue/80"
                onClick={handleMainPlayButton}
              >
                {isCurrentArtistPlaying ? (
                  <Pause className="h-6 w-6 fill-white" />
                ) : (
                  <Play className="h-6 w-6 fill-white" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Seção de conteúdo */}
        <div className="px-6 py-6">
          {/* Promoção de novo álbum */}
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-800 to-purple-800 rounded-lg flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={artist.profileImageUrl}
                alt="Novo álbum"
                className="w-12 h-12 rounded"
              />
              <div>
                <p className="text-white font-medium">Ouça o novo álbum</p>
                <p className="text-gray-300 text-sm">{artist.name}</p>
              </div>
            </div>
            <ArrowLeft className="h-5 w-5 text-white rotate-180" />
          </div>

          {/* Abas */}
          <Tabs defaultValue="musicas" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-transparent h-auto p-0 mb-6">
              <TabsTrigger 
                value="musicas" 
                className="text-white font-medium pb-2 border-b-2 border-transparent data-[state=active]:border-green-500 data-[state=active]:bg-transparent bg-transparent"
              >
                Músicas
              </TabsTrigger>
              <TabsTrigger 
                value="clipes" 
                className="text-gray-400 font-medium pb-2 border-b-2 border-transparent data-[state=active]:border-green-500 data-[state=active]:text-white data-[state=active]:bg-transparent bg-transparent"
              >
                Clipes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="musicas" className="space-y-8">
              {/* Seção Popular */}
              <div>
                <h2 className="text-xl font-bold text-white mb-4">Popular</h2>
                <div className="space-y-3">
                  {popularSongs.slice(0, 5).map((song, index) => (
                    <div
                      key={song.id}
                      className="flex items-center space-x-4 p-2 rounded-lg hover:bg-white/10 cursor-pointer group"
                      onClick={() => handlePlaySong(song)}
                    >
                      <span className="text-gray-400 w-6 text-center text-sm group-hover:hidden">
                        {index + 1}
                      </span>
                      <Play className="h-4 w-4 text-white hidden group-hover:block" />
                      <img
                        src={song.albumArtUrl}
                        alt={song.title}
                        className="w-12 h-12 rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium truncate">{song.title}</p>
                        <p className="text-gray-400 text-sm truncate">
                          {(Math.floor(Math.random() * 50) + 10).toLocaleString()}.{Math.floor(Math.random() * 999).toString().padStart(3, '0')}.{Math.floor(Math.random() * 999).toString().padStart(3, '0')}
                        </p>
                      </div>
                      <div className="text-gray-400 text-sm">
                        {Math.floor(Math.random() * 3) + 2}:{Math.floor(Math.random() * 60).toString().padStart(2, '0')}
                      </div>
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                
                {/* Botão Mostrar mais */}
                <div className="flex justify-center mt-6">
                  <Button variant="outline" className="text-gray-300 border-gray-600 hover:bg-gray-700 hover:text-white bg-transparent">
                    Mostrar mais
                  </Button>
                </div>
              </div>

              {/* Escolha do artista */}
              <div>
                <h2 className="text-xl font-bold text-white mb-4">Escolha do artista</h2>
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                  <img
                    src={artist.profileImageUrl}
                    alt="Álbum destaque"
                    className="w-16 h-16 rounded"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-xs bg-white text-black px-2 py-1 rounded-full font-medium">🔥</span>
                      <span className="text-white text-sm">Ouça nosso novo álbum ao vivo 🔥</span>
                    </div>
                    <p className="text-white font-bold">Rahamim (Ao Vivo)</p>
                    <p className="text-gray-300 text-sm">Álbum • Lançamento</p>
                  </div>
                </div>
              </div>

              {/* Lançamentos populares */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white">Lançamentos populares</h2>
                  <Button variant="ghost" className="text-gray-400 hover:text-white text-sm">
                    Mostrar tudo
                  </Button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={artist.profileImageUrl}
                      alt="Álbum"
                      className="w-16 h-16 rounded"
                    />
                    <div>
                      <p className="text-white font-medium">Rahamim (Ao Vivo)</p>
                      <p className="text-gray-400 text-sm">Último lançamento • Álbum</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <img
                      src={artist.profileImageUrl}
                      alt="Álbum"
                      className="w-16 h-16 rounded"
                    />
                    <div>
                      <p className="text-white font-medium">Esdras (Live)</p>
                      <p className="text-gray-400 text-sm">2017 • Álbum</p>
                    </div>
                  </div>
                </div>
                
                {/* Botão Ver discografia */}
                <div className="flex justify-center mt-6">
                  <Button variant="outline" className="text-gray-300 border-gray-600 hover:bg-gray-700 hover:text-white bg-transparent">
                    Ver discografia
                  </Button>
                </div>
              </div>

              {/* Com [Artista] */}
              <div>
                <h2 className="text-xl font-bold text-white mb-4">Com {artist.name}</h2>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="aspect-square bg-gradient-to-br from-orange-500 to-yellow-600 rounded-lg mb-2 flex items-center justify-center">
                      <span className="text-black font-bold text-lg">THIS IS</span>
                    </div>
                    <p className="text-white text-sm font-medium">This Is {artist.name}</p>
                  </div>
                  <div className="text-center">
                    <div className="aspect-square bg-gradient-to-br from-green-400 to-blue-500 rounded-lg mb-2 flex items-center justify-center">
                      <span className="text-black font-bold text-sm">RÁDIO</span>
                    </div>
                    <p className="text-white text-sm font-medium">Rádio de {artist.name}</p>
                  </div>
                  <div className="text-center">
                    <div className="aspect-square bg-gradient-to-br from-yellow-400 to-green-500 rounded-lg mb-2">
                      <img
                        src={artist.profileImageUrl}
                        alt="Gospel"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <p className="text-white text-sm font-medium">Sucessos Gospel</p>
                  </div>
                </div>
              </div>

              {/* Playlists do artista */}
              <div>
                <h2 className="text-xl font-bold text-white mb-4">Playlists do artista</h2>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="aspect-square bg-gradient-to-br from-orange-500 to-yellow-600 rounded-lg mb-2 flex items-center justify-center">
                      <span className="text-black font-bold text-lg">THIS IS</span>
                    </div>
                    <p className="text-white text-sm font-medium">This Is {artist.name}</p>
                  </div>
                  <div className="text-center">
                    <div className="aspect-square bg-gradient-to-br from-red-500 to-green-400 rounded-lg mb-2">
                      <img
                        src={artist.profileImageUrl}
                        alt="Melhores"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <p className="text-white text-sm font-medium">Isso É {artist.name}, Mano! | As Melhores</p>
                  </div>
                  <div className="text-center">
                    <div className="aspect-square bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg mb-2">
                      <img
                        src={artist.profileImageUrl}
                        alt="Adoração"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <p className="text-white text-sm font-medium">ADORAÇÃO NA NOSSA CASA</p>
                  </div>
                </div>
              </div>

              {/* Os fãs também curtem */}
              <div>
                <h2 className="text-xl font-bold text-white mb-4">Os fãs também curtem</h2>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="aspect-square rounded-full bg-gray-700 mb-2">
                      <img
                        src="/lovable-uploads/fcd79cd8-e42e-4a86-afc3-9995b932f687.png"
                        alt="Frei Gilson"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <p className="text-white text-sm font-medium">Frei Gilson</p>
                  </div>
                  <div className="text-center">
                    <div className="aspect-square rounded-full bg-gradient-to-br from-blue-600 to-yellow-500 mb-2 flex items-center justify-center">
                      <span className="text-white font-bold text-2xl">✝</span>
                    </div>
                    <p className="text-white text-sm font-medium">Fraternidade São João Paulo II</p>
                  </div>
                  <div className="text-center">
                    <div className="aspect-square rounded-full bg-gray-700 mb-2">
                      <img
                        src="/lovable-uploads/ba367f49-9e5a-462e-918a-12285af2db03.png"
                        alt="Thiago Brado"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <p className="text-white text-sm font-medium">Thiago Brado</p>
                  </div>
                </div>
              </div>

              {/* Sobre */}
              <div>
                <h2 className="text-xl font-bold text-white mb-4">Sobre</h2>
                <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-blue-400">✓</span>
                    <span className="text-white text-sm">Artista verificado</span>
                  </div>
                  <img
                    src={artist.profileImageUrl}
                    alt="Grupo"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="clipes" className="space-y-8">
              {/* Clipes de [Artista] */}
              <div>
                <h2 className="text-xl font-bold text-white mb-4">Clipes de {artist.name}</h2>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="aspect-video bg-gray-800 rounded-lg"></div>
                  <div className="aspect-video bg-gray-800 rounded-lg"></div>
                  <div className="aspect-video bg-gray-800 rounded-lg"></div>
                  <div className="aspect-video bg-gray-800 rounded-lg"></div>
                </div>
              </div>

              {/* Music Videos */}
              <div>
                <h2 className="text-xl font-bold text-white mb-4">Music Videos</h2>
                <div className="space-y-4">
                  <div className="relative">
                    <div className="aspect-video bg-gradient-to-br from-yellow-600 to-orange-700 rounded-lg flex items-center justify-center">
                      <Play className="h-16 w-16 text-white fill-white" />
                    </div>
                    <div className="mt-3">
                      <h3 className="text-white font-medium">Sou em Ti, És em Mim (Tú En Mi, Yo En Ti)</h3>
                      <p className="text-gray-400 text-sm">Aline Brasil, {artist.name}, Mayara Marques, Vinni Mattos</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ArtistProfilePage;
