import { useEffect } from 'react';
import { Plus, BookOpen, Users, Clock } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchCourses } from '../../features/courses/slices/coursesSlice';

const CoursesPage = () => {
  const dispatch = useAppDispatch();
  const { courses, isLoading } = useAppSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  return (
    <div>
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Cursos</h1>
            <p className="text-gray-600 mt-2">
              Gestiona los cursos y materias de la institución
            </p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition shadow-md">
            <Plus className="w-5 h-5" />