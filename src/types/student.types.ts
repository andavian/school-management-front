export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  dni: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  courseId: string;
  courseName: string;
  shift: "morning" | "afternoon";
  status: "active" | "inactive" | "suspended";
  avatar?: string;
  enrollmentDate: string;
  parentName?: string;
  parentPhone?: string;
}

export interface StudentsState {
  students: Student[];
  selectedStudent: Student | null;
  isLoading: boolean;
  error: string | null;
  filters: {
    search: string;
    course: string;
    status: string;
  };
}
