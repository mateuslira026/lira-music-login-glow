
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Music } from 'lucide-react';
import { useSpotify } from '@/hooks/useSpotify';

const SpotifyLogin = () => {
  const { isAuthenticated, login, logout } = useSpotify();

  if (isAuthenticated) {
    return (
      <Card className="bg-green-600 text-white">
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Music className="h-5 w-5" />
            <span className="font-semibold">Conectado ao Spotify</span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={logout}
            className="text-green-600 border-white hover:bg-white"
          >
            Desconectar
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Music className="h-6 w-6" />
          Conectar ao Spotify
        </CardTitle>
        <CardDescription className="text-green-100">
          Acesse milhões de músicas do Spotify diretamente no app
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={login}
          className="w-full bg-white text-green-600 hover:bg-green-50 font-semibold"
        >
          Conectar com Spotify
        </Button>
        <p className="text-xs text-green-100 mt-2 text-center">
          * Requer conta Spotify Premium para reprodução completa
        </p>
      </CardContent>
    </Card>
  );
};

export default SpotifyLogin;
