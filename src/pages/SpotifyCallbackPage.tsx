
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SpotifyService } from '@/services/spotifyService';
import { Loader2 } from 'lucide-react';

const SpotifyCallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const error = urlParams.get('error');

      if (error) {
        console.error('Spotify auth error:', error);
        navigate('/home');
        return;
      }

      if (code) {
        try {
          await SpotifyService.exchangeCodeForToken(code);
          navigate('/home');
        } catch (error) {
          console.error('Failed to exchange code:', error);
          navigate('/home');
        }
      } else {
        navigate('/home');
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
        <p>Conectando ao Spotify...</p>
      </div>
    </div>
  );
};

export default SpotifyCallbackPage;
