
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Music2, ArrowLeft } from 'lucide-react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Solicitação de redefinição de senha para:', email);
    // Futuramente, aqui irá a lógica real de envio de email para redefinição de senha
    alert('Se o email estiver cadastrado, um link para redefinição de senha será enviado.');
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full bg-lira-dark-page flex flex-col items-center justify-center p-4 selection:bg-lira-blue/30 selection:text-white relative">
      <div className="relative w-full max-w-md bg-lira-dark-card p-8 rounded-xl shadow-2xl space-y-6 animate-fade-in">
        <Link to="/login" className="absolute top-4 left-4 text-lira-blue hover:text-opacity-80 transition-opacity">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <div className="text-center">
          <Music2 className="mx-auto h-12 w-12 text-lira-blue mb-3" />
          <h1 className="text-2xl font-bold text-white mt-1">Recuperar Senha</h1>
          <p className="text-gray-400 mt-2 text-sm">
            Insira seu email para enviarmos um link de recuperação.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-300">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="seuemail@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 bg-gray-800 border-gray-700 text-white focus:ring-lira-blue focus:border-lira-blue rounded-md placeholder:text-gray-500 h-9 py-1.5 text-sm"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-lira-blue text-lira-blue-foreground hover:bg-opacity-85 active:scale-[0.98] transition-all duration-150 py-2 text-sm font-semibold rounded-md"
          >
            Enviar Link de Recuperação
          </Button>
        </form>

        <p className="text-center text-sm text-gray-400">
          Lembrou sua senha?{' '}
          <Link to="/login" className="font-medium text-lira-blue hover:underline">
            Fazer Login
          </Link>
        </p>
      </div>
      
      <footer className="absolute bottom-8 text-center text-xs text-gray-600">
        © {new Date().getFullYear()} Lira Music. Todos os direitos reservados.
      </footer>
    </div>
  );
};

export default ForgotPasswordPage;
