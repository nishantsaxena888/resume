import React from 'react';
import { FileText, HelpCircle, Code, PlaySquare, Youtube } from 'lucide-react';

export function PrepNoteWidget({ payload }: { payload: any }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-80">
      <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
        <FileText className="w-4 h-4 text-blue-500"/>
        <span className="text-sm font-bold text-slate-700">{payload.title || "Study Note"}</span>
      </div>
      <div className="p-5 overflow-y-auto prose prose-sm text-slate-600 flex-1 whitespace-pre-line">
        {payload.content || "Empty content payload."}
      </div>
    </div>
  );
}

export function PrepFlashcardWidget({ payload }: { payload: any }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-80 group cursor-pointer hover:border-rose-300 transition-colors relative">
      <div className="absolute inset-0 bg-rose-50/50 opacity-0 group-hover:opacity-100 transition duration-300 -z-0"></div>
      <div className="p-8 flex items-center justify-center flex-1 text-center relative z-10">
        <div>
          <h4 className="text-slate-400 font-bold uppercase text-xs tracking-widest mb-3">Flashcard Front</h4>
          <p className="font-semibold text-lg text-slate-800 group-hover:text-rose-900 transition">{payload.question || "Unknown Question"}</p>
        </div>
      </div>
      <div className="px-4 py-3 border-t border-slate-100 bg-slate-50 flex justify-between items-center relative z-10">
        <span className="text-xs text-slate-500 font-medium">Click to flip: {payload.answer || "Unknown Answer"}</span>
        <HelpCircle className="w-4 h-4 text-slate-400"/>
      </div>
    </div>
  );
}

export function PrepCodeWidget({ payload }: { payload: any }) {
  return (
    <div className="bg-slate-900 rounded-xl shadow-sm overflow-hidden flex flex-col h-80">
      <div className="px-4 py-3 border-b border-slate-700 bg-slate-800 flex items-center gap-2">
        <Code className="w-4 h-4 text-emerald-400"/>
        <span className="text-sm font-bold text-slate-200">{payload.language || "code"}</span>
      </div>
      <div className="p-5 overflow-y-auto font-mono text-sm text-emerald-300 flex-1 whitespace-pre">
        {payload.snippet || "// write some code"}
      </div>
    </div>
  );
}

export function PrepVideoWidget({ payload }: { payload: any }) {
  return (
    <div className="bg-black rounded-xl shadow-sm overflow-hidden flex flex-col h-80 items-center justify-center relative group">
      <PlaySquare className="w-16 h-16 text-slate-400 group-hover:text-rose-500 transition-colors opacity-80" />
      <span className="mt-4 text-slate-300 font-medium">{payload.videoUrl || "Video missing"}</span>
    </div>
  );
}

export function PrepYouTubeWidget({ payload }: { payload: any }) {
  // Extract video ID and playlist ID dynamically from raw user YouTube links
  let videoId = '';
  let listId = '';
  
  try {
    const urlObj = new URL(payload.url || '');
    if (urlObj.hostname.includes('youtube.com')) {
      videoId = urlObj.searchParams.get('v') || '';
      listId = urlObj.searchParams.get('list') || '';
    } else if (urlObj.hostname.includes('youtu.be')) {
      videoId = urlObj.pathname.slice(1);
    }
  } catch (e) {
    // Fallback if not a clean URL
  }

  let embedUrl = '';
  if (videoId && listId) {
    embedUrl = `https://www.youtube.com/embed/${videoId}?listType=playlist&list=${listId}`;
  } else if (videoId) {
    embedUrl = `https://www.youtube.com/embed/${videoId}`;
  } else if (listId) {
    embedUrl = `https://www.youtube.com/embed/videoseries?list=${listId}`;
  }

  return (
    <div className="bg-slate-900 rounded-xl shadow-sm overflow-hidden flex flex-col h-96 group relative border border-slate-800">
      <div className="px-4 py-3 border-b border-slate-800 bg-slate-900 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <Youtube className="w-5 h-5 text-rose-500" />
          <span className="text-sm font-bold text-slate-200 line-clamp-1">{payload.title || "Video Lecture"}</span>
        </div>
      </div>
      <div className="flex-1 w-full bg-black relative">
        {embedUrl ? (
          <iframe 
            src={embedUrl} 
            title={payload.title || "YouTube video player"} 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            className="w-full h-full absolute inset-0"
          ></iframe>
        ) : (
          <div className="flex items-center justify-center h-full text-slate-500 text-sm font-medium">
            Invalid YouTube URL provided
          </div>
        )}
      </div>
    </div>
  );
}
