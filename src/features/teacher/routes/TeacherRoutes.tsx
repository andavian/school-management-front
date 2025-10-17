import TeachersPage from "../pages/TeachersPage";
import { withRole } from "../../../routes/whithRole";

export const teacherRoutes = [
  {
    path: "teachers",
    element: withRole(["admin"], TeachersPage),
  },
];
