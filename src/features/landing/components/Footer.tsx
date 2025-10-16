import React from "react";
import { BookOpen } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">
                Escuela Paravachasca
              </p>
              <p className="text-sm text-gray-500">Alta Gracia</p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-600">
              © 2024 Todos los derechos reservados
            </p>
            <p className="text-xs text-gray-500">Sistema de Gestión Escolar</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
