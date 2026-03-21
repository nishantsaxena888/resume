import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import GlobalAppShell from './components/GlobalAppShell';

import LoginPage from './pages/LoginPage';
import ResumeBuilderPage from './pages/ResumeBuilderPage';
import JobDescriptionsPage from './pages/JobDescriptionsPage';
import InterviewPrepPage from './pages/InterviewPrepPage';
import CoursesDashboardPage from './pages/CoursesDashboardPage';
import DocsPage from './pages/DocsPage';
import NSDocsPage from './pages/NSDocsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* Unauthenticated Full-Screen Gateway */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Authenticated Dashboard Shell (Left Sidebar Menu) */}
        <Route element={<GlobalAppShell />}>
          
          {/* Default Resume Engine View */}
          <Route path="/resume" element={<ResumeBuilderPage />} />

          {/* JD Tracker View */}
          <Route path="/jds" element={<JobDescriptionsPage />} />

          {/* Skillon Preparation Modules */}
          <Route path="/courses" element={<CoursesDashboardPage />} />
          <Route path="/courses/:courseId" element={<InterviewPrepPage />} />
          
        </Route>

        {/* Global Standalone Documentation Links */}
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/ns-docs" element={<NSDocsPage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
