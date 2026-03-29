import { Terminal, Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PythonBasics_EcosystemPage() {
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
              <Shield className="w-10 h-10 print:w-8 print:h-8 text-blue-400" />
            </div>
            <div>
              <h1 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-5xl print:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                Python: Tooling Ecosystem
              </h1>
              <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl print:text-lg font-bold text-slate-500 mt-2">
                PyTest, Black, Environments, and Dependency Management
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2 print:gap-1">
            <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md text-sm border border-slate-300">PyTest</span>
            <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md text-sm border border-slate-300">Mocking</span>
            <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md text-sm border border-slate-300">Black</span>
            <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md text-sm border border-slate-300">Flake8</span>
            <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md text-sm border border-slate-300">Virtual Envs</span>
          </div>
        </div>

        {/* --- SECTION 1: AUTOMATED TESTING --- */}
        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300 flex items-center gap-3">
             1. Automated Testing (PyTest) & Mocking
          </h2>
          <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
            Senior engineers never write code without test coverage. <code>pytest</code> is the industry standard for executing tests, while <code>unittest.mock</code> is used to fake network/DB calls to prevent actual infrastructure mutation during CI/CD.
          </p>

          <div className="print:break-inside-avoid mb-8">
            <h3 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl font-bold text-slate-900 mt-6 mb-3">1. PyTest Fundamentals & Fixtures</h3>
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`import pytest

# Target function
def divide(a, b):
    if b == 0: raise ValueError("Cannot divide by zero")
    return a / b

# --- Standard Test ---
def test_divide_success():
    assert divide(10, 2) == 5

# --- Testing Exception Handling ---
def test_divide_by_zero():
    # PyTest explicitly traps the error. If it ISN'T raised, the test fails!
    with pytest.raises(ValueError, match="Cannot divide by zero"):
        divide(10, 0)

# --- PyTest Fixtures (Dependency Injection) ---
# Fixtures provide mock data that auto-injects into tests when requested.
@pytest.fixture
def mock_db_payload():
    return {"id": "U123", "status": "ACTIVE"}

def test_database_parsing(mock_db_payload):
    # PyTest automatically runs the fixture and passes the return value in!
    assert mock_db_payload["status"] == "ACTIVE"`}</code>
            </div>
            
            <h3 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl font-bold text-slate-900 mt-6 mb-3">2. Patching & Mocking (unittest.mock)</h3>
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`from unittest.mock import patch
import requests

def fetch_user_data(uid):
    response = requests.get(f"https://api.system.com/users/{uid}")
    return response.json()

# --- The Mock Boundary ---
# NEVER make real network calls in tests! Use @patch to intercept the HTTP request globally.
@patch("requests.get")
def test_fetch_user_data(mock_get):
    # 1. Provide fake return data
    mock_get.return_value.json.return_value = {"name": "Nishant"}
    
    # 2. Execute target function
    result = fetch_user_data("U1")
    
    # 3. Assert the result and strictly verify the network was called correctly!
    assert result["name"] == "Nishant"
    mock_get.assert_called_once_with("https://api.system.com/users/U1")`}</code>
            </div>
          </div>
        </div>

        {/* --- SECTION 2: PEP8 & FORMATTERS --- */}
        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300 flex items-center gap-3">
             2. Code Quality (Black, Flake8, Isort)
          </h2>
          <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
            Writing Python means strictly adhering to <strong>PEP8</strong> formatting standards. CI/CD pipelines will instantly reject code that violates these strict formatters.
          </p>

          <div className="print:break-inside-avoid mb-8">
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`# --- BLACK (The Uncompromising Formatter) ---
# Black enforces a strict 88-character line limit, double quotes, and exact spacing.
# You do not configure Black; you run it, and it rewrites your code perfectly.
$ black ./src

# --- FLAKE8 (The Strict Linter) ---
# Flake8 doesn't edit code, it scans it for unused variables, missing imports, and logic traps.
$ flake8 ./src
# Output: src/core.py:10:1: F401 'os' imported but unused

# --- ISORT (Import Sorting) ---
# Standardizes import blocks: Native Python -> 3rd Party -> Local modules
$ isort ./src`}</code>
            </div>
          </div>
        </div>

        {/* --- SECTION 3: DEPENDENCY MANAGEMENT --- */}
        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300 flex items-center gap-3">
             3. Virtual Environments & Deployment
          </h2>
          <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
            Installing global pip packages is a catastrophic mistake that destroys server architecture. All projects must run inside isolated <strong>Virtual Environments</strong>.
          </p>

          <div className="print:break-inside-avoid mb-8">
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`# --- Standard venv ---
# 1. Create a walled-garden sandbox folder named '.venv'
$ python3 -m venv .venv

# 2. Activate the boundary (Terminal prompt changes)
$ source .venv/bin/activate

# 3. Safely install packages 
(venv) $ pip install requests pytest

# 4. Freeze exact payload for Git
(venv) $ pip freeze > requirements.txt

# --- Modern Alternative: Poetry ---
# Industry standard for managing dependencies cleanly without raw pip
$ poetry init          # Creates pyproject.toml
$ poetry add requests  # Installs and implicitly locks dependencies
$ poetry run pytest    # Executes tests inside the locked environment`}</code>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
