import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoginForm } from "../features/auth/components/LoginForm";
import LayoutMain from "../components/layouts/LayoutDashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import StudentsPage from "../features/students/pages/StudentsPage";
import TeachersPage from "../features/teachers/pages/TeachersPage";
// Import otras páginas...

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <LayoutMain />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "students",
        element: <StudentsPage />,
      },
      {
        path: "teachers",
        element: <TeachersPage />,
      },
    ],
  },
]);
