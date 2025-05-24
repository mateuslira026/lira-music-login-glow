
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Music2, User, Mail, Lock } from 'lucide-react';

const registerSchema = z.object({
  fullName: z.string().min(3, { message: "O nome completo deve ter pelo menos 3 caracteres." }),
  email: z.string().email({ message: "Por favor, insira um email válido." }),
  password: z.string().min(8, { message: "A senha deve ter pelo menos 8 caracteres." }),
  confirmPassword: z.string().min(8, { message: "A confirmação da senha deve ter pelo menos 8 caracteres." })
}).refine(data => data.password === data.confirmPassword, {
  message: "As senhas não coincidem.",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const navigate = useNavigate();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit = (data: RegisterFormValues) => {
    console.log('Dados de registro:', data);
    // Aqui iria a lógica de registro real.
    // Por enquanto, simulamos um registro bem-sucedido.
    alert('Registro (simulado) bem-sucedido! Você será redirecionado para o login.');
    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-lira-dark-page flex flex-col items-center justify-center p-4 selection:bg-lira-blue/30 selection:text-white font-inter">
      <div className="relative w-full max-w-md bg-lira-dark-card p-8 rounded-xl shadow-2xl space-y-6 animate-fade-in">
        <div className="text-center">
          <Music2 className="mx-auto h-16 w-16 text-lira-blue mb-3" />
          <p className="text-lira-blue font-medium">Crie sua conta na Lira Music</p>
          <h1 className="text-3xl font-bold text-white mt-1">Registrar</h1>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Nome Completo</FormLabel>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                    <FormControl>
                      <Input
                        placeholder="Seu nome completo"
                        {...field}
                        className="pl-10 bg-gray-800 border-gray-700 text-white focus:ring-lira-blue focus:border-lira-blue rounded-md placeholder:text-gray-500"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Email</FormLabel>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="seuemail@exemplo.com"
                        {...field}
                        className="pl-10 bg-gray-800 border-gray-700 text-white focus:ring-lira-blue focus:border-lira-blue rounded-md placeholder:text-gray-500"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Senha</FormLabel>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                        className="pl-10 bg-gray-800 border-gray-700 text-white focus:ring-lira-blue focus:border-lira-blue rounded-md placeholder:text-gray-500"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Confirmar Senha</FormLabel>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                        className="pl-10 bg-gray-800 border-gray-700 text-white focus:ring-lira-blue focus:border-lira-blue rounded-md placeholder:text-gray-500"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full bg-lira-blue text-lira-blue-foreground hover:bg-lira-blue/85 active:scale-[0.98] transition-all duration-150 py-3 text-base font-semibold rounded-md"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Registrando...' : 'Criar Conta e Curtir a Música'}
            </Button>
          </form>
        </Form>
        
        <p className="text-center text-sm text-gray-400">
          Já tem uma conta?{' '}
          <Link to="/login" className="font-medium text-lira-blue hover:underline">
            Faça Login
          </Link>
        </p>
      </div>
      <footer className="text-center text-xs text-gray-600 mt-8">
        © {new Date().getFullYear()} Lira Music. Todos os direitos reservados.
      </footer>
    </div>
  );
};

export default RegisterPage;

