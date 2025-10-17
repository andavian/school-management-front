import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TestimonialCard from "./TestimonialCard";
import type { Testimonial } from "./TestimonialCard";

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "María González",
      role: "Egresada 2022 - Estudiante de Medicina",
      relation: "student",
      avatar: "https://via.placeholder.com/150/4F46E5/FFFFFF?text=MG",
      rating: 5,
      content:
        "La Escuela Paravachasca no solo me dio una excelente base académica, sino que me enseñó valores y disciplina que aplico en mi carrera universitaria. Los profesores realmente se preocupan por el éxito de cada estudiante.",
      year: "Promoción 2022",
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      role: "Padre de estudiante de 3° año",
      relation: "parent",
      avatar: "https://via.placeholder.com/150/06B6D4/FFFFFF?text=CR",
      rating: 5,
      content:
        "Como padre, valoro mucho el ambiente seguro y familiar de la escuela. Mi hija ha desarrollado una confianza increible y su rendimiento académico ha mejorado notablemente. La comunicación con los docentes es excelente.",
    },
    {
      id: 3,
      name: "Ana Martínez",
      role: "Profesora de Matemáticas",
      relation: "teacher",
      avatar: "https://via.placeholder.com/150/F59E0B/FFFFFF?text=AM",
      rating: 5,
      content:
        "Enseñar aquí es un privilegio. Los estudiantes son curiosos, respetuosos y tienen un gran deseo de aprender. La dirección nos apoya con recursos modernos y metodologías innovadoras para hacer nuestras clases más efectivas.",
    },
    {
      id: 4,
      name: "Diego López",
      role: "Estudiante de 5° año",
      relation: "student",
      avatar: "https://via.placeholder.com/150/4F46E5/FFFFFF?text=DL",
      rating: 5,
      content:
        "Las actividades extracurriculares y los programas de liderazgo me han ayudado a descubrir mis pasiones. Los profesores siempre están disponibles para ayudarnos y el ambiente entre compañeros es muy unido.",
    },
    {
      id: 5,
      name: "Laura Fernández",
      role: "Madre de dos estudiantes",
      relation: "parent",
      avatar: "https://via.placeholder.com/150/06B6D4/FFFFFF?text=LF",
      rating: 5,
      content:
        "Mis dos hijos asisten a Paravachasca y no podría estar más contenta. La educación personalizada y el seguimiento constante hacen que cada niño reciba la atención que necesita. Es más que una escuela, es una familia.",
    },
  ];

  const nextTestimonial = () => {
    setActiveIndex((current) =>
      current === testimonials.length - 1 ? 0 : current + 1
    );
  };

  const prevTestimonial = () => {
    setActiveIndex((current) =>
      current === 0 ? testimonials.length - 1 : current - 1
    );
  };

  const goToTestimonial = (index: number) => {
    setActiveIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <section
      id="testimonials"
      className="py-20 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Lo que dicen sobre nosotros
          </h2>
          <p className="text-lg text-gray-600">
            Descubre las experiencias reales de nuestra comunidad educativa.
            Estudiantes, padres y docentes comparten lo que hace especial a la
            Escuela Paravachasca.
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:text-primary-600 hover:border-primary-300 transition-all"
            aria-label="Testimonio anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:text-primary-600 hover:border-primary-300 transition-all"
            aria-label="Testimonio siguiente"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Testimonials Carousel */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                  aria-hidden={index !== activeIndex}
                >
                  <TestimonialCard
                    testimonial={testimonial}
                    isActive={index === activeIndex}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activeIndex
                    ? "bg-primary-600 w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Ir al testimonio ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats below testimonials */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-3xl font-bold text-primary-600 mb-2">98%</p>
            <p className="text-gray-600">Padres satisfechos</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-secondary-600 mb-2">95%</p>
            <p className="text-gray-600">Estudiantes recomiendan</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-accent-600 mb-2">99%</p>
            <p className="text-gray-600">Tasa de retención</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary-600 mb-2">100%</p>
            <p className="text-gray-600">Ambiente seguro</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12 bg-primary-50 rounded-2xl p-8 border border-primary-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            ¿Listo para ser parte de nuestra comunidad?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Únete a las familias que ya confían en nosotros para la educación de
            sus hijos. Programa una visita guiada y conoce personalmente nuestro
            proyecto educativo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition shadow-lg"
              onClick={() => (window.location.href = "/login")}
            >
              Programar visita
            </button>
            <button className="px-8 py-4 border-2 border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition">
              Descargar brochure
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
