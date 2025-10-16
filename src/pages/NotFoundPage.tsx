// NotFoundPageHero.tsx
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFoundPageHero() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-50 px-6">
      <div className="text-center max-w-2xl">
        <X className="mx-auto w-24 h-24 text-yellow-600 mb-6 animate-bounce" />
        <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-900 mb-4">
          404 - Página No Encontrada
        </h1>
        <p className="text-xl md:text-2xl text-yellow-700 mb-8">
          La página que buscas no existe o ha sido movida.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-8 py-4 bg-primary-600 text-white rounded-xl font-bold text-lg hover:bg-primary-700 transition shadow-lg"
        >
          Volver al Inicio
        </button>
      </div>
    </div>
  );
}
