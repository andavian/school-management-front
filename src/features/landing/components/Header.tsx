import { useState } from "react";
import { BookOpen, Menu, X } from "lucide-react";
import NavLink from "./NavLink";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Inicio", href: "#inicio" },
    { name: "Nosotros", href: "#nosotros" },
    { name: "Cursos", href: "#cursos" },
    { name: "Admisiones", href: "#admisiones" },
    { name: "Contacto", href: "#contacto" },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6">
        {/* Desktop Navigation */}
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Escuela Paravachasca
              </h1>
              <p className="text-sm text-gray-500">Alta Gracia</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <nav
            className="hidden md:flex items-center gap-2"
            aria-label="Navegación principal"
          >
            {navigation.map((item) => (
              <NavLink key={item.name} href={item.href}>
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* CTA Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <button className="px-6 py-2.5 border-2 border-primary-600 text-primary-600 rounded-lg font-medium hover:bg-primary-50 transition">
              Ingresar
            </button>
            <button className="px-6 py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition shadow-md">
              Pre-inscripción
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Menú de navegación"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-6 border-t border-gray-200">
            <nav
              className="flex flex-col gap-2 mt-4"
              aria-label="Navegación móvil"
            >
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>

            {/* CTA Mobile */}
            <div className="flex flex-col gap-3 mt-6">
              <button
                className="w-full px-6 py-3 border-2 border-primary-600 text-primary-600 rounded-lg font-medium hover:bg-primary-50 transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Ingresar
              </button>
              <button
                className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition shadow-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pre-inscripción
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
