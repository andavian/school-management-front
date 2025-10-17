import { createBrowserRouter } from "react-router-dom";
import LayoutMain from "../components/layouts/LayoutDashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import { studentRoutes } from "../features/students/routes/StudentRoutes";
import { teacherRoutes } from "../features/teacher/routes/TeacherRoutes";
import { LoginForm } from "../features/auth/components/LoginForm";
import UnauthorizedPage from "../pages/UnauthorizedPage";
import NotFoundPage from "../pages/NotFoundPage";
import LandingPage from "../features/landing/pages/LandingPage"; // Importar la landing page

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />, // Cambiamos aquí: en lugar de redirigir a dashboard, mostramos la landing
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/unauthorized",
    element: <UnauthorizedPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <LayoutMain />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", element: <Dashboard /> },
      ...studentRoutes,
      ...teacherRoutes,
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
