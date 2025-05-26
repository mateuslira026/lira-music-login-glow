
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, Music2, Chrome } from 'lucide-react'; // Usando Chrome como ícone do Google

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Attempting login with:', { email, password });
    // Futuramente, aqui irá a lógica de autenticação real
    alert('Login (simulado) bem-sucedido! Redirecionando para a página inicial...');
    // Redirecionar para /home após o login
    setTimeout(() => {
      navigate('/home');
    }, 1500);
  };

  const handleGoogleLogin = () => {
    console.log('Attempting Google login...');
    // Futuramente, aqui irá a lógica de login com Google
    alert('Login com Google (simulado)! Redirecionando para a página inicial...');
    // Redirecionar para /home após o login com Google
    setTimeout(() => {
      navigate('/home');
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-lira-dark-page flex flex-col items-center justify-center p-4 selection:bg-lira-blue/30 selection:text-white">
      {/* Você pode adicionar uma imagem de fundo aqui no futuro:
      <img src="/path-to-your-music-background.jpg" alt="Background" className="absolute inset-0 w-full h-full object-cover blur-sm opacity-30" /> 
      */}
      <div className="relative w-full max-w-md bg-lira-dark-card p-8 rounded-xl shadow-2xl space-y-6 animate-fade-in">
        <div className="text-center">
          <Music2 className="mx-auto h-16 w-16 text-lira-blue mb-3" />
          <p className="text-lira-blue font-medium">Bem-vindo à Lira Music</p>
          <h1 className="text-3xl font-bold text-white mt-1">Entre na sua conta</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-4"> {/* Diminuído o space-y aqui também */}
          <div className="space-y-1.5"> {/* Diminuído o space-y */}
            <Label htmlFor="email" className="text-gray-300 text-sm">Email</Label> {/* Texto do label menor */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" /> {/* Ícone menor */}
              <Input
                id="email"
                type="email"
                placeholder="seuemail@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-9 bg-gray-800 border-gray-700 text-white focus:ring-lira-blue focus:border-lira-blue rounded-md placeholder:text-gray-500 h-9 py-1.5 text-sm" /* Tamanho reduzido e padding esquerdo ajustado */
              />
            </div>
          </div>

          <div className="space-y-1.5"> {/* Diminuído o space-y */}
            <Label htmlFor="password" className="text-gray-300 text-sm">Senha</Label> {/* Texto do label menor */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" /> {/* Ícone menor */}
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-9 bg-gray-800 border-gray-700 text-white focus:ring-lira-blue focus:border-lira-blue rounded-md placeholder:text-gray-500 h-9 py-1.5 text-sm" /* Tamanho reduzido e padding esquerdo ajustado */
              />
            </div>
            <div className="text-right">
              <Link to="/forgot-password" className="text-sm text-lira-blue hover:underline">Esqueceu a senha?</Link> {/* Link funcional */}
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-lira-blue text-lira-blue-foreground hover:bg-opacity-85 active:scale-[0.98] transition-all duration-150 py-2 text-sm font-semibold rounded-md" /* Tamanho reduzido */
          >
            Entrar e Curtir a Música
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-700" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-lira-dark-card px-2 text-gray-400">Ou faça login com</span>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={handleGoogleLogin}
          className="w-full bg-white text-gray-700 hover:bg-gray-100 border-gray-300 active:scale-[0.98] transition-all duration-150 py-2 text-sm font-semibold rounded-md shadow-sm hover:shadow-md flex items-center justify-center" /* Tamanho reduzido e flex para alinhar ícone e texto */
        >
          <Chrome className="h-4 w-4 mr-2" /> {/* Ícone do Google (Chrome como substituto) e tamanho ajustado */}
          <span>Entrar com o Google</span>
        </Button>

        <p className="text-center text-sm text-gray-400">
          Não tem uma conta?{' '}
          <Link to="/register" className="font-medium text-lira-blue hover:underline">
            Registre-se
          </Link>
        </p>
      </div>
      <footer className="text-center text-xs text-gray-600 mt-8">
        © {new Date().getFullYear()} Lira Music. Todos os direitos reservados.
      </footer>
    </div>
  );
};

export default LoginPage;
