import { configureStore } from "@reduxjs/toolkit";

// Aquí importaremos los reducers después
import authReducer from "../features/auth/slices/authSlice";
import studentsReducer from "../features/students/slices/studentsSlice";
import teachersReducer from "../features/teachers/slices/teachersSlice";
import coursesReducer from "../features/courses/slices/coursesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    students: studentsReducer,
    teachers: teachersReducer,
    courses: coursesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Tipos para TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
