import TopBar from '../components/resumeBuilder/TopBar';
import ResumeViewer from '../components/resumeBuilder/ResumeViewer';

export default function ResumeBuilderPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] font-sans flex flex-col overflow-hidden bg-white print:min-h-0 print:h-auto print:overflow-visible print:block relative">
      <div className="print:hidden"><TopBar /></div>
      <div className="flex-1 overflow-auto p-4 sm:p-8 flex items-start justify-center print:overflow-visible print:p-0 print:block">
        <ResumeViewer />
      </div>
    </div>
  );
}
