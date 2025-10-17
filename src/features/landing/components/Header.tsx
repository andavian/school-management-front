import { useState, useEffect, useRef } from "react";
import { BookOpen, Menu, X } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const observerRef = useRef<IntersectionObserver | null>(null);

  const navigation = [
    { name: "Inicio", href: "#inicio", id: "inicio" },
    { name: "Características", href: "#features", id: "features" },
    { name: "Testimonios", href: "#testimonials", id: "testimonials" },
    { name: "Contacto", href: "#contact", id: "contact" },
  ];

  // Scroll suave a la sección
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsMobileMenuOpen(false);
  };

  // Detectar sección activa en el viewport - CONFIGURACIÓN MEJORADA
  useEffect(() => {
    // Limpiar observer anterior si existe
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const sections = navigation
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    const options = {
      root: null,
      rootMargin: "-20% 0px -70% 0px", // Margen más conservador
      threshold: 0.3, // Umbral más bajo para activación más temprana
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    sections.forEach((section) => {
      if (section) observerRef.current?.observe(section);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Manejar el scroll manualmente como fallback
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset para activación temprana

      // Encontrar la sección actual basada en la posición de scroll
      for (const item of navigation) {
        const element = document.getElementById(item.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    // Agregar listener de scroll como fallback
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Resto del código permanece igual...
  const handleLogoClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setActiveSection("inicio");
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-6">
        {/* Desktop Navigation */}
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-4 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg p-2"
            aria-label="Ir al inicio"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-xl font-bold text-gray-900">
                Escuela Paravachasca
              </h1>
              <p className="text-sm text-gray-500">Alta Gracia</p>
            </div>
          </button>

          {/* Desktop Menu */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Navegación principal"
          >
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className={`px-4 py-2 font-medium transition-all rounded-lg relative ${
                  activeSection === item.id
                    ? "text-primary-600 bg-primary-50"
                    : "text-gray-700 hover:text-primary-600 hover:bg-primary-50"
                }`}
                aria-current={activeSection === item.id ? "page" : undefined}
              >
                {item.name}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-primary-600 rounded-full"></span>
                )}
              </button>
            ))}
          </nav>

          {/* CTA Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => scrollToSection("contact")}
              className="px-6 py-2.5 border-2 border-primary-600 text-primary-600 rounded-lg font-medium hover:bg-primary-50 transition focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Información
            </button>
            <button
              onClick={() => (window.location.href = "/login")}
              className="px-6 py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Acceder
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-primary-500"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Menú de navegación"
            aria-controls="mobile-menu"
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
          <div
            id="mobile-menu"
            className="md:hidden pb-6 border-t border-gray-200"
          >
            <nav
              className="flex flex-col gap-2 mt-4"
              aria-label="Navegación móvil"
            >
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-3 text-left font-medium transition-all rounded-lg ${
                    activeSection === item.id
                      ? "bg-primary-100 text-primary-700 border-l-4 border-primary-600"
                      : "text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                  }`}
                  aria-current={activeSection === item.id ? "page" : undefined}
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* CTA Mobile */}
            <div className="flex flex-col gap-3 mt-6">
              <button
                onClick={() => scrollToSection("contact")}
                className="w-full px-6 py-3 border-2 border-primary-600 text-primary-600 rounded-lg font-medium hover:bg-primary-50 transition text-center"
              >
                Solicitar Información
              </button>
              <button
                onClick={() => (window.location.href = "/login")}
                className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition shadow-md text-center"
              >
                Acceder a la Plataforma
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
