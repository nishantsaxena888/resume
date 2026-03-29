import { MarkdownWidget } from './course/MarkdownWidget';
import { FlashcardWidget } from './course/FlashcardWidget';
import { CodeWidget } from './course/CodeWidget';
import { VideoWidget } from './course/VideoWidget';
import { YoutubeWidget } from './course/YoutubeWidget';

interface WidgetRendererProps {
  domain: "course" | "resume" | "jd";
  widget: any;
  onUpdate?: (id: number, payload: any) => void;
  onDelete?: (id: number) => void;
  activeModuleId?: number | string;
}

export function WidgetRenderer({ domain, widget, onUpdate, onDelete, activeModuleId }: WidgetRendererProps) {
  
  if (domain === "course") {
    switch (widget.widget_type) {
      case 'markdown':
        return <MarkdownWidget payload={widget.payload} widgetId={widget.id} onUpdate={onUpdate} onDelete={onDelete} />;
      case 'flashcard':
        return <FlashcardWidget payload={widget.payload} widgetId={widget.id} onUpdate={onUpdate} onDelete={onDelete} />;
      case 'code_snippet':
        return <CodeWidget payload={widget.payload} widgetId={widget.id} onUpdate={onUpdate} onDelete={onDelete} />;
      case 'video_embed':
        return <VideoWidget payload={widget.payload} />;
      case 'youtube':
        return <YoutubeWidget payload={widget.payload} widgetId={widget.id} onUpdate={onUpdate} onDelete={onDelete} activeModuleId={activeModuleId as number} />;
      default:
        return (
          <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-xl flex items-center justify-between relative group shadow-sm">
             <div className="flex flex-col">
               <span className="font-bold text-sm tracking-tight">Unknown Course Widget Type: {widget?.widget_type}</span>
               <span className="text-xs text-red-400 mt-1 max-w-lg">This data payload could not be parsed by the Polymorphic Widget Renderer. Please delete it to maintain workspace integrity.</span>
             </div>
             {onDelete && (
                <button 
                  onClick={() => onDelete(widget.id)} 
                  className="px-4 py-2 bg-white text-red-600 border border-red-200 hover:bg-red-600 hover:text-white rounded-lg text-xs font-bold transition-all shadow-sm"
                >
                  Purge Data
                </button>
             )}
          </div>
        );
    }
  }

  if (domain === "resume") {
    return <div className="p-4 bg-yellow-100 text-yellow-800">Resume Widgets not yet implemented.</div>;
  }

  if (domain === "jd") {
    return <div className="p-4 bg-yellow-100 text-yellow-800">JD Widgets not yet implemented.</div>;
  }

  return <div className="p-4 bg-red-100 text-red-600">Invalid Domain specified in WidgetRenderer</div>;
}
