// src/store/slices/auth.slice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type {
  AuthState,
  LoginCredentials,
  LoginResponse,
} from "../../../types/user.types";

import { UserRole } from "../../../types/user.types";

// Helper para cargar estado desde localStorage
const loadInitialState = (): AuthState => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  return {
    user: user ? JSON.parse(user) : null,
    token: token || null,
    isAuthenticated: !!token && !!user,
    isLoading: false,
    error: null,
  };
};

// Estado inicial
const initialState: AuthState = loadInitialState();

// Thunk para login
export const loginUser = createAsyncThunk<LoginResponse, LoginCredentials>(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      // Simulación de llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulación de login válido
      if (
        credentials.email === "admin@escuela.com" &&
        credentials.password === "admin123"
      ) {
        const response: LoginResponse = {
          user: {
            id: "1",
            email: credentials.email,
            firstName: "Admin",
            lastName: "Sistema",
            role: UserRole.ADMIN,
          },
          token: "fake-jwt-token-12345",
        };
        return response;
      }

      throw new Error("Credenciales inválidas");
    } catch (error: unknown) {
      let message = "Error desconocido";

      if (error instanceof Error) {
        message = error.message;
      }

      return rejectWithValue(message);
    }
  }
);

// Thunk para logout
export const logoutUser = createAsyncThunk<void>("auth/logout", async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return;
});

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Limpiar errores
    clearError: (state) => {
      state.error = null;
    },
    // Setear usuario desde localStorage (si recargamos la página)
    setUserFromToken: (state, action: PayloadAction<LoginResponse>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload
          ? (action.payload as string)
          : "Error desconocido";
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
      });
  },
});

export const { clearError, setUserFromToken } = authSlice.actions;
export default authSlice.reducer;
