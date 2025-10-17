import StudentsPage from "../../../pages/Admin/StudentsPage";
//import StudentDetails from "../pages/StudentDetails";
import { withRole } from "../../../routes/whithRole";

export const studentRoutes = [
  {
    path: "students",
    element: withRole(["admin", "teacher"], StudentsPage),
  },
  // {
  //  path: "students/:id",
  //element: withRole(["admin", "teacher"], StudentDetails),
  //},
];
