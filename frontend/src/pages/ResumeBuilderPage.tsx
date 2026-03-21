import { ResumeProvider } from '../context/ResumeContext';
import TopBar from '../components/TopBar';
import ResumeViewer from '../components/ResumeViewer';

export default function ResumeBuilderPage() {
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
