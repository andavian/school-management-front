import { Users, BookOpen, GraduationCap, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      name: "Total Estudiantes",
      value: "1,234",
      icon: Users,
      color: "primary",
      trend: "+12%",
    },
    {
      name: "Cursos Activos",
      value: "24",
      icon: BookOpen,
      color: "secondary",
      trend: "+5%",
    },
    {
      name: "Profesores",
      value: "48",
      icon: GraduationCap,
      color: "accent",
      trend: "+2%",
    },
    {
      name: "Promedio General",
      value: "8.5",
      icon: TrendingUp,
      color: "green",
      trend: "+0.3",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Bienvenido al sistema escolar Paravachasca
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-md border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}
              >
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <span className="text-sm font-medium text-green-600">
                {stat.trend}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-1">{stat.name}</p>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Placeholder content */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Actividad Reciente
          </h2>
          <p className="text-gray-500">Contenido próximamente...</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Próximos Eventos
          </h2>
          <p className="text-gray-500">Contenido próximamente...</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
