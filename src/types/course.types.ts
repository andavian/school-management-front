export interface Course {
  id: string;
  name: string;
  code: string;
  year: number;
  section: string;
  shift: "morning" | "afternoon";
  teacherId: string;
  teacherName: string;
  studentsCount: number;
  schedule: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
  status: "active" | "inactive" | "completed";
  maxStudents: number;
}

export interface CoursesState {
  courses: Course[];
  selectedCourse: Course | null;
  isLoading: boolean;
  error: string | null;
  filters: {
    search: string;
    year: string;
    status: string;
  };
}
