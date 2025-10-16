import { LayoutAuth } from "../../../components/layouts/LayoutAuth";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { loginUser, clearError } from "../slices/authSlice";
import type { FormEvent } from "react";

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(clearError());
    await dispatch(loginUser({ email, password }));
  };

  return (
    <LayoutAuth>
      {/* Error Alert */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg shadow-soft">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Demo credentials info */}
      <div className="mb-6 p-4 bg-accent-50 border border-accent-200 rounded-lg shadow-soft">
        <p className="text-sm text-accent-700 font-semibold mb-1">Demo:</p>
        <p className="text-xs text-accent-700">Email: admin@escuela.com</p>
        <p className="text-xs text-accent-700">Password: admin123</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-primary-700 mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition placeholder-gray-400"
            placeholder="tu@email.com"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-primary-700 mb-2"
          >
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition placeholder-gray-400"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-medium"
        >
          {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
        </button>
      </form>
    </LayoutAuth>
  );
};
