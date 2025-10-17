import { Quote, Star } from "lucide-react";

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  relation: "student" | "parent" | "teacher";
  avatar: string;
  rating: number;
  content: string;
  year?: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  isActive?: boolean;
}

export default function TestimonialCard({
  testimonial,
  isActive = false,
}: TestimonialCardProps) {
  const relationColors = {
    student: "bg-primary-100 text-primary-700 border-primary-200",
    parent: "bg-secondary-100 text-secondary-700 border-secondary-200",
    teacher: "bg-accent-100 text-accent-700 border-accent-200",
  };

  const relationLabels = {
    student: "Estudiante",
    parent: "Padre/Madre",
    teacher: "Docente",
  };

  return (
    <div
      className={`bg-white rounded-2xl p-8 shadow-lg border border-gray-200 transition-all duration-500 ${
        isActive ? "transform scale-105 shadow-xl" : "opacity-70"
      }`}
    >
      {/* Quote Icon */}
      <div className="mb-4">
        <Quote className="w-8 h-8 text-primary-300" />
      </div>

      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < testimonial.rating
                ? "text-yellow-400 fill-current"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <blockquote className="text-gray-700 text-lg leading-relaxed mb-6">
        "{testimonial.content}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-4">
        <img
          src={testimonial.avatar}
          alt={`${testimonial.name} - ${relationLabels[testimonial.relation]}`}
          className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-semibold text-gray-900">{testimonial.name}</p>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium border ${
                relationColors[testimonial.relation]
              }`}
            >
              {relationLabels[testimonial.relation]}
            </span>
          </div>
          <p className="text-gray-500 text-sm">{testimonial.role}</p>
          {testimonial.year && (
            <p className="text-primary-600 text-xs font-medium mt-1">
              {testimonial.year}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
