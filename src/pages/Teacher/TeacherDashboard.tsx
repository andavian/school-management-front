import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Users,
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchTeacherCourses } from "../../features/teacher/slices/teacherCoursesSlice";
import SkeletonLoader from "../../components/SkeletonLoader";

const TeacherDashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const { courses, isLoading } = useAppSelector(
    (state) => state.teacherCourses
  );

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchTeacherCourses(user.id));
    }
  }, [dispatch, user]);

  // Calcular estadísticas
  const stats = {
    totalCourses: courses.length,
    totalStudents: courses.reduce((sum, c) => sum + c.studentsCount, 0),
    activeCourses: courses.length,
    pendingGrades: 12, // Mock
  };

  // Próximas clases hoy
  const today = new Date().toLocaleDateString("es-AR", { weekday: "long" });
  const todayClasses = courses.filter((course) =>
    course.schedule.some((s) => s.day.toLowerCase() === today.toLowerCase())
  );

  // Tareas pendientes
  const pendingTasks = [
    {
      id: 1,
      task: "Cargar notas del examen de Matemáticas 4°A",
      priority: "high",
    },
    {
      id: 2,
      task: "Revisar trabajos prácticos de Física 5°A",
      priority: "medium",
    },
    { id: 3, task: "Preparar material para clase de mañana", priority: "low" },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          ¡Bienvenido, Prof. {user?.firstName}! 👋
        </h1>
        <p className="text-gray-600 mt-2">
          Aquí está un resumen de tu actividad académica
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-secondary-600" />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Mis Cursos</p>
          <p className="text-3xl font-bold text-gray-900">
            {stats.totalCourses}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-primary-600" />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Total Estudiantes</p>
          <p className="text-3xl font-bold text-gray-900">
            {stats.totalStudents}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Cursos Activos</p>
          <p className="text-3xl font-bold text-gray-900">
            {stats.activeCourses}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Notas Pendientes</p>
          <p className="text-3xl font-bold text-gray-900">
            {stats.pendingGrades}
          </p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Mis Cursos */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Mis Cursos
              </h2>
              <button
                onClick={() => navigate("/teacher/courses")}
                className="text-sm text-secondary-600 font-medium hover:text-secondary-700"
              >
                Ver todos
              </button>
            </div>

            {isLoading ? (
              <SkeletonLoader type="card" rows={3} />
            ) : (
              <div className="space-y-4">
                {courses.slice(0, 3).map((course) => (
                  <div
                    key={course.id}
                    onClick={() => navigate(`/teacher/course/${course.id}`)}
                    className="p-4 border border-gray-200 rounded-lg hover:border-secondary-300 hover:bg-secondary-50 transition cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {course.name} - {course.year}° {course.section}
                        </h3>
                        <p className="text-sm text-gray-500">{course.code}</p>
                      </div>
                      <span className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs font-medium rounded-full">
                        {course.studentsCount} alumnos
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                      {course.schedule.map((s, i) => (
                        <span key={i} className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {s.day} {s.startTime}-{s.endTime}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Clases de Hoy */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 mt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-secondary-600" />
              Clases de Hoy
            </h2>
            {todayClasses.length > 0 ? (
              <div className="space-y-3">
                {todayClasses.map((course) => {
                  const todaySchedule = course.schedule.filter(
                    (s) => s.day.toLowerCase() === today.toLowerCase()
                  );
                  return todaySchedule.map((schedule, i) => (
                    <div
                      key={`${course.id}-${i}`}
                      className="flex items-center gap-4 p-4 bg-secondary-50 rounded-lg"
                    >
                      <div className="w-16 text-center">
                        <p className="text-sm font-semibold text-secondary-700">
                          {schedule.startTime}
                        </p>
                        <p className="text-xs text-gray-500">
                          {schedule.endTime}
                        </p>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {course.name} - {course.year}° {course.section}
                        </p>
                        <p className="text-sm text-gray-600">
                          {course.classroom}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          navigate(`/teacher/course/${course.id}/attendance`)
                        }
                        className="px-3 py-1 bg-secondary-600 text-white rounded text-sm hover:bg-secondary-700"
                      >
                        Tomar Asistencia
                      </button>
                    </div>
                  ));
                })}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                No tienes clases programadas para hoy
              </p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Tareas Pendientes */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Tareas Pendientes
            </h2>
            <div className="space-y-3">
              {pendingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      task.priority === "high"
                        ? "bg-red-500"
                        : task.priority === "medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  ></div>
                  <p className="text-sm text-gray-700">{task.task}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Acciones Rápidas */}
          <div className="bg-gradient-to-br from-secondary-600 to-secondary-700 rounded-xl p-6 shadow-lg text-white">
            <h3 className="text-lg font-semibold mb-4">Acciones Rápidas</h3>
            <div className="space-y-3">
              <button
                onClick={() => navigate("/teacher/grades")}
                className="w-full bg-white/20 hover:bg-white/30 transition rounded-lg p-3 text-left flex items-center gap-3"
              >
                <TrendingUp className="w-5 h-5" />
                <span className="font-medium">Cargar Calificaciones</span>
              </button>
              <button
                onClick={() => navigate("/teacher/attendance")}
                className="w-full bg-white/20 hover:bg-white/30 transition rounded-lg p-3 text-left flex items-center gap-3"
              >
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Tomar Asistencia</span>
              </button>
              <button
                onClick={() => navigate("/teacher/courses")}
                className="w-full bg-white/20 hover:bg-white/30 transition rounded-lg p-3 text-left flex items-center gap-3"
              >
                <BookOpen className="w-5 h-5" />
                <span className="font-medium">Ver Mis Cursos</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
