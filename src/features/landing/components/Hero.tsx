import { ArrowRight, PlayCircle } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20 lg:py-32">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Educación de
              <span className="text-primary-600"> Calidad</span>
              para el Futuro
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
              En la Escuela Paravachasca formamos líderes con valores,
              innovación y excelencia académica. Únete a nuestra comunidad
              educativa en Alta Gracia.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition shadow-lg flex items-center justify-center gap-2">
                Comenzar Ahora
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 border-2 border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition flex items-center justify-center gap-2">
                <PlayCircle className="w-5 h-5" />
                Ver Video
              </button>
            </div>

            {/* Stats */}
            <div className="mt-12 flex flex-wrap gap-8 justify-center lg:justify-start">
              <div className="text-center lg:text-left">
                <p className="text-3xl font-bold text-primary-600">+500</p>
                <p className="text-gray-600">Estudiantes</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-3xl font-bold text-secondary-600">+30</p>
                <p className="text-gray-600">Docentes</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-3xl font-bold text-accent-500">+20</p>
                <p className="text-gray-600">Años de Experiencia</p>
              </div>
            </div>
          </div>

          {/* Image/Illustration */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-lg">
              <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl w-full h-80 lg:h-96 flex items-center justify-center text-white">
                <img
                  src="https://via.placeholder.com/400x300?text=Escuela+Paravachasca"
                  alt="Escuela Paravachasca - Instalaciones"
                  className="rounded-2xl w-full h-full object-cover"
                />
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -left-4 bg-accent-400 text-gray-900 px-4 py-2 rounded-lg shadow-lg">
                <p className="font-semibold">Inscripciones Abiertas</p>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white text-gray-900 px-4 py-2 rounded-lg shadow-lg border border-gray-200">
                <p className="font-semibold">📚 15 Cursos Activos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
