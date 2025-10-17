import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Attendance } from "../../../types/teacher.types";

interface AttendanceState {
  attendances: Attendance[];
  isLoading: boolean;
  error: string | null;
}

const initialState: AttendanceState = {
  attendances: [],
  isLoading: false,
  error: null,
};

export const fetchAttendanceByCourse = createAsyncThunk(
  "attendance/fetchByCourse",
  async (
    { courseId, date }: { courseId: string; date: string },
    { rejectWithValue }
  ) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      // TODO: API call
      return [];
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const saveAttendance = createAsyncThunk(
  "attendance/save",
  async (attendances: Omit<Attendance, "id">[], { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const savedAttendances: Attendance[] = attendances.map((a) => ({
        ...a,
        id: Date.now().toString() + Math.random(),
      }));
      return savedAttendances;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch attendance
    builder.addCase(fetchAttendanceByCourse.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchAttendanceByCourse.fulfilled, (state, action) => {
      state.isLoading = false;
      state.attendances = action.payload;
    });
    builder.addCase(fetchAttendanceByCourse.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Save attendance
    builder.addCase(saveAttendance.fulfilled, (state, action) => {
      state.attendances = action.payload;
    });
  },
});

export const { clearError } = attendanceSlice.actions;
export default attendanceSlice.reducer;
