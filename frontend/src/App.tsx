import { ResumeProvider } from './context/resumeBuilder/ResumeContext';
import TopBar from './components/resumeBuilder/TopBar';
import ResumeViewer from './components/resumeBuilder/ResumeViewer';
import DocsPage from './pages/DocsPage';

function App() {
  const path = window.location.pathname;
  if (path === '/docs' || path === '/docs/') {
    return <DocsPage />;
  }
  return (
    <ResumeProvider>
      <div className="min-h-screen bg-gray-100 font-sans flex flex-col overflow-hidden">
        <TopBar />
        <div className="flex-1 overflow-auto p-4 sm:p-8 flex items-start justify-center">
          <ResumeViewer />
        </div>
      </div>
    </ResumeProvider>
  );
}

export default App;
