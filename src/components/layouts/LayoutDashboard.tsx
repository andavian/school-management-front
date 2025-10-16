import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../navigation/NavbarDashboard";
import Sidebar from "../navigation/SidebarDashboard";

const LayoutMain = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? "lg:ml-64" : "ml-0"
        }`}
      >
        {/* Navbar */}
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        {/* Page Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>

        {/* Footer opcional */}
        <footer className="bg-white border-t border-gray-200 py-4 px-6">
          <p className="text-center text-sm text-gray-500">
            © 2024 Escuela Paravachasca "Alta Gracia" - Todos los derechos
            reservados
          </p>
        </footer>
      </div>
    </div>
  );
};

export default LayoutMain;
