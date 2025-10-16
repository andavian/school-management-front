import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Course, CoursesState } from "../../../types/course.types";

const initialState: CoursesState = {
  courses: [],
  selectedCourse: null,
  isLoading: false,
  error: null,
  filters: {
    search: "",
    year: "",
    status: "",
  },
};

const mockCourses: Course[] = [
  {
    id: "c1",
    name: "Matemáticas",
    code: "MAT-401",
    year: 4,
    section: "A",
    shift: "morning",
    teacherId: "1",
    teacherName: "María González",
    studentsCount: 28,
    schedule: [
      { day: "Lunes", startTime: "08:00", endTime: "10:00" },
      { day: "Miércoles", startTime: "08:00", endTime: "10:00" },
    ],
    status: "active",
    maxStudents: 35,
  },
  {
    id: "c2",
    name: "Lengua y Literatura",
    code: "LEN-301",
    year: 3,
    section: "B",
    shift: "afternoon",
    teacherId: "2",
    teacherName: "Roberto Fernández",
    studentsCount: 25,
    schedule: [
      { day: "Martes", startTime: "14:00", endTime: "16:00" },
      { day: "Jueves", startTime: "14:00", endTime: "16:00" },
    ],
    status: "active",
    maxStudents: 30,
  },
];

export const fetchCourses = createAsyncThunk(
  "courses/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return mockCourses;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createCourse = createAsyncThunk(
  "courses/create",
  async (courseData: Omit<Course, "id">, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const newCourse: Course = {
        ...courseData,
        id: Date.now().toString(),
      };
      return newCourse;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCourse = createAsyncThunk(
  "courses/update",
  async (courseData: Course, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return courseData;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCourse = createAsyncThunk(
  "courses/delete",
  async (courseId: string, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return courseId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setSelectedCourse: (state, action: PayloadAction<Course | null>) => {
      state.selectedCourse = action.payload;
    },
    setFilters: (
      state,
      action: PayloadAction<Partial<CoursesState["filters"]>>
    ) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCourses.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchCourses.fulfilled, (state, action) => {
      state.isLoading = false;
      state.courses = action.payload;
    });
    builder.addCase(fetchCourses.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    builder.addCase(createCourse.fulfilled, (state, action) => {
      state.courses.push(action.payload);
    });
    builder.addCase(updateCourse.fulfilled, (state, action) => {
      const index = state.courses.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.courses[index] = action.payload;
      }
    });
    builder.addCase(deleteCourse.fulfilled, (state, action) => {
      state.courses = state.courses.filter((c) => c.id !== action.payload);
    });
  },
});

export const { setSelectedCourse, setFilters, clearError } =
  coursesSlice.actions;
export default coursesSlice.reducer;
