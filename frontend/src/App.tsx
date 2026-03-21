import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ResumeProvider } from './context/resumeBuilder/ResumeContext';
import TopBar from './components/resumeBuilder/TopBar';
import ResumeViewer from './components/resumeBuilder/ResumeViewer';
import DocsPage from './pages/DocsPage';
import NSDocsPage from './pages/NSDocsPage';
import JobDescriptionsPage from './pages/JobDescriptionsPage';
import InterviewPrepPage from './pages/InterviewPrepPage';
import GlobalAppShell from './components/GlobalAppShell';

// 1. The Core Resume Engine Builder View
function ResumeEngine() {
  return (
    <ResumeProvider>
      <div className="flex flex-col h-full w-full bg-gray-100 overflow-hidden relative">
        <TopBar />
        <div className="flex-1 overflow-auto p-4 sm:p-8 flex items-start justify-center">
          <ResumeViewer />
        </div>
      </div>
    </ResumeProvider>
  );
}

// 2. The Main Routing Wrapper
function App() {
  return (
    <BrowserRouter>
      <GlobalAppShell>
        <Routes>
          {/* Main Pillars */}
          <Route path="/" element={<ResumeEngine />} />
          <Route path="/jds" element={<JobDescriptionsPage />} />
          <Route path="/prep" element={<InterviewPrepPage />} />

          {/* Standalone Documentation Top-Level Overlays */}
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/ns-docs" element={<NSDocsPage />} />
        </Routes>
      </GlobalAppShell>
    </BrowserRouter>
  );
}

export default App;
