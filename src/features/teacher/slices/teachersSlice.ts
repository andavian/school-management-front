import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Teacher, TeachersState } from "../../../types/teacher.types";

const initialState: TeachersState = {
  teachers: [],
  selectedTeacher: null,
  isLoading: false,
  error: null,
  filters: {
    search: "",
    specialization: "",
    status: "",
  },
};

const mockTeachers: Teacher[] = [
  {
    id: "1",
    firstName: "María",
    lastName: "González",
    dni: "20123456",
    email: "maria.gonzalez@escuela.com",
    phone: "3512345678",
    dateOfBirth: "1985-03-15",
    address: "Av. Libertador 100, Alta Gracia",
    specialization: "Matemáticas",
    subjects: ["Matemáticas", "Física"],
    status: "active",
    hireDate: "2015-03-01",
    salary: 80000,
  },
  {
    id: "2",
    firstName: "Roberto",
    lastName: "Fernández",
    dni: "21234567",
    email: "roberto.fernandez@escuela.com",
    phone: "3512345679",
    dateOfBirth: "1980-07-22",
    address: "San Martín 250, Alta Gracia",
    specialization: "Lengua y Literatura",
    subjects: ["Lengua", "Literatura"],
    status: "active",
    hireDate: "2012-02-15",
    salary: 85000,
  },
];

export const fetchTeachers = createAsyncThunk(
  "teachers/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return mockTeachers;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createTeacher = createAsyncThunk(
  "teachers/create",
  async (teacherData: Omit<Teacher, "id">, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const newTeacher: Teacher = {
        ...teacherData,
        id: Date.now().toString(),
      };
      return newTeacher;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTeacher = createAsyncThunk(
  "teachers/update",
  async (teacherData: Teacher, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return teacherData;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTeacher = createAsyncThunk(
  "teachers/delete",
  async (teacherId: string, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return teacherId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const teachersSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {
    setSelectedTeacher: (state, action: PayloadAction<Teacher | null>) => {
      state.selectedTeacher = action.payload;
    },
    setFilters: (
      state,
      action: PayloadAction<Partial<TeachersState["filters"]>>
    ) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTeachers.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchTeachers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.teachers = action.payload;
    });
    builder.addCase(fetchTeachers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    builder.addCase(createTeacher.fulfilled, (state, action) => {
      state.teachers.push(action.payload);
    });
    builder.addCase(updateTeacher.fulfilled, (state, action) => {
      const index = state.teachers.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.teachers[index] = action.payload;
      }
    });
    builder.addCase(deleteTeacher.fulfilled, (state, action) => {
      state.teachers = state.teachers.filter((t) => t.id !== action.payload);
    });
  },
});

export const { setSelectedTeacher, setFilters, clearError } =
  teachersSlice.actions;
export default teachersSlice.reducer;
