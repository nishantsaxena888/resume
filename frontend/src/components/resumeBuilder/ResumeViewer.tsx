import { ClassicTemplate } from '../../templates/resumeBuilder/ClassicTemplate';
import { ModernTemplate } from '../../templates/resumeBuilder/ModernTemplate';
import { useResume } from '../../context/resumeBuilder/ResumeContext';

export default function ResumeViewer() {
  const { data } = useResume();

  const renderTemplate = () => {
    switch (data.metadata.template) {
      case 'modern':
        return <ModernTemplate data={data} />;
      case 'classic':
      default:
        return <ClassicTemplate data={data} />;
    }
  };

  return (
    <div className="h-full overflow-y-auto w-full flex flex-col items-center p-4 sm:p-8 hide-scrollbar">
      {renderTemplate()}
    </div>
  );
}
