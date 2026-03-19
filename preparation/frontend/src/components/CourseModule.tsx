import { BookOpen } from 'lucide-react';

export default function CourseModule() {
  return (
    <div className="glass flex-1 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
       <div className="p-4 bg-accent/20 rounded-full mb-6">
         <BookOpen className="w-12 h-12 text-accent" />
       </div>
       <h2 className="text-3xl font-bold mb-4">Interactive Learning Modules</h2>
       <p className="text-textSecondary max-w-lg mb-8">
         Dynamic preparation courses mapped directly to the skills on your resume. We will implement React hooks to track your progress and render interactive HTML course materials here.
       </p>
       <button className="px-6 py-3 bg-accent hover:bg-accent/80 transition-colors text-white font-semibold rounded-xl shadow-lg shadow-accent/20">
         Start First Module
       </button>
    </div>
  );
}
