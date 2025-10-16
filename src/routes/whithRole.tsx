import { UserRole } from "../types/user.types";
import ProtectedRoute from "../components/ProtectedRoute";

export const withRole = (
  allowedRoles: UserRole[],
  Component: React.ComponentType
) => {
  return (
    <ProtectedRoute allowedRoles={allowedRoles}>
      <Component />
    </ProtectedRoute>
  );
};
