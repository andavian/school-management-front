import React, { useState } from "react";
import {
  BookOpen,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  ArrowRight,
  Send,
  Check,
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    // Simular suscripción
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubscribed(true);
    setEmail("");
    setIsSubmitting(false);
  };

  const quickLinks = [
    { name: "Inicio", href: "#inicio" },
    { name: "Características", href: "#features" },
    { name: "Testimonios", href: "#testimonials" },
    { name: "Contacto", href: "#contact" },
  ];

  const admissionsLinks = [
    { name: "Proceso de Admisión", href: "/admisiones" },
    { name: "Requisitos", href: "/requisitos" },
    { name: "Becas", href: "/becas" },
    { name: "Preguntas Frecuentes", href: "/faq" },
  ];

  const academicLinks = [
    { name: "Ciclo Básico", href: "/basico" },
    { name: "Electromecánica", href: "/electromecanica" },
    { name: "Electricidad", href: "/electricidad" },
    { name: "Programas Especiales", href: "/programas" },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      name: "Facebook",
      href: "https://facebook.com/escuelaparavachasca",
      color: "hover:text-blue-600",
    },
    {
      icon: Instagram,
      name: "Instagram",
      href: "https://www.instagram.com/ipet132paravachascaok",
      color: "hover:text-pink-600",
    },
    {
      icon: Twitter,
      name: "Twitter",
      href: "https://twitter.com/escuelaparavachasca",
      color: "hover:text-blue-400",
    },
    {
      icon: Youtube,
      name: "YouTube",
      href: "https://www.youtube.com/c/ipetparavachasca",
      color: "hover:text-red-600",
    },
  ];

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
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">IPET 132 Paravachasca</h3>
                <p className="text-gray-400 text-sm">Alta Gracia</p>
              </div>
            </div>

            <p className="text-gray-400 mb-6 leading-relaxed">
              Formando líderes del mañana con educación de calidad, valores y
              tecnología desde 1994. Comprometidos con el desarrollo integral de
              cada estudiante.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-primary-400" />
                <span className="text-sm">
                  Gdor, A. Zanichelli 335, X5186 Alta Gracia, Córdoba
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-primary-400" />
                <span className="text-sm">+54 3547 423858</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-primary-400" />
                <span className="text-sm">info@paravachasca.edu.ar</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href.replace("#", ""))}
                    className="text-gray-400 hover:text-primary-400 transition flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Admissions & Academic */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">
              Admisiones
            </h4>
            <ul className="space-y-3 mb-8">
              {admissionsLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-primary-400 transition flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            <h4 className="text-lg font-semibold mb-6 text-white">Programas</h4>
            <ul className="space-y-3">
              {academicLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-primary-400 transition flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">
              Mantente Informado
            </h4>

            {/* Newsletter */}
            <div className="mb-8">
              {isSubscribed ? (
                <div className="bg-green-900/30 border border-green-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-green-400 mb-2">
                    <Check className="w-5 h-5" />
                    <span className="font-semibold">¡Suscrito!</span>
                  </div>
                  <p className="text-green-300 text-sm">
                    Gracias por suscribirte. Te mantendremos informado sobre
                    novedades.
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-gray-400 text-sm mb-4">
                    Suscríbete para recibir noticias y eventos importantes.
                  </p>
                  <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu@email.com"
                        className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <Send className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <p className="text-gray-500 text-xs">
                      Sin spam. Puedes darte de baja en cualquier momento.
                    </p>
                  </form>
                </>
              )}
            </div>

            {/* Social Links */}
            <div>
              <h5 className="text-lg font-semibold mb-4 text-white">
                Síguenos
              </h5>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 transition ${social.color} hover:bg-gray-700`}
                    aria-label={`Síguenos en ${social.name}`}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © 2024 IPET 132 Paravachasca. Todos los derechos reservados.
            </div>

            <div className="flex flex-wrap gap-6 text-sm">
              <a
                href="/privacidad"
                className="text-gray-400 hover:text-primary-400 transition"
              >
                Política de Privacidad
              </a>
              <a
                href="/terminos"
                className="text-gray-400 hover:text-primary-400 transition"
              >
                Términos de Servicio
              </a>
              <a
                href="/mapa-sitio"
                className="text-gray-400 hover:text-primary-400 transition"
              >
                Mapa del Sitio
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
