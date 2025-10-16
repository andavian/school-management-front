// UnauthorizedPageHero.tsx
import { AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 px-6">
      <div className="text-center max-w-2xl">
        <AlertCircle className="mx-auto w-24 h-24 text-red-600 mb-6 animate-pulse" />
        <h1 className="text-5xl md:text-6xl font-extrabold text-red-900 mb-4">
          Acceso Denegado
        </h1>
        <p className="text-xl md:text-2xl text-red-700 mb-8">
          Lo sentimos, no tienes permisos para acceder a esta sección.
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
