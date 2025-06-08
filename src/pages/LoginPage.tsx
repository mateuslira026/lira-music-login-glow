import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, Music2, Chrome, Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen w-full bg-lira-dark-page flex flex-col items-center justify-center p-4 selection:bg-lira-blue/30 selection:text-white relative">
      <div className="relative w-full max-w-md bg-lira-dark-card p-8 rounded-xl shadow-2xl space-y-6 animate-fade-in">
        <div className="text-center">
          <Music2 className="mx-auto h-16 w-16 text-lira-blue mb-3" />
          <p className="text-lira-blue font-medium">Bem-vindo à Lira Music</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1">Entre na sua conta</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-gray-300 text-sm">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="seuemail@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-9 bg-gray-800 border-gray-700 text-white focus:ring-lira-blue focus:border-lira-blue rounded-md placeholder:text-gray-500 h-9 py-1.5 text-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-gray-300 text-sm">Senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="px-9 bg-gray-800 border-gray-700 text-white focus:ring-lira-blue focus:border-lira-blue rounded-md placeholder:text-gray-500 h-9 py-1.5 text-sm"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <div className="text-right">
              <Link to="/forgot-password" className="text-sm text-lira-blue hover:underline">Esqueceu a senha?</Link>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-lira-blue text-lira-blue-foreground hover:bg-opacity-85 active:scale-[0.98] transition-all duration-150 py-2 text-sm font-semibold rounded-md"
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
          className="w-full bg-white text-gray-700 hover:bg-gray-100 border-gray-300 active:scale-[0.98] transition-all duration-150 py-2 text-sm font-semibold rounded-md shadow-sm hover:shadow-md flex items-center justify-center"
        >
          <Chrome className="h-4 w-4 mr-2" />
          <span>Entrar com o Google</span>
        </Button>

        <p className="text-center text-sm text-gray-400">
          Não tem uma conta?{' '}
          <Link to="/register" className="font-medium text-lira-blue hover:underline">
            Registre-se
          </Link>
        </p>
      </div>
      <footer className="absolute bottom-8 text-center text-xs text-gray-600">
        © {new Date().getFullYear()} Lira Music. Todos os direitos reservados.
      </footer>
    </div>
  );
};

export default LoginPage;
