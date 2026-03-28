import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import GlobalAppShell from './components/GlobalAppShell';
import { ResumeProvider } from './context/resumeBuilder/ResumeContext';

import LoginPage from './pages/LoginPage';
import PreparationsDashboardPage from './pages/PreparationsDashboardPage';
import ResumesDashboardPage from './pages/ResumesDashboardPage';
import JDsDashboardPage from './pages/JDsDashboardPage';
import PreparationWorkspaceShell from './components/PreparationWorkspaceShell';
import ResumeBuilderPage from './pages/ResumeBuilderPage';
import SingleJDPage from './pages/SingleJDPage';
import StaticNotesPage from './pages/static/StaticNotesPage';
import TerraformTutorialPage from './pages/static/TerraformTutorialPage';
import StaticNotesHubPage from './pages/static/StaticNotesHubPage';
import InterviewPrepPage from './pages/InterviewPrepPage';
import CoursesDashboardPage from './pages/CoursesDashboardPage';
import NotesForPrintPage from './pages/NotesForPrintPage';
import DocsPage from './pages/DocsPage';
import NSDocsPage from './pages/NSDocsPage';

export default function App() {
  return (
    <BrowserRouter>
      <ResumeProvider>
        <Routes>
          
          {/* Unauthenticated Full-Screen Gateway */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Global Sandbox Navigation Header */}
          <Route element={<GlobalAppShell />}>
            {/* Preparation Landing Hub */}
            <Route path="/dashboard" element={<PreparationsDashboardPage />} />
            
            {/* Dedicated Sandbox Repositories */}
            <Route path="/resumes" element={<ResumesDashboardPage />} />
            <Route path="/resumes/:resumeId" element={<ResumeBuilderPage />} />
            <Route path="/jds" element={<JDsDashboardPage />} />
            <Route path="/jds/:jdId" element={<SingleJDPage />} />
            <Route path="/courses" element={<CoursesDashboardPage />} />
            <Route path="/static-notes" element={<StaticNotesHubPage />} />
            <Route path="/static-notes/aws-architect" element={<StaticNotesPage />} />
            <Route path="/static-notes/terraform" element={<TerraformTutorialPage />} />
          </Route>

          {/* Authenticated Workspace Shell (Left Sidebar Menu locked to Prep ID) */}
          <Route element={<PreparationWorkspaceShell />}>
            
            {/* Target Resume */}
            <Route path="/prep/:prepId/resume" element={<ResumeBuilderPage />} />

            {/* Target Job Description */}
            <Route path="/prep/:prepId/jd" element={<SingleJDPage />} />

            {/* Prep Curriculum Modules (Many courses per Prep) */}
            <Route path="/prep/:prepId/courses" element={<CoursesDashboardPage />} />
            <Route path="/prep/:prepId/courses/:courseId" element={<InterviewPrepPage />} />

            {/* Printable Notes */}
            <Route path="/prep/:prepId/notes" element={<NotesForPrintPage />} />
            
          </Route>

          {/* Global Standalone Documentation Links */}
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/ns-docs" element={<NSDocsPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ResumeProvider>
    </BrowserRouter>
  );
}
