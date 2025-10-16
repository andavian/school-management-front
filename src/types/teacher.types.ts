export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  dni: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  specialization: string;
  subjects: string[];
  status: "active" | "inactive" | "on-leave";
  avatar?: string;
  hireDate: string;
  salary?: number;
}

export interface TeachersState {
  teachers: Teacher[];
  selectedTeacher: Teacher | null;
  isLoading: boolean;
  error: string | null;
  filters: {
    search: string;
    specialization: string;
    status: string;
  };
}
