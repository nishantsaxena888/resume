import { Terminal, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PythonBasics_ExceptionsPage() {
  return (
    <div className="min-h-screen bg-slate-100 font-sans print:bg-white print:m-0 print:p-0">
      <div className="max-w-5xl w-full mx-auto p-8 print:px-0 print:py-4 bg-white shadow-xl print:shadow-none min-h-screen relative border border-slate-200 print:border-none">
        
        <div className="mb-4">
          <Link to="/static-notes/python-basics" className="print:hidden flex items-center gap-2 text-blue-600 hover:text-blue-800 font-bold mb-8 transition-colors z-50 relative">
            <ArrowLeft className="w-5 h-5" /> Back to Python 101 Hub
          </Link>
        </div>

        <div className="mb-12 print:mb-8 border-b-4 border-slate-900 pb-8 print:pb-4 relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 print:w-12 print:h-12 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3 print:rotate-0">
              <Terminal className="w-10 h-10 print:w-8 print:h-8 text-blue-400" />
            </div>
            <div>
              <h1 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-5xl print:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                Python: Exception Engineering
              </h1>
              <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl print:text-lg font-bold text-slate-500 mt-2">
                Try Blocks, Custom Tracebacks, and Safe Teardowns
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2 print:gap-1">
            <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md text-sm border border-slate-300">Try / Except</span>\n            <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md text-sm border border-slate-300">Finally</span>\n            <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md text-sm border border-slate-300">Else</span>\n            <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md text-sm border border-slate-300">Custom Exceptions</span>\n            <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md text-sm border border-slate-300">Logging</span>
          </div>
        </div>

{/* --- SECTION 8: EXCEPTION ENGINEERING --- */}
        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300 flex items-center gap-3">
             8. Exception Hierarchy & Error Throwing
          </h2>
          <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
            Senior backend systems do not silently fail. You must explicitly catch specific exceptions (never a naked <code>except:</code>), execute <code>finally</code> teardowns to release DB connection pools, and construct Custom Domain Exceptions.
          </p>

          <div className="print:break-inside-avoid mb-8">
            <h3 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl font-bold text-slate-900 mt-6 mb-3">Trapping the Traceback</h3>
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`import logging

# 1. Custom Exception Architecture
class DatabaseTimeoutError(Exception):
    """Raised when Postgres drops the connection pool."""
    pass

# 2. Try / Except / Else / Finally
def execute_query():
    try:
        data = fetch_postgres_data()
        
    except ConnectionError as e:
        # 1. Catch the exact specific standard exception
        logging.error(f"Network failure: {e}")
        
    except DatabaseTimeoutError as e:
        # 2. Catch our Custom Domain Exception
        logging.error("DB Query exceeded 5000ms")
        
    except Exception as e:
        # 3. The universal fallback catch
        # You MUST log the stack trace. NEVER write a naked 'except:'
        logging.critical(f"Unknown Fatal Error: {e}", exc_info=True)
        # Re-raise the exact same exception to crash the system pod.
        raise  

    else:
        # 4. EXCECUTED ONLY IF TRY WAS 100% SUCCESSFUL
        # If an except block triggered, this is completely skipped!
        print("Query successful, committing data...")

    finally:
        # 5. GUARANTEED EXECUTION
        # Runs even if 'return' was called inside 'try', or if 'raise' panicked!
        # Mandatory for closing DB cursors and network sockets to prevent Memory Leaks.
        close_connection_pool()`}</code>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
