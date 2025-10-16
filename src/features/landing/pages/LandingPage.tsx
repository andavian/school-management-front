import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main>
        {/* Hero section se agregará en el próximo paso */}
        <section className="container mx-auto px-6 py-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Bienvenido a Escuela Paravachasca
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Sistema de gestión escolar moderno y eficiente
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition shadow-md">
              Acceder a la Plataforma
            </button>
            <button className="px-6 py-3 border-2 border-primary-600 text-primary-600 rounded-lg font-medium hover:bg-primary-50 transition">
              Conocer Más
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
