import { Terminal, Database, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PythonBasics_PandasPage() {
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
              <Database className="w-10 h-10 print:w-8 print:h-8 text-blue-400" />
            </div>
            <div>
              <h1 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-5xl print:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                Python: Pandas Architecture
              </h1>
              <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl print:text-lg font-bold text-slate-500 mt-2">
                DataFrames, Vectorization, GroupBy, and Data Joining
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2 print:gap-1">
            <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md text-sm border border-slate-300">DataFrames & Series</span>
            <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md text-sm border border-slate-300">Vectorization</span>
            <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md text-sm border border-slate-300">Data Cleaning (NaNs)</span>
            <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md text-sm border border-slate-300">Aggregations</span>
            <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md text-sm border border-slate-300">Merges / Joins</span>
          </div>
        </div>

        {/* --- SECTION 1: THE DATAFRAME ENGINE --- */}
        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300 flex items-center gap-3">
             1. The DataFrame Engine & Vectorization
          </h2>
          <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
            A DataFrame is essentially a high-performance, tabular matrix driven by a <code>C</code> backend (NumPy). You should NEVER use <code>for</code> loops across a DataFrame; always use vectorized scalar equations.
          </p>

          <div className="print:break-inside-avoid mb-8">
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`import pandas as pd

# --- Instantiation & IO ---
df = pd.read_csv("policies.csv")             # Loads 1 million rows instantly
df = pd.DataFrame({"id": [1, 2], "val": [10, 20]}) # Manual creation

# --- Exploratory Inspection ---
df.head(5)                 # Views the first 5 records
df.info()                  # Prints extreme memory usage and Dtypes (CRITICAL)
df.describe()              # Mathematical summary (mean, std, min, max)
df.shape                   # (100000, 2) -> (Rows, Columns) Tuple
df.columns                 # Index(['id', 'val'], dtype='object')

# --- TRUE Vectorization (Why Pandas is fast) ---
# FATAL MISTAKE: Iterating a DataFrame row-by-row
# for idx, row in df.iterrows():
#     row["val"] = row["val"] * 2  # Exceptionally slow!

# SENIOR ENGINEERING: Vectorized Math
# Multiplies all 1-million rows instantly in C-layer RAM
df["val"] = df["val"] * 2  

# Assigning a brand new column atomically
df["premium"] = df["val"] + 50`}</code>
            </div>
          </div>
        </div>

        {/* --- SECTION 2: EXTRACTIONS & CLEANING --- */}
        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300 flex items-center gap-3">
             2. Data Cleaning & Index Slicing
          </h2>
          <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
            Data Engineering is 90% cleaning null architectures. Pandas uses <code>loc</code> and <code>iloc</code> for strict algorithmic slicing.
          </p>

          <div className="print:break-inside-avoid mb-8">
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`# --- Filtering & Slicing (loc vs iloc) ---
df.iloc[0:5]               # Integer Slicing: Grabs first 5 absolute rows
df.loc[df["id"] == 1]      # Logical Slicing: Grabs rows where ID matches
df.loc[(df["val"] > 10) & (df["id"] < 5)] # Multiple Conditions (MUST use & in Pandas, not 'and')

# --- Resolving NaNs (Null Values) ---
df.isna().sum()            # Counts exactly how many nulls exist per column.
df.dropna()                # Completely destroys any row containing a Null.
df.fillna(0)               # Fills all Nulls with a baseline integer.
df["val"] = df["val"].fillna(df["val"].mean()) # Fills nulls with column average.

# --- Global Deduplication ---
df.drop_duplicates(subset=["id"], keep="first", inplace=True)`}</code>
            </div>
          </div>
        </div>

        {/* --- SECTION 3: GROUPBY & AGGREGATIONS --- */}
        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300 flex items-center gap-3">
             3. The Algorithm: GroupBy & Aggregation
          </h2>
          <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
            <code>GroupBy</code> simulates the exact behavior of SQL <code>GROUP BY</code>, allowing for complex categorical math reductions across millions of rows instantly.
          </p>

          <div className="print:break-inside-avoid mb-8">
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`df = pd.DataFrame({
    "department": ["IT", "IT", "HR"],
    "salary": [100, 150, 90]
})

# Standard mean grouping
df.groupby("department")["salary"].mean()
# IT    125.0
# HR     90.0

# --- Complex Multi-Aggregations ---
agg_stats = df.groupby("department").agg({
    "salary": ["mean", "sum", "count"]
})

# Flattening the MultiIndex columns back to normal strings
agg_stats.columns = ["mean_sal", "total_sal", "headcount"]
agg_stats.reset_index(inplace=True)`}</code>
            </div>
          </div>
        </div>

        {/* --- SECTION 4: DATABASES & JOINS --- */}
        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300 flex items-center gap-3">
             4. Relational Math: Merges & Joins
          </h2>
          <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
            Merging dataframes is mathematically equivalent to SQL Joins, uniting isolated tables via shared primary keys.
          </p>

          <div className="print:break-inside-avoid mb-8">
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`df_users = pd.DataFrame({"uid": [1, 2], "name": ["Nishant", "John"]})
df_sales = pd.DataFrame({"uid": [1, 1], "amount": [500, 200]})

# --- Left Join ---
# Keeps ALL users, whether they have sales or not.
merged = pd.merge(df_users, df_sales, on="uid", how="left")
# Expected: Nishant has 2 rows (500, 200). John has 1 row (amount = NaN)

# --- Inner Join ---
# STRICT matching! Drops John completely because he has no sales.
matched = pd.merge(df_users, df_sales, on="uid", how="inner")

# --- Concatenations (Union All) ---
# Stacks two identical dataframes vertically (row upon row)
df_all = pd.concat([df_users, df_users], ignore_index=True)`}</code>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
