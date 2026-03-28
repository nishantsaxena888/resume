import { PlaySquare } from 'lucide-react';

export function VideoWidget({ payload }: { payload: any }) {
  return (
    <div className="bg-black rounded-xl shadow-sm overflow-hidden flex flex-col h-80 items-center justify-center relative group">
      <PlaySquare className="w-16 h-16 text-slate-400 group-hover:text-rose-500 transition-colors opacity-80" />
      <span className="mt-4 text-slate-300 font-medium">{payload.videoUrl || "Video missing"}</span>
    </div>
  );
}
