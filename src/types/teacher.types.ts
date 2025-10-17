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

export interface TeacherCourse {
  id: string;
  name: string;
  code: string;
  year: number;
  section: string;
  shift: "morning" | "afternoon";
  studentsCount: number;
  schedule: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
  classroom?: string;
}

export interface CourseStudent {
  id: string;
  firstName: string;
  lastName: string;
  dni: string;
  email: string;
  avatar?: string;
  currentGrade?: number;
  attendance: number; // Porcentaje
  status: "active" | "inactive";
}

export interface Grade {
  id: string;
  studentId: string;
  courseId: string;
  type: "exam" | "homework" | "project" | "participation" | "other";
  title: string;
  grade: number;
  maxGrade: number;
  weight: number; // Peso en promedio (%)
  date: Date;
  observations?: string;
  teacherId: string;
}

export interface Attendance {
  id: string;
  studentId: string;
  courseId: string;
  date: Date;
  status: "present" | "absent" | "late" | "justified";
  observations?: string;
  teacherId: string;
}

export interface TeacherStats {
  totalStudents: number;
  activeCourses: number;
  avgGrade: number;
  attendanceRate: number;
  pendingGrades: number;
}
