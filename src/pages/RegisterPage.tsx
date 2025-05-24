
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Music2 } from "lucide-react";

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-lira-dark-page flex flex-col items-center justify-center p-4 font-inter text-white">
      <div className="w-full max-w-md bg-lira-dark-card p-8 rounded-xl shadow-2xl text-center">
        <Music2 className="mx-auto h-16 w-16 text-lira-blue mb-4" />
        <h1 className="text-3xl font-bold mb-2 text-white">Registrar</h1>
        <p className="text-gray-400 mb-6">Página de registro em construção.</p>
        <Button asChild className="w-full bg-lira-blue hover:bg-opacity-80 text-lira-blue-foreground">
          <Link to="/login">Voltar para Login</Link>
        </Button>
      </div>
    </div>
  );
};

export default RegisterPage;
