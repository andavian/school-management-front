import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Grade } from "../../../types/teacher.types";

interface GradesState {
  grades: Grade[];
  isLoading: boolean;
  error: string | null;
}

const initialState: GradesState = {
  grades: [],
  isLoading: false,
  error: null,
};

// Mock data
const mockGrades: Grade[] = [
  {
    id: "g1",
    studentId: "1",
    courseId: "c1",
    type: "exam",
    title: "Examen Trimestral",
    grade: 8.5,
    maxGrade: 10,
    weight: 40,
    date: new Date("2024-10-01"),
    teacherId: "prof1",
  },
  {
    id: "g2",
    studentId: "1",
    courseId: "c1",
    type: "homework",
    title: "Trabajo Práctico 1",
    grade: 9.0,
    maxGrade: 10,
    weight: 20,
    date: new Date("2024-09-15"),
    teacherId: "prof1",
  },
];

export const fetchGradesByCourse = createAsyncThunk(
  "grades/fetchByCourse",
  async (courseId: string, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return mockGrades.filter((g) => g.courseId === courseId);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createGrade = createAsyncThunk(
  "grades/create",
  async (gradeData: Omit<Grade, "id">, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const newGrade: Grade = {
        ...gradeData,
        id: Date.now().toString(),
      };
      return newGrade;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateGrade = createAsyncThunk(
  "grades/update",
  async (gradeData: Grade, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return gradeData;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteGrade = createAsyncThunk(
  "grades/delete",
  async (gradeId: string, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return gradeId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const gradesSlice = createSlice({
  name: "grades",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch grades
    builder.addCase(fetchGradesByCourse.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchGradesByCourse.fulfilled, (state, action) => {
      state.isLoading = false;
      state.grades = action.payload;
    });
    builder.addCase(fetchGradesByCourse.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Create grade
    builder.addCase(createGrade.fulfilled, (state, action) => {
      state.grades.push(action.payload);
    });

    // Update grade
    builder.addCase(updateGrade.fulfilled, (state, action) => {
      const index = state.grades.findIndex((g) => g.id === action.payload.id);
      if (index !== -1) {
        state.grades[index] = action.payload;
      }
    });

    // Delete grade
    builder.addCase(deleteGrade.fulfilled, (state, action) => {
      state.grades = state.grades.filter((g) => g.id !== action.payload);
    });
  },
});

export const { clearError } = gradesSlice.actions;
export default gradesSlice.reducer;
