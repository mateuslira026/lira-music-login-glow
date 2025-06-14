import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { PlayerProvider } from "./contexts/PlayerContext";
import { useState, useEffect } from "react";

// Component Imports
import MiniPlayer from "@/components/music/MiniPlayer";
import BottomNav from "@/components/layout/BottomNav";
import SplashScreen from "@/components/SplashScreen";

// Page Imports
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import LibraryPage from "./pages/LibraryPage";
import ProfilePage from "./pages/ProfilePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import PlayerPage from "./pages/PlayerPage";
import AlbumDetailPage from "./pages/AlbumDetailPage";
import CategoryDetailPage from "./pages/CategoryDetailPage";
import LikedSongsPage from "./pages/LikedSongsPage";
import ArtistProfilePage from "./pages/ArtistProfilePage";
import SpotifyCallbackPage from "./pages/SpotifyCallbackPage";
import NotFound from "./pages/NotFound";
import "./App.css";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const [showSplash, setShowSplash] = useState(true);
  
  // Mostrar splash imediatamente ao carregar
  useEffect(() => {
    if (location.pathname === '/') {
      setShowSplash(true);
    } else {
      setShowSplash(false);
    }
  }, [location.pathname]);
  
  // Define routes where BottomNav should appear
  const showBottomNav = ['/home', '/search', '/library', '/profile', '/player', '/album', '/category', '/liked-songs', '/artist'].some(
    route => location.pathname.startsWith(route)
  );

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash && location.pathname === '/') {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="flex flex-col h-screen bg-black">
      <div className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/callback" element={<SpotifyCallbackPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} /> 
          <Route path="/library" element={<LibraryPage />} /> 
          <Route path="/profile" element={<ProfilePage />} /> 
          <Route path="/player" element={<PlayerPage />} />
          <Route path="/album/:albumId" element={<AlbumDetailPage />} />
          <Route path="/category/:categoryTitle" element={<CategoryDetailPage />} /> 
          <Route path="/liked-songs" element={<LikedSongsPage />} />
          <Route path="/artist/:artistId" element={<ArtistProfilePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {showBottomNav && <MiniPlayer />}
      {showBottomNav && <BottomNav />}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PlayerProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </PlayerProvider>
  </QueryClientProvider>
);

export default App;
