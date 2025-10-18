import { ArrowRight, PlayCircle, Users, BookOpen, Award } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20 lg:py-32 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-accent-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-secondary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
              <Award className="w-4 h-4" />
              Educación de calidad desde 1985
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Formando los
              <span className="text-primary-600"> líderes</span>
              del mañana
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
              En el Instituto Provincial de Educación Técnica N° 132
              "Paravachasca" combinamos tradición educativa con innovación
              tecnológica. Un entorno donde cada estudiante descubre su
              potencial y construye su futuro.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <button
                className="px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition shadow-lg flex items-center justify-center gap-2"
                onClick={() => (window.location.href = "/login")}
              >
                Acceder a la Plataforma
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 border-2 border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition flex items-center justify-center gap-2">
                <PlayCircle className="w-5 h-5" />
                Conocer la Escuela
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-2xl">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                  <Users className="w-6 h-6 text-primary-600" />
                  <p className="text-2xl font-bold text-gray-900">+500</p>
                </div>
                <p className="text-gray-600">Estudiantes activos</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                  <BookOpen className="w-6 h-6 text-secondary-600" />
                  <p className="text-2xl font-bold text-gray-900">+30</p>
                </div>
                <p className="text-gray-600">Docentes especializados</p>
              </div>
              <div className="text-center lg:text-left col-span-2 md:col-span-1">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                  <Award className="w-6 h-6 text-accent-500" />
                  <p className="text-2xl font-bold text-gray-900">98%</p>
                </div>
                <p className="text-gray-600">Egresados universitarios</p>
              </div>
            </div>
          </div>

          {/* Image/Illustration */}
          <div className="flex-1 flex justify-center">
            <div className="relative">
              {/* Main image */}
              <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl w-full max-w-md lg:max-w-lg h-80 lg:h-96 flex items-center justify-center text-white overflow-hidden shadow-2xl">
                <img
                  src="https://via.placeholder.com/500x400/4F46E5/FFFFFF?text=Escuela+Paravachasca"
                  alt="Estudiantes del Instituto Paravachasca en el campus"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -left-4 bg-white rounded-xl p-4 shadow-lg border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Award className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Excelencia</p>
                    <p className="text-xs text-gray-500">Académica</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-lg border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-accent-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Comunidad</p>
                    <p className="text-xs text-gray-500">Activa</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
