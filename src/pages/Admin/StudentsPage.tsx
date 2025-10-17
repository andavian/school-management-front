import { useEffect, useState } from "react";
import { Plus, Search, Filter, Download, Upload } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  setFilters,
} from "../../features/students/slices/studentsSlice";
import StudentsTable from "../../features/students/components/StudentsTable";
import StudentModal from "../../features/students/components/StudentsModal";
import type { Student } from "../../types/student.types";

const StudentsPage = () => {
  const dispatch = useAppDispatch();
  const { students, isLoading, filters } = useAppSelector(
    (state) => state.students
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  // Filtrar estudiantes
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      filters.search === "" ||
      student.firstName.toLowerCase().includes(filters.search.toLowerCase()) ||
      student.lastName.toLowerCase().includes(filters.search.toLowerCase()) ||
      student.dni.includes(filters.search) ||
      student.email.toLowerCase().includes(filters.search.toLowerCase());

    const matchesCourse =
      filters.course === "" || student.courseId === filters.course;

    const matchesStatus =
      filters.status === "" || student.status === filters.status;

    return matchesSearch && matchesCourse && matchesStatus;
  });

  const handleCreate = () => {
    setModalMode("create");
    setSelectedStudent(null);
    setIsModalOpen(true);
  };

  const handleEdit = (student: Student) => {
    setModalMode("edit");
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleView = (student: Student) => {
    // TODO: Implementar vista detallada
    console.log("Ver estudiante:", student);
  };

  const handleDelete = (student: Student) => {
    setStudentToDelete(student);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (studentToDelete) {
      dispatch(deleteStudent(studentToDelete.id));
      setShowDeleteConfirm(false);
      setStudentToDelete(null);
    }
  };

  const handleSubmit = (data: Omit<Student, "id"> | Student) => {
    if (modalMode === "create") {
      dispatch(createStudent(data as Omit<Student, "id">));
    } else {
      dispatch(updateStudent(data as Student));
    }
  };

  const handleSearch = (value: string) => {
    dispatch(setFilters({ search: value }));
  };

  const handleCourseFilter = (value: string) => {
    dispatch(setFilters({ course: value }));
  };

  const handleStatusFilter = (value: string) => {
    dispatch(setFilters({ status: value }));
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Estudiantes</h1>
            <p className="text-gray-600 mt-2">
              Gestiona los estudiantes de la institución
            </p>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition shadow-md"
          >
            <Plus className="w-5 h-5" />
            Nuevo Estudiante
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <p className="text-gray-600 text-sm mb-1">Total Estudiantes</p>
          <p className="text-3xl font-bold text-gray-900">{students.length}</p>
          <p className="text-xs text-green-600 mt-2">+12% este mes</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <p className="text-gray-600 text-sm mb-1">Activos</p>
          <p className="text-3xl font-bold text-primary-600">
            {students.filter((s) => s.status === "active").length}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            {(
              (students.filter((s) => s.status === "active").length /
                students.length) *
              100
            ).toFixed(0)}
            % del total
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <p className="text-gray-600 text-sm mb-1">Turno Mañana</p>
          <p className="text-3xl font-bold text-secondary-600">
            {students.filter((s) => s.shift === "morning").length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <p className="text-gray-600 text-sm mb-1">Turno Tarde</p>
          <p className="text-3xl font-bold text-accent-600">
            {students.filter((s) => s.shift === "afternoon").length}
          </p>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nombre, DNI o email..."
                value={filters.search}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
              />
            </div>
          </div>

          {/* Course Filter */}
          <div>
            <select
              value={filters.course}
              onChange={(e) => handleCourseFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition bg-white"
            >
              <option value="">Todos los cursos</option>
              <option value="c1">4° Año A</option>
              <option value="c2">3° Año B</option>
              <option value="c3">2° Año A</option>
              <option value="c4">1° Año B</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={filters.status}
              onChange={(e) => handleStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition bg-white"
            >
              <option value="">Todos los estados</option>
              <option value="active">Activo</option>
              <option value="inactive">Inactivo</option>
              <option value="suspended">Suspendido</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-200">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition text-sm">
            <Download className="w-4 h-4" />
            Exportar
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition text-sm">
            <Upload className="w-4 h-4" />
            Importar
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition text-sm">
            <Filter className="w-4 h-4" />
            Más filtros
          </button>
        </div>
      </div>

      {/* Results Info */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Mostrando{" "}
          <span className="font-semibold">{filteredStudents.length}</span> de{" "}
          <span className="font-semibold">{students.length}</span> estudiantes
        </p>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="bg-white rounded-xl p-12 shadow-md border border-gray-200 text-center">
          <div className="inline-block w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 mt-4">Cargando estudiantes...</p>
        </div>
      ) : (
        <StudentsTable
          students={filteredStudents}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
        />
      )}

      {/* Modal */}
      <StudentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        student={selectedStudent}
        mode={modalMode}
      />

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
              onClick={() => setShowDeleteConfirm(false)}
            ></div>
            <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                ¿Eliminar estudiante?
              </h3>
              <p className="text-gray-600 mb-6">
                ¿Estás seguro de que deseas eliminar a{" "}
                <span className="font-semibold">
                  {studentToDelete?.firstName} {studentToDelete?.lastName}
                </span>
                ? Esta acción no se puede deshacer.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsPage;
