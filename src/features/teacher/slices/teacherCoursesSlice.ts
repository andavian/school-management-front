import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  TeacherCourse,
  CourseStudent,
} from "../../../types/teacher.types";

interface TeacherCoursesState {
  courses: TeacherCourse[];
  selectedCourse: TeacherCourse | null;
  students: CourseStudent[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TeacherCoursesState = {
  courses: [],
  selectedCourse: null,
  students: [],
  isLoading: false,
  error: null,
};

// Mock data
const mockCourses: TeacherCourse[] = [
  {
    id: "c1",
    name: "Matemáticas",
    code: "MAT-401",
    year: 4,
    section: "A",
    shift: "morning",
    studentsCount: 32,
    schedule: [
      { day: "Lunes", startTime: "08:00", endTime: "10:00" },
      { day: "Miércoles", startTime: "08:00", endTime: "10:00" },
    ],
    classroom: "Aula 12",
  },
  {
    id: "c2",
    name: "Matemáticas",
    code: "MAT-402",
    year: 4,
    section: "B",
    shift: "morning",
    studentsCount: 28,
    schedule: [
      { day: "Martes", startTime: "10:00", endTime: "12:00" },
      { day: "Jueves", startTime: "10:00", endTime: "12:00" },
    ],
    classroom: "Aula 12",
  },
  {
    id: "c3",
    name: "Física",
    code: "FIS-501",
    year: 5,
    section: "A",
    shift: "afternoon",
    studentsCount: 30,
    schedule: [
      { day: "Lunes", startTime: "14:00", endTime: "16:00" },
      { day: "Miércoles", startTime: "14:00", endTime: "16:00" },
    ],
    classroom: "Lab. Física",
  },
  {
    id: "c4",
    name: "Física",
    code: "FIS-502",
    year: 5,
    section: "B",
    shift: "afternoon",
    studentsCount: 26,
    schedule: [{ day: "Viernes", startTime: "14:00", endTime: "16:00" }],
    classroom: "Lab. Física",
  },
];

const mockStudents: CourseStudent[] = [
  {
    id: "1",
    firstName: "Juan",
    lastName: "Pérez",
    dni: "12345678",
    email: "juan.perez@email.com",
    currentGrade: 8.5,
    attendance: 95,
    status: "active",
  },
  {
    id: "2",
    firstName: "Ana",
    lastName: "González",
    dni: "23456789",
    email: "ana.gonzalez@email.com",
    currentGrade: 9.0,
    attendance: 98,
    status: "active",
  },
  {
    id: "3",
    firstName: "Carlos",
    lastName: "Rodríguez",
    dni: "34567890",
    email: "carlos.rodriguez@email.com",
    currentGrade: 6.5,
    attendance: 85,
    status: "active",
  },
  {
    id: "4",
    firstName: "María",
    lastName: "López",
    dni: "45678901",
    email: "maria.lopez@email.com",
    currentGrade: 7.8,
    attendance: 92,
    status: "active",
  },
  {
    id: "5",
    firstName: "Pedro",
    lastName: "Martínez",
    dni: "56789012",
    email: "pedro.martinez@email.com",
    currentGrade: 8.2,
    attendance: 90,
    status: "active",
  },
];

// Thunks
export const fetchTeacherCourses = createAsyncThunk(
  "teacherCourses/fetchAll",
  async (teacherId: string, { rejectWithValue }) => {
    try {
      // TODO: API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      return mockCourses;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCourseStudents = createAsyncThunk(
  "teacherCourses/fetchStudents",
  async (courseId: string, { rejectWithValue }) => {
    try {
      // TODO: API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      return mockStudents;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const teacherCoursesSlice = createSlice({
  name: "teacherCourses",
  initialState,
  reducers: {
    setSelectedCourse: (state, action: PayloadAction<TeacherCourse | null>) => {
      state.selectedCourse = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch courses
    builder.addCase(fetchTeacherCourses.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchTeacherCourses.fulfilled, (state, action) => {
      state.isLoading = false;
      state.courses = action.payload;
    });
    builder.addCase(fetchTeacherCourses.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Fetch students
    builder.addCase(fetchCourseStudents.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCourseStudents.fulfilled, (state, action) => {
      state.isLoading = false;
      state.students = action.payload;
    });
    builder.addCase(fetchCourseStudents.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const { setSelectedCourse, clearError } = teacherCoursesSlice.actions;
export default teacherCoursesSlice.reducer;
