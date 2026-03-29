import { useState, useEffect, useRef, useCallback } from 'react';
import { FileText, Camera, Trash2, Maximize, Minimize, Sparkles, Youtube, Loader2 } from 'lucide-react';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export function YoutubeWidget({ payload, widgetId, onUpdate, onDelete, activeModuleId }: { payload: any, widgetId?: number, onUpdate?: (id: number, p: any) => void, onDelete?: (id: number) => void, activeModuleId?: number }) {
  const [isEditing, setIsEditing] = useState(!payload.url);
  const [url, setUrl] = useState(payload.url || "");
  const [title, setTitle] = useState(payload.title || "");

  const save = () => {
    if (onUpdate && widgetId) onUpdate(widgetId, { ...payload, title, url });
    setIsEditing(false);
  };

  type TimelineNode = { type: 'text' | 'image', timestamp: number, content: string };
  const [timeline, setTimeline] = useState<TimelineNode[] | null>(payload.timeline || null);
  const [isTimelineHidden, setIsTimelineHidden] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isGeneratingNotes, setIsGeneratingNotes] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmDeleteTimeline, setConfirmDeleteTimeline] = useState(false);
  const [deleteSnapshotId, setDeleteSnapshotId] = useState<number | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<any>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

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
    embedUrl = `https://www.youtube.com/embed/${videoId}?listType=playlist&list=${listId}&enablejsapi=1&fs=0`;
  } else if (videoId) {
    embedUrl = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&fs=0`;
  } else if (listId) {
    embedUrl = `https://www.youtube.com/embed/videoseries?list=${listId}&enablejsapi=1&fs=0`;
  }

  // Load YouTube IFrame API to dynamically hook cross-origin timestamp extraction
  useEffect(() => {
    if (!embedUrl) return;

    const initPlayer = () => {
      if (iframeRef.current && window.YT && window.YT.Player && !playerRef.current) {
        playerRef.current = new window.YT.Player(iframeRef.current, {
           events: {
             onReady: () => console.log("Native YouTube OS SDK perfectly mapped to React layer.")
           }
        });
      }
    };

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = initPlayer;
    } else {
      initPlayer();
    }
  }, [embedUrl]);

  const captureFrame = useCallback(async (timestampOrEvent?: number | any) => {
    let currentTime = typeof timestampOrEvent === 'number' ? timestampOrEvent : undefined;
    if (currentTime === undefined) {
      if (!videoId || !playerRef.current || !playerRef.current.getCurrentTime) {
        setError("Waiting for Native YouTube Extractor to map internally. Try again in 2 seconds.");
        return;
      }
      currentTime = playerRef.current.getCurrentTime() as number;
    }
    const safeTime = currentTime as number;
    setIsCapturing(true);
    setError(null);
    try {
      const res = await fetch(`/api/v1/youtube/capture?video_id=${videoId}&timestamp=${safeTime}`);
      const data = await res.json();
      if (data.success && data.image) {
        const existingList = timeline || [];
        const duplicateIndex = existingList.findIndex(n => n.type === 'image' && Math.floor(n.timestamp) === Math.floor(safeTime));
        
        let newList = [...existingList];
        if (duplicateIndex >= 0) {
          newList[duplicateIndex] = { type: 'image', timestamp: safeTime, content: data.image };
        } else {
          newList.push({ type: 'image', timestamp: safeTime, content: data.image });
        }
        newList.sort((a,b) => a.timestamp - b.timestamp);
        
        setTimeline(newList);
        if (onUpdate && widgetId) {
          onUpdate(widgetId, { ...payload, timeline: newList });
        }
      } else {
        setError(data.error || "Capture engine completely failed to rip frame bytes.");
      }
    } catch (e: any) {
      setError("Python extractor hardware error: " + e.message);
    } finally {
      setIsCapturing(false);
    }
  }, [videoId, timeline, onUpdate, widgetId, payload]);
  
  const generateAiNotes = async () => {
    if (!widgetId || !activeModuleId) {
      setError("Cannot generate AI Notes natively without a fully bound Module ID.");
      return;
    }
    setIsGeneratingNotes(true);
    setError("Initiating autonomous AI Agent... This may take up to 45 seconds to synthesize semantic context and extract FFmpeg frames.");
    try {
      const res = await fetch(`/api/v1/youtube/generate_notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ widget_id: widgetId, module_id: activeModuleId })
      });
      const data = await res.json();
      if (data.success && data.widget) {
         window.location.reload();
      } else {
         setError(data.detail || data.error || "Failed to generate autonomous notes.");
      }
    } catch (err: any) {
      setError("Network or Timeout error: " + err.message);
    } finally {
      setIsGeneratingNotes(false);
    }
  };

  // Add Keyboard Shortcut mapping
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;
      
      if (e.shiftKey && e.code === 'KeyS' && timeline) {
        e.preventDefault();
        captureFrame();
        return;
      }

      if (e.code === 'ArrowRight' && playerRef.current && playerRef.current.getCurrentTime && isFullscreen) {
        playerRef.current.seekTo(playerRef.current.getCurrentTime() + 5, true);
      }
      
      if (e.code === 'ArrowLeft' && playerRef.current && playerRef.current.getCurrentTime && isFullscreen) {
        playerRef.current.seekTo(playerRef.current.getCurrentTime() - 5, true);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [captureFrame, timeline, isFullscreen]);

  // Track Fullscreen state natively
  useEffect(() => {
    const onFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      widgetRef.current?.requestFullscreen().catch(err => {
        setError(`Fullscreen error: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const deleteSnapshot = (timestamp: number, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (deleteSnapshotId === timestamp) {
      const existingList = timeline || [];
      const newList = existingList.filter(n => !(n.type === 'image' && n.timestamp === timestamp));
      
      setTimeline(newList);
      setDeleteSnapshotId(null);
      if (onUpdate && widgetId) {
        onUpdate(widgetId, { ...payload, timeline: newList.length > 0 ? newList : null });
      }
    } else {
      // First click arms the deletion state
      setDeleteSnapshotId(timestamp);
      // Disarm after 3 seconds if not confirmed
      setTimeout(() => {
        setDeleteSnapshotId(current => current === timestamp ? null : current);
      }, 3000);
    }
  };

  const fetchTranscript = async () => {
    if (!videoId) {
      setError("Cannot extract transcript from a playlist URL without a specific video ID.");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/v1/youtube/transcript?video_id=${videoId}`);
      const data = await res.json();
      if (data.success) {
        const newNodes = data.nodes.map((n: any) => ({ type: n.type, timestamp: n.timestamp, content: n.text }));
        setTimeline(newNodes);
        if (onUpdate && widgetId) onUpdate(widgetId, { ...payload, timeline: newNodes });
      } else {
        setError(data.error || "Failed to extract subtitles. Video may have captions disabled.");
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isEditing) {
    const isUrlValid = (testUrl: string) => {
      try {
        const urlObj = new URL(testUrl);
        return urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be');
      } catch {
        return false;
      }
    };
    const canSave = title.trim().length > 0 && isUrlValid(url);

    return (
      <div className="bg-slate-900 rounded-xl shadow-lg border border-indigo-500 overflow-hidden flex flex-col h-80 p-6 relative z-30">
        <h3 className="text-white font-bold text-sm mb-3 flex flex-col gap-1">Configure Media Tunnel</h3>
        
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Stream Display Title <span className="text-rose-500">*</span></label>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Required: AWS Practitioner Guide..." className="bg-slate-800 border-b border-slate-700 text-white p-2 text-sm focus:outline-none focus:border-rose-500 rounded font-bold mb-4 w-full" />
        
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Source URL <span className="text-rose-500">*</span></label>
        <input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://youtube.com/watch?v=..." className="bg-slate-800 border border-slate-700 text-emerald-400 p-3 text-sm focus:outline-none focus:border-rose-500 rounded-lg font-mono text-xs shadow-inner w-full" />
        {url && !isUrlValid(url) && (
           <span className="text-rose-500 text-[10px] uppercase tracking-wider font-bold mt-2 flex items-center gap-1"><Sparkles className="w-3 h-3" /> Warning: Unrecognized YouTube Hostname</span>
        )}
        
        <div className="flex justify-end gap-3 mt-auto shrink-0 border-t border-slate-800 pt-4">
          <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-xs text-slate-400 font-bold hover:bg-slate-800 hover:text-white rounded-lg transition-colors">Abort Override</button>
          <button onClick={save} disabled={!canSave} className={`px-4 py-2 text-xs text-white font-bold shadow rounded-lg transition-all ${canSave ? 'bg-rose-600 hover:bg-rose-500 border border-rose-700 hover:scale-105' : 'bg-slate-800 text-slate-500 border border-slate-700 opacity-50 cursor-not-allowed grayscale'}`}>Initialize Matrix</button>
        </div>
      </div>
    );
  }

  return (
    <div ref={widgetRef} className={`bg-slate-900 shadow-sm flex flex-col group relative transition-all duration-300 hover:shadow-lg ${isFullscreen && timeline ? 'h-screen w-screen z-[9999] rounded-none overflow-hidden' : 'min-h-[450px] h-auto rounded-xl overflow-hidden border border-slate-800 hover:border-slate-600'}`}>
      
      {onUpdate && (
         <button onClick={() => setIsEditing(true)} className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded flex items-center gap-1 text-[10px] font-bold z-20 uppercase tracking-widest backdrop-blur shadow border border-slate-700">
           Edit Stream
         </button>
      )}
      {onDelete && widgetId && (
         <button onClick={() => onDelete(widgetId)} className="absolute top-2.5 right-28 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 bg-rose-900/50 hover:bg-rose-800 text-rose-400 rounded flex items-center gap-1 text-[10px] font-bold z-20 uppercase tracking-widest backdrop-blur shadow border border-rose-800/50" title="Delete YouTube Widget">
           <Trash2 className="w-3.5 h-3.5" />
         </button>
      )}

      <div className="px-4 py-3 border-b border-slate-800 bg-slate-900 flex flex-wrap items-center justify-between gap-3 z-10 shrink-0 pr-28">
        <div className="flex items-center gap-2 shrink-0">
          <Youtube className="w-5 h-5 text-rose-500 shrink-0" />
          <span className="text-sm font-bold text-slate-200 line-clamp-1">{payload.title || "Video Lecture"}</span>
        </div>
        {(videoId) && (
           <div className="flex flex-wrap items-center gap-2 shrink-0">
             <button
               onClick={generateAiNotes}
               disabled={isGeneratingNotes}
               title="Autonomously generate or regenerate AI Curriculum notes from the Video Transcript"
               className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 focus:outline-none transition-colors text-xs font-bold text-white shadow shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed group whitespace-nowrap"
             >
               {isGeneratingNotes ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
               <span className="hidden sm:inline">{isGeneratingNotes ? "AI Analyzing..." : (payload.has_notes ? "Regenerate AI Notes" : "Make notes by Gemini")}</span>
             </button>
             <button 
               onClick={captureFrame}
               disabled={!timeline || isCapturing}
               title={!timeline ? "Extract Timeline first" : "Capture Video Frame"}
               className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-900/50 border border-emerald-800/50 hover:bg-emerald-800/70 focus:outline-none transition-colors text-xs font-bold text-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed group"
             >
               {isCapturing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Camera className="w-3.5 h-3.5" />}
               Snapshot
             </button>
             <button onClick={toggleFullScreen} className="flex items-center justify-center p-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 focus:outline-none transition-colors text-slate-300 shrink-0" title="Toggle Theater Mode">
               {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
             </button>
              {timeline ? (
                <div className="flex items-center gap-2 shrink-0">
                  {confirmDeleteTimeline ? (
                    <button 
                      onClick={() => {
                        setTimeline(null);
                        setIsTimelineHidden(false);
                        setConfirmDeleteTimeline(false);
                        if (onUpdate && widgetId) onUpdate(widgetId, { ...payload, timeline: null });
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 focus:ring-2 focus:ring-rose-500 focus:outline-none transition-colors text-xs font-bold text-white shadow-lg animate-pulse whitespace-nowrap"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Yes, Delete
                    </button>
                  ) : (
                    <button 
                      onClick={() => setConfirmDeleteTimeline(true)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/50 border border-rose-900/50 hover:bg-rose-900/80 focus:ring-2 focus:ring-rose-600 focus:outline-none transition-colors text-xs font-bold text-rose-400 border-dashed whitespace-nowrap"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete Timeline
                    </button>
                  )}
                  <button 
                    onClick={() => setIsTimelineHidden(!isTimelineHidden)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 focus:ring-2 focus:ring-slate-600 focus:outline-none transition-colors text-xs font-bold text-slate-300 whitespace-nowrap"
                  >
                    <FileText className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span>{isTimelineHidden ? "Show Timeline" : "Hide Timeline"}</span>
                  </button>
                </div>
              ) : (
                <button 
                  onClick={fetchTranscript}
                  disabled={isLoading}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 focus:ring-2 focus:ring-slate-600 focus:outline-none transition-colors text-xs font-bold text-slate-300"
                >
                  {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-400" /> : <FileText className="w-3.5 h-3.5 text-indigo-400" />}
                  Save Transcript
                </button>
              )}
           </div>
        )}
      </div>

      <div className={`flex flex-1 ${isFullscreen && timeline ? 'flex-col lg:flex-row overflow-hidden' : 'flex-col min-h-0'}`}>
        <div className={`bg-black relative ${isFullscreen && timeline ? 'flex-1 min-h-[40vh] lg:min-h-0' : 'w-full h-[450px] shrink-0 shadow-xl z-20'}`}>
          {embedUrl ? (
            <iframe 
              ref={iframeRef}
              src={embedUrl} 
              title={payload.title || "YouTube video player"} 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="w-full h-full absolute inset-0"
            ></iframe>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-500 text-sm font-medium p-6 text-center">
              <span className="mb-2">Invalid YouTube URL provided</span>
              <span className="text-xs text-slate-600 break-all">{payload.url}</span>
            </div>
          )}
        </div>

        {error && (
          <div className="p-3 bg-red-950/30 text-rose-400 text-xs border-y border-rose-900/50 shrink-0 z-30">
             {error}
          </div>
        )}

        {!isTimelineHidden && timeline && (
          <div className={`bg-slate-950 relative ${isFullscreen ? 'overflow-y-auto custom-scrollbar w-full lg:w-[450px] xl:w-[600px] shrink-0 border-t lg:border-t-0 lg:border-l border-slate-800 p-8 h-full' : 'w-full max-h-[600px] overflow-y-auto custom-scrollbar border-t border-slate-800 p-6 sm:p-8 xl:p-10'}`}>
             <div className="sticky top-0 bg-slate-950/90 backdrop-blur-sm z-10 pb-4 mb-6 border-b border-slate-800 flex justify-between items-center">
             <h4 className="text-slate-500 text-[10px] sm:text-xs font-black uppercase tracking-widest">Extracted Intelligence Timeline</h4>
             <button onClick={() => setIsTimelineHidden(true)} className="text-xs font-bold text-slate-500 hover:text-slate-300">Close</button>
           </div>
           
           <div className="relative border-l-2 border-slate-800 ml-4 md:ml-8 pl-6 md:pl-8 space-y-4 pb-16">
             {timeline.reduce((acc: any[], node: TimelineNode) => {
               if (node.type === 'image') {
                 const last = acc[acc.length - 1];
                 if (last && last.type === 'image_group') {
                   last.images.push(node);
                   return acc;
                 } else {
                   acc.push({ type: 'image_group', timestamp: node.timestamp, images: [node] });
                   return acc;
                 }
               }
               acc.push(node);
               return acc;
             }, []).map((node: any, i: number) => (
                 <div 
                  key={`${node.timestamp}-${i}`} 
                  className="relative group/node transition-opacity flex gap-4 md:gap-6 items-start"
                >
                  <div className={`absolute -left-[29px] md:-left-[37px] top-1.5 w-3 h-3 rounded-full border-2 transition-transform group-hover/node:scale-125 ${node.type === 'image_group' ? 'bg-emerald-500 border-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-slate-800 border-indigo-500'}`} />
                  
                  {/* Immutable Timestamp Sidebar (Unselectable for clean copying) */}
                  <div className="w-14 md:w-16 shrink-0 flex flex-col items-start gap-1.5 pt-0.5 select-none">
                    <div className={`text-[9px] md:text-[10px] font-mono tracking-tighter cursor-pointer hover:underline opacity-50 hover:opacity-100 transition-opacity ${node.type === 'image_group' ? 'text-emerald-500' : 'text-slate-400'}`} onClick={() => playerRef.current?.seekTo?.(node.timestamp, true)}>
                       {new Date(node.timestamp * 1000).toISOString().substr(14, 9)}
                    </div>
                    {node.type !== 'image_group' && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          captureFrame(node.timestamp);
                        }}
                        disabled={isCapturing}
                        className="opacity-0 group-hover/node:opacity-100 transition-opacity flex items-center gap-1.5 px-1.5 py-0.5 bg-emerald-950/30 hover:bg-emerald-600 rounded text-emerald-500 hover:text-white border border-emerald-900/30"
                        title="Extract high-res frame at this exact timestamp silently"
                      >
                        <Camera className="w-3 h-3 shrink-0" />
                        <span className="text-[8px] font-bold uppercase tracking-wider hidden md:block">Snap</span>
                      </button>
                    )}
                  </div>
                  
                  {/* Selectable Contiguous Content Area */}
                  <div className="flex-1 w-full min-w-0">
                    {node.type === 'image_group' ? (
                       <div className={`grid gap-4 my-2 max-w-2xl ${node.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                         {node.images.map((img: TimelineNode, idx: number) => (
                           <div key={idx} onClick={() => playerRef.current?.seekTo?.(img.timestamp, true)} className="group/snap relative rounded-xl overflow-hidden border border-slate-700 shadow-xl bg-black cursor-pointer hover:border-emerald-500 transition-all hover:scale-[1.03] hover:z-40 z-30 duration-300">
                             <img src={img.content} alt={`Snapshot at ${img.timestamp}s`} className="w-full h-auto object-contain select-none" />
                             <button onClick={(e) => deleteSnapshot(img.timestamp, e)} className={`absolute top-3 right-3 p-2 rounded-lg text-white transition-all backdrop-blur shadow-xl border border-white/10 z-50 pointer-events-auto ${deleteSnapshotId === img.timestamp ? 'bg-rose-600 scale-110 opacity-100 flex items-center justify-center' : 'bg-black/60 hover:bg-rose-600 opacity-0 group-hover/snap:opacity-100 hover:scale-110'}`}>
                               {deleteSnapshotId === img.timestamp ? <span className="text-[10px] font-black px-1 uppercase tracking-widest">Confirm</span> : <Trash2 className="w-4 h-4" />}
                             </button>
                           </div>
                         ))}
                       </div>
                    ) : (
                       <p 
                         onClick={() => {
                           if (window.getSelection()?.toString().length === 0) {
                             playerRef.current?.seekTo?.(node.timestamp, true);
                           }
                         }} 
                         className="text-slate-300 text-[15px] leading-relaxed hover:text-white transition-colors cursor-text selection:bg-indigo-500/30 break-words"
                       >
                         {node.content}
                       </p>
                    )}
                  </div>
                </div>
            ))}
           </div>
         </div>
        )}
      </div>
    </div>
  );
}
