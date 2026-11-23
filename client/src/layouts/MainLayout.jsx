import { Outlet } from 'react-router-dom';
import { FileText } from 'lucide-react';

function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <FileText className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">DocuMind AI</span>
            </div>
            <nav>
              {/* Navigation items will be added here */}
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} DocuMind AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default MainLayout;
