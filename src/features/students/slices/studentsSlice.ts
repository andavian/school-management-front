import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Student, StudentsState } from "../../../types/student.types";

const initialState: StudentsState = {
  students: [],
  selectedStudent: null,
  isLoading: false,
  error: null,
  filters: {
    search: "",
    course: "",
    status: "",
  },
};

// Mock data para desarrollo
const mockStudents: Student[] = [
  {
    id: "1",
    firstName: "Juan",
    lastName: "Pérez",
    dni: "12345678",
    email: "juan.perez@email.com",
    phone: "3512345678",
    dateOfBirth: "2010-05-15",
    address: "Calle Falsa 123, Alta Gracia",
    courseId: "c1",
    courseName: "4° Año A",
    shift: "morning",
    status: "active",
    enrollmentDate: "2024-03-01",
    parentName: "María Pérez",
    parentPhone: "3519876543",
  },
  {
    id: "2",
    firstName: "Ana",
    lastName: "González",
    dni: "23456789",
    email: "ana.gonzalez@email.com",
    phone: "3512345679",
    dateOfBirth: "2010-08-22",
    address: "Av. Libertador 456, Alta Gracia",
    courseId: "c1",
    courseName: "4° Año A",
    shift: "morning",
    status: "active",
    enrollmentDate: "2024-03-01",
    parentName: "Roberto González",
    parentPhone: "3519876544",
  },
  {
    id: "3",
    firstName: "Carlos",
    lastName: "Rodríguez",
    dni: "34567890",
    email: "carlos.rodriguez@email.com",
    phone: "3512345680",
    dateOfBirth: "2011-02-10",
    address: "San Martín 789, Alta Gracia",
    courseId: "c2",
    courseName: "3° Año B",
    shift: "afternoon",
    status: "active",
    enrollmentDate: "2024-03-01",
  },
];

// Thunks
export const fetchStudents = createAsyncThunk(
  "students/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      // TODO: Reemplazar con llamada real a API
      await new Promise((resolve) => setTimeout(resolve, 500));
      return mockStudents;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createStudent = createAsyncThunk(
  "students/create",
  async (studentData: Omit<Student, "id">, { rejectWithValue }) => {
    try {
      // TODO: Reemplazar con llamada real a API
      await new Promise((resolve) => setTimeout(resolve, 500));
      const newStudent: Student = {
        ...studentData,
        id: Date.now().toString(),
      };
      return newStudent;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateStudent = createAsyncThunk(
  "students/update",
  async (studentData: Student, { rejectWithValue }) => {
    try {
      // TODO: Reemplazar con llamada real a API
      await new Promise((resolve) => setTimeout(resolve, 500));
      return studentData;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteStudent = createAsyncThunk(
  "students/delete",
  async (studentId: string, { rejectWithValue }) => {
    try {
      // TODO: Reemplazar con llamada real a API
      await new Promise((resolve) => setTimeout(resolve, 500));
      return studentId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    setSelectedStudent: (state, action: PayloadAction<Student | null>) => {
      state.selectedStudent = action.payload;
    },
    setFilters: (
      state,
      action: PayloadAction<Partial<StudentsState["filters"]>>
    ) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch students
    builder.addCase(fetchStudents.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchStudents.fulfilled, (state, action) => {
      state.isLoading = false;
      state.students = action.payload;
    });
    builder.addCase(fetchStudents.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Create student
    builder.addCase(createStudent.fulfilled, (state, action) => {
      state.students.push(action.payload);
    });

    // Update student
    builder.addCase(updateStudent.fulfilled, (state, action) => {
      const index = state.students.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) {
        state.students[index] = action.payload;
      }
    });

    // Delete student
    builder.addCase(deleteStudent.fulfilled, (state, action) => {
      state.students = state.students.filter((s) => s.id !== action.payload);
    });
  },
});

export const { setSelectedStudent, setFilters, clearError } =
  studentsSlice.actions;
export default studentsSlice.reducer;
