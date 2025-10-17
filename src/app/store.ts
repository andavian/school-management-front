import { configureStore } from "@reduxjs/toolkit";

// Aquí importaremos los reducers después
import authReducer from "../features/auth/slices/authSlice";
import studentsReducer from "../features/students/slices/studentsSlice";
import teachersReducer from "../features/teacher/slices/teachersSlice";
import coursesReducer from "../features/courses/slices/coursesSlice";
import teacherCoursesReducer from "../features/teacher/slices/teacherCoursesSlice";
import gradesReducer from "../features/teacher/slices/gradesSlice";
import attendanceReducer from "../features/teacher/slices/attendanceSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    students: studentsReducer,
    teachers: teachersReducer,
    courses: coursesReducer,
    teacherCourses: teacherCoursesReducer, // Cursos del teacher logueado
    grades: gradesReducer,
    attendance: attendanceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Tipos para TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
