import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import GlobalAppShell from './components/GlobalAppShell';

import AppBuilder from './components/resumeBuilder/App';
import JobDescriptionsPage from './pages/JobDescriptionsPage';
import InterviewPrepPage from './pages/InterviewPrepPage';
import CoursesDashboardPage from './pages/CoursesDashboardPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Core Application Frame */}
        <Route path="/" element={<GlobalAppShell />}>
          
          {/* Default Resume Engine View */}
          <Route index element={<AppBuilder />} />

          {/* JD Tracker View */}
          <Route path="jds" element={<JobDescriptionsPage />} />

          {/* Skillon Preparation CMS View */}
          <Route path="courses" element={<CoursesDashboardPage />} />
          <Route path="courses/:courseId" element={<InterviewPrepPage />} />
          
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
