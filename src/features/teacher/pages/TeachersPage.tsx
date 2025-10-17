import { useEffect } from "react";
import { Plus, GraduationCap } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchTeachers } from "../slices/teachersSlice";

const TeachersPage = () => {
  const dispatch = useAppDispatch();
  const { teachers, isLoading } = useAppSelector((state) => state.teachers);

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  return (
    <div>
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Profesores</h1>
            <p className="text-gray-600 mt-2">
              Gestiona los profesores de la institución
            </p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition shadow-md">
            <Plus className="w-5 h-5" />
            Nuevo Profesor
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <p className="text-gray-600 text-sm mb-1">Total Profesores</p>
          <p className="text-3xl font-bold text-gray-900">{teachers.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <p className="text-gray-600 text-sm mb-1">Activos</p>
          <p className="text-3xl font-bold text-primary-600">
            {teachers.filter((t) => t.status === "active").length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <p className="text-gray-600 text-sm mb-1">Especializaciones</p>
          <p className="text-3xl font-bold text-secondary-600">
            {new Set(teachers.map((t) => t.specialization)).size}
          </p>
        </div>
      </div>

      {/* Teachers Grid */}
      {isLoading ? (
        <div className="bg-white rounded-xl p-12 shadow-md border border-gray-200 text-center">
          <div className="inline-block w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 mt-4">Cargando profesores...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-8 h-8 text-primary-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {teacher.firstName} {teacher.lastName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {teacher.specialization}
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium text-gray-900 truncate ml-2">
                    {teacher.email}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Teléfono:</span>
                  <span className="font-medium text-gray-900">
                    {teacher.phone}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Materias:</span>
                  <span className="font-medium text-gray-900">
                    {teacher.subjects.length}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
                <button className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition text-sm">
                  Ver Perfil
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition text-sm">
                  Editar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeachersPage;
