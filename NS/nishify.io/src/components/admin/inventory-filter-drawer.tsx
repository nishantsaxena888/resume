// D:\project\nishify\nishify.io\src\components\admin\inventory-filter-drawer.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";

type FilterFieldRaw = {
  label?: string;
  type?: string; // "enum","string","date","number","fk","bool"
  options?: Array<{ value?: any; label?: string }>;
  entity?: string; // for fk
  valueKey?: string;
  labelKey?: string;
};

type FilterSchema = Record<string, FilterFieldRaw>;

export type InventoryFilters = Record<
  string,
  | unknown
  | {
      op: "eq" | "ne" | "lt" | "lte" | "gt" | "gte" | "contains" | "in";
      value: unknown;
    }
>;

export default function InventoryFilterDrawer({
  onApply,
  onClose,
  initialValues,
}: {
  onApply: (filters: InventoryFilters) => void;
  onClose?: () => void;
  initialValues?: Record<string, any>;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [schema, setSchema] = useState<FilterSchema>({});
  const [values, setValues] = useState<Record<string, any>>(initialValues ?? {});
  const [fkOptions, setFkOptions] = useState<Record<string, Array<{ value: any; label: string }>>>({});
  const [error, setError] = useState<string | null>(null);

  // load filter metadata from backend
  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("http://localhost:8000/api/inventory_filter/");
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();

        // backend might return multiple shapes:
        // { filters: { key: { label, type... } } }  (preferred)
        // or { schema: [...] } or { schema: ENTITIES["item"]["options"]["schema"], ... }
        if (data.filters && typeof data.filters === "object") {
          if (!alive) return;
          setSchema(data.filters);
          return;
        }

        // fallback - try to derive from options.schema (list)
        if (Array.isArray(data.schema)) {
          const fs: FilterSchema = {};
          for (const f of data.schema) {
            if (!f || !f.name) continue;
            // try to detect filter fields that were intended as filters:
            // keep those that look like filters (common names)
            fs[f.name] = {
              label: f.ui?.label ?? f.label ?? f.name,
              type: (() => {
                if (f.kind === "enum") return "enum";
                if (f.kind === "date") return "date";
                if (f.kind === "bool") return "bool";
                if (f.kind === "fk" || f.ref) return "fk";
                if (f.kind === "number") return "number";
                return "string";
              })(),
              options: f.options ?? undefined,
              entity: f.ref?.entity ?? undefined,
            };
          }
          if (!alive) return;
          setSchema(fs);
          return;
        }

        // If server returned something else (items list etc) try to build minimal schema
        if (data.items && Array.isArray(data.items)) {
          // no explicit filters — create a few defaults
          const fs: FilterSchema = {
            in_stock: { label: "Stock Status", type: "enum", options: [{ value: "", label: "All" }, { value: "in", label: "In Stock" }, { value: "out", label: "Out of Stock" }] },
            item_code__contains: { label: "Item Code contains", type: "string" },
            upc_code__contains: { label: "UPC Contains", type: "string" },
          };
          if (!alive) return;
          setSchema(fs);
          return;
        }

        // unknown shape
        setSchema({});
      } catch (e: any) {
        setError(String(e?.message || e));
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  // when schema contains FK fields, pre-load options for each FK entity
  useEffect(() => {
    const fks = Object.entries(schema).filter(([, f]) => f.type === "fk" && f.entity);
    if (!fks.length) return;
    let alive = true;
    (async () => {
      const map: Record<string, Array<{ value: any; label: string }>> = {};
      for (const [key, f] of fks) {
        if (!f.entity) continue;
        try {
          const res = await fetch(`http://localhost:8000/api/${f.entity}/?page=1&size=500`);
          if (!res.ok) {
            // don't fail whole process because of one fk
            continue;
          }
          const d = await res.json();
          const list = Array.isArray(d.items) ? d.items : Array.isArray(d) ? d : [];
          map[key] = list.map((r: any) => ({
            value: r[f.valueKey ?? "id"],
            label: String(r[f.labelKey ?? "name"] ?? r[f.valueKey ?? "id"]),
          }));
        } catch {
          // ignore
        }
        if (!alive) return;
      }
      if (!alive) return;
      setFkOptions((prev) => ({ ...prev, ...map }));
    })();
    return () => {
      alive = false;
    };
  }, [schema]);

  // helper to update local form value
  function handleChange(key: string, rawVal: any) {
    setValues((p) => ({ ...(p || {}), [key]: rawVal }));
  }

  function handleReset() {
    setValues({});
    // call parent with empty
    onApply({});
  }

  function handleApply() {
    // Convert raw values into backend expected filter objects:
    // { key: { op: "eq", value: <v> } } (skip empty)
    const out: InventoryFilters = {};
    for (const [k, v] of Object.entries(values || {})) {
      if (v === null || v === undefined || v === "") continue;
      // special-case booleans: send eq true/false
      if (typeof v === "boolean") {
        out[k] = { op: "eq", value: v };
        continue;
      }
      // if it's an array (multi-select) -> op = in
      if (Array.isArray(v)) {
        out[k] = { op: "in", value: v };
        continue;
      }
      // string/date/number -> eq (for fields that end with __contains we use contains)
      if (k.endsWith("__contains")) {
        out[k] = { op: "contains", value: v };
      } else {
        out[k] = { op: "eq", value: v };
      }
    }

    onApply(out);
  }

  const renderedFields = useMemo(() => {
    return Object.entries(schema || {});
  }, [schema]);

  return (
    <div className="w-full max-w-md bg-white dark:bg-slate-900 shadow-lg p-4 rounded">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Inventory Filters</h3>
        <div className="flex gap-2">
          <button
            onClick={() => {
              handleReset();
              if (onClose) onClose();
            }}
            className="text-sm px-3 py-1 rounded border"
          >
            Reset
          </button>
          <button
            onClick={() => {
              if (onClose) onClose();
            }}
            className="text-sm px-3 py-1 rounded border"
          >
            Close
          </button>
        </div>
      </div>

      {loading && <div className="text-sm text-muted-foreground">Loading...</div>}
      {error && <div className="text-sm text-red-600">Error: {error}</div>}

      <div className="space-y-3 max-h-[60vh] overflow-auto pr-1">
        {renderedFields.length === 0 && !loading && <div className="text-sm text-muted-foreground">No filters available</div>}

        {renderedFields.map(([key, f]) => {
          const label = f.label ?? key;
          const v = (values || {})[key];

          if (f.type === "enum" || (f.options && Array.isArray(f.options))) {
            const opts = f.options ?? [];
            return (
              <div key={key} className="flex flex-col">
                <label className="text-sm font-medium mb-1">{label}</label>
                <select
                  className="border rounded px-2 py-1"
                  value={v ?? ""}
                  onChange={(e) => handleChange(key, e.target.value)}
                >
                  {/* ensure empty option */}
                  <option value="">{/* All */}All</option>
                  {opts.map((o: any, idx: number) => (
                    <option key={idx} value={o?.value ?? o?.label ?? String(idx)}>
                      {o?.label ?? o?.value ?? String(o)}
                    </option>
                  ))}
                </select>
              </div>
            );
          }

          if (f.type === "string") {
            return (
              <div key={key} className="flex flex-col">
                <label className="text-sm font-medium mb-1">{label}</label>
                <input
                  className="border rounded px-2 py-1"
                  value={v ?? ""}
                  onChange={(e) => handleChange(key, e.target.value)}
                />
              </div>
            );
          }

          if (f.type === "number") {
            return (
              <div key={key} className="flex flex-col">
                <label className="text-sm font-medium mb-1">{label}</label>
                <input
                  type="number"
                  className="border rounded px-2 py-1"
                  value={v ?? ""}
                  onChange={(e) => handleChange(key, e.target.value === "" ? "" : Number(e.target.value))}
                />
              </div>
            );
          }

          if (f.type === "date") {
            return (
              <div key={key} className="flex flex-col">
                <label className="text-sm font-medium mb-1">{label}</label>
                <input
                  type="date"
                  className="border rounded px-2 py-1"
                  value={v ?? ""}
                  onChange={(e) => handleChange(key, e.target.value)}
                />
              </div>
            );
          }

          if (f.type === "bool") {
            return (
              <div key={key} className="flex items-center gap-2">
                <input
                  id={key}
                  type="checkbox"
                  checked={Boolean(v)}
                  onChange={(e) => handleChange(key, e.target.checked)}
                />
                <label htmlFor={key} className="text-sm">
                  {label}
                </label>
              </div>
            );
          }

          if (f.type === "fk") {
            // options may be preloaded in fkOptions[key]
            const options = fkOptions[key] ?? [];
            return (
              <div key={key} className="flex flex-col">
                <label className="text-sm font-medium mb-1">{label}</label>
                <select
                  className="border rounded px-2 py-1"
                  value={v ?? ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    handleChange(key, val === "" ? "" : isNaN(Number(val)) ? val : Number(val));
                  }}
                >
                  <option value="">{/* All */}All</option>
                  {options.map((o) => (
                    <option key={String(o.value)} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                {!options.length && <div className="text-xs text-muted-foreground mt-1">No options loaded</div>}
              </div>
            );
          }

          // default fallback
          return (
            <div key={key} className="flex flex-col">
              <label className="text-sm font-medium mb-1">{label}</label>
              <input
                className="border rounded px-2 py-1"
                value={v ?? ""}
                onChange={(e) => handleChange(key, e.target.value)}
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={() => {
            handleReset();
          }}
          className="px-3 py-1 border rounded text-sm"
        >
          Reset
        </button>
        <button
          onClick={() => {
            handleApply();
            if (onClose) onClose();
          }}
          className="px-3 py-1 rounded bg-blue-600 text-white text-sm"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
