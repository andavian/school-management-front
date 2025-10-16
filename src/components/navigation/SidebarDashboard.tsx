import { useMemo } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Users,
  BookOpen,
  GraduationCap,
  Calendar,
  FileText,
  Settings,
  BarChart3,
  X,
} from "lucide-react";
import { useAppSelector } from "../../app/hooks";
import { PATHS } from "../../routes/paths";
import { UserRole } from "../../types/user.types";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  name: string;
  icon: React.ElementType;
  path: string;
  roles: UserRole[];
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const menuItems: MenuSection[] = [
  {
    title: "Principal",
    items: [
      {
        name: "Dashboard",
        icon: Home,
        path: PATHS.dashboard,
        roles: ["admin", "teacher", "student"],
      },
      {
        name: "Calendario",
        icon: Calendar,
        path: PATHS.calendar,
        roles: ["admin", "teacher", "student"],
      },
    ],
  },
  {
    title: "Gestión",
    items: [
      {
        name: "Estudiantes",
        icon: Users,
        path: PATHS.students,
        roles: ["admin", "teacher"],
      },
      {
        name: "Profesores",
        icon: GraduationCap,
        path: PATHS.teachers,
        roles: ["admin"],
      },
      {
        name: "Cursos",
        icon: BookOpen,
        path: PATHS.courses,
        roles: ["admin", "teacher"],
      },
      {
        name: "Calificaciones",
        icon: FileText,
        path: PATHS.grades,
        roles: ["admin", "teacher", "student"],
      },
    ],
  },
  {
    title: "Reportes",
    items: [
      {
        name: "Estadísticas",
        icon: BarChart3,
        path: PATHS.statistics,
        roles: ["admin", "teacher"],
      },
    ],
  },
  {
    title: "Sistema",
    items: [
      {
        name: "Configuración",
        icon: Settings,
        path: PATHS.settings,
        roles: ["admin"],
      },
    ],
  },
];

const SidebarDashboard = ({ isOpen, onClose }: SidebarProps) => {
  const { user } = useAppSelector((state) => state.auth);

  const filteredMenu = useMemo(() => {
    if (!user?.role) return []; // No hay usuario, no mostrar nada
    return menuItems
      .map((section) => ({
        ...section,
        items: section.items.filter((item) => item.roles.includes(user.role)),
      }))
      .filter((section) => section.items.length > 0);
  }, [user?.role]);

  return (
    <>
      {/* Overlay móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">EP</span>
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-sm">Paravachasca</h2>
              <p className="text-xs text-gray-500">Alta Gracia</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-lg text-gray-500 hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          {filteredMenu.map((section, index) => (
            <div key={index} className="mb-6">
              <h3 className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => {
                      if (window.innerWidth < 1024) onClose();
                    }}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                        isActive
                          ? "bg-primary-50 text-primary-700 font-medium"
                          : "text-gray-700 hover:bg-gray-50"
                      }`
                    }
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm">{item.name}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="bg-primary-50 rounded-lg p-4">
            <p className="text-sm font-medium text-primary-900 mb-1">
              ¿Necesitas ayuda?
            </p>
            <p className="text-xs text-primary-700 mb-3">
              Contacta con soporte técnico
            </p>
            <button className="w-full px-3 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition">
              Contactar
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SidebarDashboard;
