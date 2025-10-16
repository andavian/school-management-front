import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  color?: "primary" | "secondary" | "accent";
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  features,
  color = "primary",
}: FeatureCardProps) {
  const colorClasses = {
    primary: {
      bg: "bg-primary-50",
      icon: "bg-primary-100 text-primary-600",
      text: "text-primary-600",
      border: "border-primary-200",
    },
    secondary: {
      bg: "bg-secondary-50",
      icon: "bg-secondary-100 text-secondary-600",
      text: "text-secondary-600",
      border: "border-secondary-200",
    },
    accent: {
      bg: "bg-accent-50",
      icon: "bg-accent-100 text-accent-600",
      text: "text-accent-600",
      border: "border-accent-200",
    },
  };

  const currentColor = colorClasses[color];

  return (
    <div
      className={`rounded-2xl p-8 ${currentColor.bg} border ${currentColor.border} hover:shadow-lg transition-all duration-300 h-full flex flex-col`}
    >
      {/* Icon */}
      <div
        className={`w-16 h-16 rounded-xl ${currentColor.icon} flex items-center justify-center mb-6`}
      >
        <Icon className="w-8 h-8" />
      </div>

      {/* Content */}
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 mb-6 flex-grow">{description}</p>

      {/* Features List */}
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3">
            <div
              className={`w-2 h-2 rounded-full ${currentColor.bg} border ${currentColor.border}`}
            ></div>
            <span className="text-gray-700 text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        className={`mt-6 px-6 py-3 ${currentColor.text} border ${currentColor.border} rounded-lg font-medium hover:bg-white transition self-start`}
      >
        Conocer más →
      </button>
    </div>
  );
}
