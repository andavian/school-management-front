import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import LogoParavachasca from "../../../components/LogoParavachasca";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const observerRef = useRef<IntersectionObserver | null>(null);

  const navigation = [
    { name: "Inicio", href: "#inicio", id: "inicio" },
    { name: "Características", href: "#features", id: "features" },
    { name: "Testimonios", href: "#testimonials", id: "testimonials" },
    { name: "Información", href: "#informacion", id: "informacion" },
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

  // Detectar sección activa en el viewport
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const sections = navigation
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    const options = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0.3,
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
      const scrollPosition = window.scrollY + 100;

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

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
      <div className="container mx-auto px-4 sm:px-6">
        {/* Desktop Navigation */}
        <div className="flex items-center justify-between h-16 lg:h-20">
          <button
            onClick={handleLogoClick}
            className="flex items-center hover:opacity-80 transition-opacity border-none outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 active:outline-none cursor-pointer rounded-lg p-1"
            aria-label="Ir al inicio"
          >
            <LogoParavachasca className="w-22 h-22 sm:w-24 sm:h-24 mt-6" />
            <div className="text-left hidden sm:block">
              <h1 className="text-lg lg:text-xl font-bold text-gray-900 leading-tight">
                IPET 132 Paravachasca
              </h1>
              <p className="text-xs text-gray-500 leading-tight">Alta Gracia</p>
            </div>
          </button>

          {/* Desktop Menu - Ajustado para notebooks */}
          <nav
            className="hidden xl:flex items-center gap-0"
            aria-label="Navegación principal"
          >
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-2 text-sm font-medium transition-all rounded-lg relative ${
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

          {/* Tablet Menu - Para resoluciones entre 1024px y 1280px */}
          <nav
            className="hidden lg:flex xl:hidden items-center gap-0"
            aria-label="Navegación tablet"
          >
            {navigation.slice(0, 4).map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className={`px-2 py-2 text-sm font-medium transition-all rounded-lg relative ${
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

          {/* CTA Desktop - Ajustado para notebooks */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={() => scrollToSection("contacto")}
              className="px-4 py-2 text-sm border-2 border-primary-600 text-primary-600 rounded-lg font-medium hover:bg-primary-50 transition focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 whitespace-nowrap"
            >
              Información
            </button>
            <button
              onClick={() => (window.location.href = "/login")}
              className="px-4 py-2 text-sm bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 whitespace-nowrap"
            >
              Acceder
            </button>
          </div>

          {/* Mobile Menu Button - Visible en lg y menor */}
          <button
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-primary-500"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Menú de navegación"
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden pb-4 border-t border-gray-200"
          >
            <nav
              className="flex flex-col gap-1 mt-3"
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
            <div className="flex flex-col gap-2 mt-4">
              <button
                onClick={() => scrollToSection("contacto")}
                className="w-full px-4 py-3 border-2 border-primary-600 text-primary-600 rounded-lg font-medium hover:bg-primary-50 transition text-center text-sm"
              >
                Solicitar Información
              </button>
              <button
                onClick={() => (window.location.href = "/login")}
                className="w-full px-4 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition shadow-md text-center text-sm"
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
