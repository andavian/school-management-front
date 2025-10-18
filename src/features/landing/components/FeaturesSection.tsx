import { GraduationCap, Users, Award } from "lucide-react";
import FeatureCard from "./FeatureCard";

export default function FeaturesSection() {
  const features = [
    {
      icon: GraduationCap,
      title: "Excelencia Académica",
      description:
        "Programas educativos innovadores que preparan a los estudiantes para los desafíos del futuro con metodologías probadas.",
      features: [
        "Plan de estudios actualizado",
        "Docentes altamente calificados",
        "Seguimiento personalizado",
        "Preparación universitaria",
      ],
      color: "primary" as const,
    },
    {
      icon: Users,
      title: "Comunidad Inclusiva",
      description:
        "Un ambiente seguro y acogedor donde cada estudiante encuentra su lugar y desarrolla su potencial único.",
      features: [
        "Ambiente familiar y seguro",
        "Programas de integración",
        "Actividades extracurriculares",
        "Acompañamiento psicológico",
      ],
      color: "secondary" as const,
    },
    {
      icon: Award,
      title: "Formación Integral",
      description:
        "Desarrollamos habilidades académicas, sociales y emocionales para formar ciudadanos responsables y exitosos.",
      features: [
        "Educación en valores",
        "Desarrollo de liderazgo",
        "Programas deportivos",
        "Arte y cultura",
      ],
      color: "accent" as const,
    },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Una educación que transforma vidas
          </h2>
          <p className="text-lg text-gray-600">
            En el Instituto Paravachasca nos enfocamos en desarrollar el
            potencial completo de cada estudiante, combinando tradición
            educativa con innovación pedagógica.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              features={feature.features}
              color={feature.color}
            />
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-12 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold mb-2">35+</p>
              <p className="text-primary-100">Años de experiencia</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">98%</p>
              <p className="text-primary-100">Egresados universitarios</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">15</p>
              <p className="text-primary-100">Actividades extracurriculares</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">100%</p>
              <p className="text-primary-100">Ambiente seguro e inclusivo</p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            ¿Listo para ser parte de nuestra comunidad educativa?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition shadow-lg"
              onClick={() => (window.location.href = "/login")}
            >
              Iniciar proceso de admisión
            </button>
            <button className="px-8 py-4 border-2 border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition">
              Solicitar información
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
