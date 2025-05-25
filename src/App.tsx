
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage"; // Adicionar importação da SearchPage
import LibraryPage from "./pages/LibraryPage"; // Adicionar importação da LibraryPage
import ProfilePage from "./pages/ProfilePage"; // Adicionar importação da ProfilePage
import NotFound from "./pages/NotFound";
import "./App.css"; // Import App.css

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} /> {/* Adicionar rota para SearchPage */}
          <Route path="/library" element={<LibraryPage />} /> {/* Adicionar rota para LibraryPage */}
          <Route path="/profile" element={<ProfilePage />} /> {/* Adicionar rota para ProfilePage */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
