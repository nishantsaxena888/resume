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
import PythonAdvancedPage from './pages/static/PythonAdvancedPage';
import PythonBasicsPage from './pages/static/PythonBasicsPage';
import PythonBasics_DataTypesPage from './pages/static/PythonBasics_DataTypesPage';
import PythonBasics_DataStructuresPage from './pages/static/PythonBasics_DataStructuresPage';
import PythonBasics_ControlFlowPage from './pages/static/PythonBasics_ControlFlowPage';
import PythonBasics_ExceptionsPage from './pages/static/PythonBasics_ExceptionsPage';
import PythonBasics_RegexPage from './pages/static/PythonBasics_RegexPage';
import PythonBasics_OOPPage from './pages/static/PythonBasics_OOPPage';
import PythonBasics_PandasPage from './pages/static/PythonBasics_PandasPage';
import PythonBasics_EcosystemPage from './pages/static/PythonBasics_EcosystemPage';
import PythonBasics_DjangoPage from './pages/static/PythonBasics_DjangoPage';
import PythonBasics_WebFrameworksPage from './pages/static/PythonBasics_WebFrameworksPage';
import SystemDesignPage from './pages/static/SystemDesignPage';
import AlgomasterCoursesPage from './pages/static/AlgomasterCoursesPage';
import Algomaster_SystemDesignInterviewsPage from './pages/static/Algomaster_SystemDesignInterviewsPage';
import StaticNotesHubPage from './pages/static/StaticNotesHubPage';
import InterviewPrepPage from './pages/InterviewPrepPage';
import CoursesDashboardPage from './pages/CoursesDashboardPage';
import NotesForPrintPage from './pages/NotesForPrintPage';
import DocsPage from './pages/DocsPage';
import NSDocsPage from './pages/NSDocsPage';
import BooksDashboardPage from './pages/book/BooksDashboardPage';
import DynamicBookPage from './pages/book/DynamicBookPage';
import SyllabusMapPrototype from './pages/book/SyllabusMapPrototype';

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
            <Route path="/courses/:courseId" element={<InterviewPrepPage />} />
            <Route path="/static-notes" element={<StaticNotesHubPage />} />
            <Route path="/static-notes/aws-architect" element={<StaticNotesPage />} />
            <Route path="/static-notes/terraform" element={<TerraformTutorialPage />} />
            <Route path="/static-notes/system-design" element={<SystemDesignPage />} />
            <Route path="/static-notes/algomaster" element={<AlgomasterCoursesPage />} />
            <Route path="/static-notes/algomaster/system-design-interviews" element={<Algomaster_SystemDesignInterviewsPage />} />
            <Route path="/static-notes/python-basics">
              <Route index element={<PythonBasicsPage />} />
              <Route path="data-types" element={<PythonBasics_DataTypesPage />} />
              <Route path="data-structures" element={<PythonBasics_DataStructuresPage />} />
              <Route path="control-flow" element={<PythonBasics_ControlFlowPage />} />
              <Route path="exceptions" element={<PythonBasics_ExceptionsPage />} />
              <Route path="regex" element={<PythonBasics_RegexPage />} />
              <Route path="oop" element={<PythonBasics_OOPPage />} />
              <Route path="pandas" element={<PythonBasics_PandasPage />} />
              <Route path="ecosystem" element={<PythonBasics_EcosystemPage />} />
              <Route path="django" element={<PythonBasics_DjangoPage />} />
              <Route path="web" element={<PythonBasics_WebFrameworksPage />} />
            </Route>
            <Route path="/static-notes/python-advanced" element={<PythonAdvancedPage />} />
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
          {/* NEW DIGITAL TEXTBOOK UI */}
          <Route path="/books" element={<BooksDashboardPage />} />
          <Route path="/books/:bookId" element={<DynamicBookPage />} />
          <Route path="/books/:bookId/:chapterNum" element={<DynamicBookPage />} />
          <Route path="/prototype-map" element={<SyllabusMapPrototype />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ResumeProvider>
    </BrowserRouter>
  );
}
