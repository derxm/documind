import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Public Pages
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

// Authenticated Dashboard Pages
import DashboardPage from './pages/dashboard/DashboardPage';
import DocumentsPage from './pages/dashboard/DocumentsPage';
import AssistantPage from './pages/dashboard/AssistantPage';
import StudyNotesPage from './pages/dashboard/StudyNotesPage';
import QuizGeneratorPage from './pages/dashboard/QuizGeneratorPage';
import SettingsPage from './pages/dashboard/SettingsPage';

function App() {
  return (
    <Routes>
      {/* Public Marketing Route */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>

      {/* Authenticated Application Dashboard Routes */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/assistant" element={<AssistantPage />} />
        <Route path="/study-notes" element={<StudyNotesPage />} />
        <Route path="/quiz-generator" element={<QuizGeneratorPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      {/* Global Fallback 404 */}
      <Route element={<MainLayout />}>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
