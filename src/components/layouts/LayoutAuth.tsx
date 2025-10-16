import type { ReactNode } from "react";

export const LayoutAuth = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 to-accent-500 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-strong p-8">
        <header className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4 shadow-soft">
            <svg
              className="w-8 h-8 text-primary-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-primary-700">
            Sistema Escolar
          </h1>
          <p className="text-secondary-600 mt-2">
            Educación de calidad para todos
          </p>
        </header>

        {/* Contenido dinámico */}
        <main>{children}</main>

        <footer className="mt-10 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Sistema Escolar — Fundación Quimén
        </footer>
      </div>
    </div>
  );
};
