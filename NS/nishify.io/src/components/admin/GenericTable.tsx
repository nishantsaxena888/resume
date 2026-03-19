// PATH: components/GenericTable.tsx
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useEntityList } from "@/hooks/use-entity-crud";
import { useEntityOptions, useRefOptions, useEntity } from "@/hooks";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  EditIcon,
  Trash2Icon,
  PlusCircle,
  Columns3,
  SearchIcon,
  FileSpreadsheetIcon,
  SaveIcon,
  XIcon,
  InfoIcon,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConfirmDialog } from "@/hooks/use-confirm-dialog";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

/* ---- controls reused from Form ---- */
import { DatePicker } from "@/components/ui/date-picker";
import { DocumentUpload } from "@/components/ui/document-upload";
import {
  DocumentGalleryUpload,
  array_file_conversion,
} from "@/components/ui/document-gallery-upload";
import { GoogleAddress } from "@/components/ui/google-address";
import { EditorInput } from "@/components/ui/editor-input";
import { ArrayInput, type InputArrayType } from "@/components/ui/array-input";
import { MultiSelect } from "@/components/ui/multi-select";

/* ---------- Inline field control ---------- */
function InlineFieldControl({
  field,
  value,
  onChange,
  setOtherField,
}: {
  field: any;
  value: any;
  onChange: (v: any) => void;
  setOtherField?: (k: string, val: any) => void;
}) {
  const { kind, options, ref, ui } = field || {};
  const invalidCls = "";
  const hInput = "h-9";
  const pxInput = "px-3";

  if (ui?.input === "google_address") {
    return (
      <GoogleAddress
        type="text"
        value={value ?? ""}
        onChange={(p: any) => onChange(p)}
        className={cn("w-[260px]", hInput, pxInput, invalidCls)}
        aria-invalid={false}
        updateField={(k: string, v: any) => setOtherField?.(k, v)}
        ui={ui}
      />
    );
  }
  if (ui?.input === "editor") {
    return (
      <div className="min-w-[360px] max-w-[640px]">
        <EditorInput
          value={value ?? ""}
          onChange={(p: any) => onChange(p)}
          className={cn("w-full", hInput, pxInput)}
          ui={ui}
        />
      </div>
    );
  }
  if (ui?.input === "array") {
    let temp: unknown = [];
    try {
      const parsed = typeof value === "string" ? JSON.parse(value) : value;
      if (Array.isArray(parsed)) temp = parsed;
    } catch {}
    return (
      <ArrayInput
        value={(temp as InputArrayType[]) ?? []}
        onChange={(next: InputArrayType[]) => onChange(JSON.stringify(next))}
        className={cn("w-[300px]", hInput, pxInput)}
        ui={ui}
      />
    );
  }
  if (ui?.input === "multi_select_table" && ref?.entity) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
        <InfoIcon className="h-3.5 w-3.5" /> Edit relation in full form
      </span>
    );
  }
  if (ref?.entity && ui?.input === "multi_select") {
    const { items: fkItems } = useRefOptions(ref);
    const arr: (string | number)[] = Array.isArray(value)
      ? value
      : value == null || value === ""
      ? []
      : [value];
    return (
      <MultiSelect
        value={arr}
        onChange={(vals) => onChange(vals)}
        options={fkItems.map((o: any) => ({
          label: o.label,
          value: typeof o.value === "number" ? o.value : String(o.value),
        }))}
        className={cn("min-w-[260px]")}
      />
    );
  }
  if (options && Array.isArray(options) && options.length > 0) {
    return (
      <Select
        value={value ?? ""}
        onValueChange={(v) => onChange(/^\d+$/.test(String(v)) ? Number(v) : v)}
      >
        <SelectTrigger className={cn("w-[220px]", hInput, pxInput)}>
          <SelectValue placeholder="Select…" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((opt: any, i: number) => (
              <SelectItem key={i} value={String(opt.value)}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }
  if (ref && ref.entity) {
    const { items: fkItems } = useRefOptions(ref);
    if (fkItems.length) {
      return (
        <Select
          value={value ? String(value) : ""}
          onValueChange={(v) =>
            onChange(/^\d+$/.test(String(v)) ? Number(v) : v)
          }
        >
          <SelectTrigger className={cn("w-[220px]", hInput, pxInput)}>
            <SelectValue placeholder="Select…" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {fkItems.map((opt: any, i: number) => (
                <SelectItem key={i} value={String(opt.value)}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    }
  }
  if (kind === "number") {
    return (
      <Input
        type="number"
        className={cn("w-[160px]", hInput, pxInput)}
        value={value ?? ""}
        onChange={(e) =>
          onChange(e.target.value === "" ? "" : Number(e.target.value))
        }
      />
    );
  }
  if (kind === "date") {
    const v = typeof value === "string" ? value.slice(0, 10) : value ?? "";
    return <DatePicker value={v} onChange={(d) => onChange(d)} />;
  }
  if (kind === "bool") {
    return (
      <div className="flex items-center">
        <Switch checked={!!value} onCheckedChange={(v) => onChange(!!v)} />
      </div>
    );
  }
  if (kind === "file" || kind === "image") {
    return (
      <div className="flex flex-col gap-2 min-w-[260px]">
        <DocumentUpload value={value} onChange={onChange} />
      </div>
    );
  }
  if (kind === "image_gallery") {
    const fileData = array_file_conversion(value);
    return (
      <div className="min-w-[320px]">
        <DocumentGalleryUpload
          value={fileData || []}
          accept="*/*"
          onChange={(p) => onChange(JSON.stringify(p))}
        />
      </div>
    );
  }
  return (
    <Input
      className={cn("w-[220px]", hInput, pxInput)}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

/* ---------- helpers ---------- */
function formatCell(v: any) {
  if (v == null) return "";
  if (typeof v === "boolean") return v ? "Yes" : "No";
  if (typeof v === "string" && /^[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(v))
    return v.slice(0, 10);
  return String(v);
}

const DEFAULT_SELECTED_ROW_INDEX: number | null = 2;

export default function GenericTable({
  entity,
  filters,          // ⭐ ADD THIS
  mode = "client",
  onSelectRow,
  refreshKey = 0,
  maxColumns,
  preferredColumns = [],
  viewMode,
  onToggleSplit,
  hard_code_filter,
  editMode = "inline",
}: {
  entity: string;
  filters?: Record<string, any>;    // ⭐ ADD THIS
  hard_code_filter?: { key: string; value: string | number | undefined };
  mode?: "client" | "server";
  onSelectRow?: (row: any) => void;
  refreshKey?: number;
  maxColumns?: number;
  preferredColumns?: string[];
  viewMode?: "both" | "table" | "form";
  onToggleSplit?: () => void;
  editMode?: "form" | "inline";
}) {

  const inlineEnabled = editMode === "inline";

  // optional filter passthrough
  let table_filter = {};
  if (hard_code_filter?.value !== undefined) {
    table_filter = {
      filters: { [hard_code_filter.key]: hard_code_filter.value },
    };
  }

  const ctl = useEntityList(entity, {
    mode,
    maxColumns,
    preferredColumns,
    filters,         // ⭐ APPLY FILTERS HERE
    ...table_filter,
});


  const { tableConfig, schema: schemaRaw } = useEntityOptions(entity);
  const {
    update: updateOne,
    deleteById: deleteOne,
    create: createOne,
  } = useEntity(entity);

  /* --------- schema map --------- */
  const schemaByName = useMemo(() => {
    const map = new Map<string, any>();
    ((schemaRaw as any[]) || []).forEach((f: any) => {
      if (f?.name) map.set(String(f.name), f);
    });
    return map;
  }, [schemaRaw]);

  /* === Map display column -> backing edit key & meta (copy from form logic) === */
  const resolveForColumn = (col: string) => {
    // exact schema field
    if (schemaByName.has(col)) {
      const f = schemaByName.get(col);
      return {
        editKey: col,
        fieldMeta: f,
        inlineEditable:
          !f?.ui?.none_input && f?.ui?.input !== "multi_select_table",
      };
    }
    // "<col>_id"
    const idGuess = `${col}_id`;
    if (schemaByName.has(idGuess)) {
      const f = schemaByName.get(idGuess);
      return {
        editKey: idGuess,
        fieldMeta: f,
        inlineEditable:
          !f?.ui?.none_input && f?.ui?.input !== "multi_select_table",
      };
    }
    // any fk whose ref.entity === col
    for (const [name, meta] of schemaByName.entries()) {
      if (meta?.kind === "fk" && meta?.ref?.entity === col) {
        return {
          editKey: name,
          fieldMeta: meta,
          inlineEditable:
            !meta?.ui?.none_input && meta?.ui?.input !== "multi_select_table",
        };
      }
    }
    // read-only
    return { editKey: col, fieldMeta: null, inlineEditable: false };
  };

  /* ---------- Sorting / columns ---------- */
  const allowedCols = useMemo(() => {
    const cols = Array.isArray(ctl.cols) ? ctl.cols.map(String) : [];
    const allowed = Array.isArray(tableConfig?.columns)
      ? tableConfig.columns.map(String)
      : [];
    return allowed.length ? cols.filter((c) => allowed.includes(c)) : cols;
  }, [ctl.cols, tableConfig]);

  const table_header = useMemo(() => allowedCols, [allowedCols]);

  const [visibleCols, setVisibleCols] = useState<string[]>([]);
  const columnsKey = useMemo(
    () => (Array.isArray(allowedCols) ? allowedCols.map(String).join("|") : ""),
    [allowedCols]
  );
  const lastAppliedColsKeyRef = useRef<string>("");
  const arraysEqual = (a: string[], b: string[]) =>
    a.length === b.length && a.every((v, i) => v === b[i]);

  useEffect(() => {
    if (columnsKey === lastAppliedColsKeyRef.current) return;
    const nextAll = (Array.isArray(allowedCols) ? allowedCols : []).map(String);
    if (!nextAll.length) {
      if (visibleCols.length) setVisibleCols([]);
      lastAppliedColsKeyRef.current = columnsKey;
      return;
    }
    setVisibleCols((prev) => {
      if (!prev.length) {
        lastAppliedColsKeyRef.current = columnsKey;
        return nextAll;
      }
      const prevSet = new Set(prev);
      const nextSet = new Set(nextAll);
      const kept = prev.filter((c) => nextSet.has(c));
      const added = nextAll.filter((c) => !prevSet.has(c));
      const ordered = nextAll.filter(
        (c) => kept.includes(c) || added.includes(c)
      );
      if (arraysEqual(prev, ordered)) {
        lastAppliedColsKeyRef.current = columnsKey;
        return prev;
      }
      lastAppliedColsKeyRef.current = columnsKey;
      return ordered;
    });
  }, [columnsKey]);

  const displayedCols = useMemo(
    () =>
      (Array.isArray(allowedCols) ? allowedCols : []).filter((c) =>
        visibleCols.includes(String(c))
      ),
    [allowedCols, visibleCols]
  );

  const toggleColumn = (col: string) => {
    setVisibleCols((prev) => {
      const exists = prev.includes(col);
      const next = exists ? prev.filter((c) => c !== col) : [...prev, col];
      const ordered = (Array.isArray(allowedCols) ? allowedCols : [])
        .map(String)
        .filter((c) => next.includes(c));
      return arraysEqual(prev, ordered) ? prev : ordered;
    });
  };
  const showAll = () =>
    setVisibleCols((Array.isArray(allowedCols) ? allowedCols : []).map(String));
  const hideAll = () => setVisibleCols([]);

  // (kept) pk helpers for internal keys only – NOT used for network calls
  /* ---------- Keys (works for id & composite *_id) ---------- */
  const pkFieldNames = useMemo(() => {
    // prefer explicit "id" when present; otherwise use all *_id & fk fields
    const names = ((schemaRaw as any[]) || []).map((f: any) =>
      String(f?.name || "")
    );
    if (names.includes("id")) return ["id"];
    return ((schemaRaw as any[]) || [])
      .map((f: any) => String(f?.name || ""))
      .filter((n) => n.endsWith("_id") || schemaByName.get(n)?.kind === "fk");
  }, [schemaRaw, schemaByName]);

  const makePkObject = (row: any) => {
    if (row?.id != null) return row.id; // simple PK
    const obj: Record<string, any> = {};
    pkFieldNames.forEach((k) => {
      if (row?.[k] != null) obj[k] = row[k];
    });
    return Object.keys(obj).length ? obj : row?.id ?? null;
  };

  const makeRowKey = (row: any, index: number) => {
    if (row?.id != null) return `id:${row.id}`;
    const pairs = pkFieldNames
      .map((k) => `${k}=${row?.[k] == null ? "" : String(row[k])}`)
      .sort();
    const base = pairs.length
      ? pairs.join("|")
      : `idx:${ctl.startIndex + index}`;
    return `${entity}:${base}`;
  };

  /* ---------- Selection & edit state use stable string keys ---------- */
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [editRowKey, setEditRowKey] = useState<string | null>(null);
  const [editId, setEditId] = useState<any>(null);

  // search debounced
  const [qLocal, setQLocal] = useState(ctl.qInput);
  useEffect(() => {
    const id = setTimeout(() => {
      if (ctl.qInput !== qLocal) ctl.setQInput(qLocal);
    }, 120);
    return () => clearTimeout(id);
  }, [qLocal]);

  // preselect a row by key (not id)
  useEffect(() => {
    if (selectedKey != null) return;
    if (
      DEFAULT_SELECTED_ROW_INDEX != null &&
      ctl.pageItems.length > DEFAULT_SELECTED_ROW_INDEX
    ) {
      const r = ctl.pageItems[DEFAULT_SELECTED_ROW_INDEX];
      const key = makeRowKey(r, DEFAULT_SELECTED_ROW_INDEX);
      setSelectedKey(key);
    }
  }, [ctl.pageItems]);

  useEffect(() => {
    ctl.refresh();
  }, [refreshKey]);

  const { confirm, dialog } = useConfirmDialog();
  const handleDelete = async (row: any) => {
    const ok = await confirm({
      title: "Do you want to delete this item?",
      description: "This cannot be undone!",
      confirmText: "Delete",
      cancelText: "Cancel",
    });
    if (!ok) return;
    try {
      const rawId = row?.id ?? makePkObject(row);
      await deleteOne(rawId);
      toast.success("Record deleted successfully");
      await ctl.refresh(); // ⬅️ refresh after delete
    } catch (e: any) {
      if (e?.status === 400) toast.error(e?.message);
      toast.error("Failed to delete record");
    }
  };

  const sortIndicator = (key: string) =>
    ctl.isSortedAsc(key) ? " ▲" : ctl.isSortedDesc(key) ? " ▼" : "";
  const headerLabel = (c: any) => String(c).replace(/_/g, " ");

  const handleExport = async () => {
    const blob = await ctl.exportBlob();
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${entity}-export.xlsx`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  /* ---- table display -> value ---- */
  const getDisplayValue = (row: any, key: string) => {
    const dataKey: any = tableConfig?.columnResolvers?.[key];
    const raw = row?.[key];
    if (dataKey && raw && typeof raw === "object" && !Array.isArray(raw)) {
      return (raw as Record<string, any>)?.[dataKey];
    }
    return raw;
  };

  /* ----- Inline states ----- */
  const [isAdding, setIsAdding] = useState(false);
  const [draftNew, setDraftNew] = useState<Record<string, any>>({});
  const [draftEdit, setDraftEdit] = useState<Record<string, any>>({});

  const setDraftVal = (
    setter: React.Dispatch<React.SetStateAction<Record<string, any>>>,
    key: string,
    val: any
  ) => setter((s) => ({ ...s, [key]: val }));

  // read initial FK value from row for a display column
  const readInitialForColumn = (row: any, col: string) => {
    const { editKey, fieldMeta } = resolveForColumn(col);
    const fk = fieldMeta?.kind === "fk" ? fieldMeta.ref : null;
    let v = row?.[editKey];
    if (v == null && fk && row?.[col] && typeof row[col] === "object") {
      const valueKey = fk?.valueKey || "id";
      v = row[col]?.[valueKey];
    }
    if (v == null) v = row?.[col];
    return { editKey, fieldMeta, value: v };
  };

  const startAdd = () => {
    if (!inlineEnabled) return;
    const blank: Record<string, any> = {};
    displayedCols.forEach((c) => {
      const { editKey, fieldMeta } = resolveForColumn(String(c));
      blank[editKey] = fieldMeta?.kind === "bool" ? false : null;
    });
    if (hard_code_filter?.key && hard_code_filter.value != null) {
      blank[hard_code_filter.key] = hard_code_filter.value;
    }
    setDraftNew(blank);
    setIsAdding(true);
    setEditRowKey(null);
    setEditId(null);
    setDraftEdit({});
  };

  const cancelAdd = () => {
    setIsAdding(false);
    setDraftNew({});
  };

  const saveAdd = async () => {
    try {
      await createOne(draftNew);
      toast.success("Created successfully");
      setIsAdding(false);
      setDraftNew({});
      await ctl.refresh(); // ⬅️ refresh after create
    } catch (e: any) {
      toast.error(e?.message || "Create failed");
    }
  };

  const startEdit = (row: any, rowKey: string, has_hard_code_filter?: any) => {
    if (!inlineEnabled) return;
    setEditRowKey(rowKey);
    const editId = makePkObject(row);
    console.log({ editId });
    console.log({ row });
    const hard_code_filter_id = row?.[has_hard_code_filter?.key];

    setEditId(row?.id ?? hard_code_filter_id ?? editId);

    const draft: Record<string, any> = {};
    displayedCols.forEach((c) => {
      const { editKey, value } = readInitialForColumn(row, String(c));
      draft[editKey] = value;
    });
    setDraftEdit(draft);
    setIsAdding(false);
    setDraftNew({});
  };

  const cancelEdit = () => {
    setEditRowKey(null);
    setEditId(null);
    setDraftEdit({});
  };

  const saveEdit = async () => {
    try {
      // Make PUT match GenericForm exactly:
      //  - same URL (from editId / composite id)
      //  - same payload (flat; do NOT strip item_id/invoice_id etc.)
      console.log({ draftEdit, editId });
      const body: Record<string, any> = { ...draftEdit };
      delete (body as any).id; // GenericForm never sends `id` in body
      await updateOne(editId, body);

      toast.success("Updated successfully");
      setEditRowKey(null);
      setEditId(null);
      setDraftEdit({});
      await ctl.refresh(); // ⬅️ refresh after update
    } catch (e: any) {
      toast.error(e?.message || "Update failed");
    }
  };

  const SomeColsMissingMeta =
    displayedCols.some((c) => !resolveForColumn(String(c)).fieldMeta) || false;

  return (
    <div
      className={cn(hard_code_filter ? "border-t pt-5 mt-5" : "px-2 pt-0 py-2")}
    >
      {inlineEnabled && SomeColsMissingMeta ? (
        <div className="mb-2 ml-1 inline-flex items-center gap-2 text-xs text-muted-foreground">
          <InfoIcon className="h-3.5 w-3.5" /> Some columns don’t directly exist
          in schema; mapping to backing fields is applied for inline editing.
        </div>
      ) : null}

      {/* Top bar */}
      <div className="">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-0 bottom-0 w-4 h-4 my-auto text-muted-foreground" />
              <Input
                placeholder="Search…"
                value={qLocal}
                onChange={(e) => setQLocal(e.target.value)}
                className="w-56 md:w-150 !pl-9"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4 flex-wrap">
            <div className="flex items-center gap-2 ">
              <Switch
                checked={ctl.mode === "server"}
                onCheckedChange={(v) => ctl.setMode(v ? "server" : "client")}
              />
              <Label className="text-sm text-muted-foreground select-none">
                {ctl.mode === "server" ? "Server-side" : "Client-side"}
              </Label>
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                className="!w-[35px]"
                variant="outline"
                onClick={handleExport}
              >
                <FileSpreadsheetIcon />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="min-w-[110px]"
                  >
                    <Columns3 className="mr-2 h-4 w-4" />
                    Columns
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Show / Hide Columns</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {table_header.map((col) => {
                    const key = String(col);
                    return (
                      <DropdownMenuCheckboxItem
                        key={key}
                        checked={visibleCols.includes(key)}
                        className="capitalize"
                        onClick={(e) => {
                          toggleColumn(key);
                          e.stopPropagation();
                          e.preventDefault();
                        }}
                      >
                        {key.replace(/_/g, " ")}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={visibleCols.length === table_header.length}
                    onCheckedChange={() => showAll()}
                  >
                    Show all
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={visibleCols.length === 0}
                    onCheckedChange={() => hideAll()}
                  >
                    Hide all
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Create button only when form mode */}
              {!inlineEnabled && onToggleSplit && (
                <>
                  <span className="mx-1 text-muted-foreground select-none">
                    |
                  </span>
                  <Button
                    type="button"
                    className="min-w-[92px]"
                    variant="default"
                    onClick={onToggleSplit}
                    title={
                      viewMode === "both"
                        ? "Maximize Table"
                        : "Restore split view"
                    }
                    aria-label={
                      viewMode === "both"
                        ? "Maximize Table"
                        : "Restore split view"
                    }
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Table container */}
      <div
        className={cn(
          "mt-4 [scrollbar-gutter:stable]",
          hard_code_filter ? "" : "min-h-[200px] "
        )}
        style={{ overflowAnchor: "none", contain: "paint" }}
      >
        {ctl.error ? (
          <div className="p-6 text-sm text-red-500">{ctl.error}</div>
        ) : (
          <>
            <div
              className={cn(
                "rounded-[var(--theme-radius)] border overflow-auto",
                hard_code_filter ? "max-h-[70dvh]" : "h-[70dvh]"
              )}
            >
              <div
                data-slot="data-table table-container"
                className="relative w-full"
              >
                <Table className="w-full caption-bottom text-sm">
                  <TableHeader className="[&_tr]:border-b bg-muted sticky top-0 z-10">
                    <TableRow className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors">
                      {displayedCols.map((c: any) => (
                        <TableHead
                          key={String(c)}
                          className="capitalize cursor-pointer select-none text-foreground h-10 px-4 text-left align-middle font-medium"
                          onClick={() => ctl.toggleSort(String(c))}
                          title={headerLabel(c)}
                        >
                          {headerLabel(c)}{" "}
                          <span className="ml-1 opacity-70">
                            {sortIndicator(String(c))}
                          </span>
                        </TableHead>
                      ))}
                      <TableHead className="text-right px-4 sticky right-0 bg-muted border-l w-[180px]">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {/* Inline ADD row (only in inline mode) */}
                    {inlineEnabled && isAdding && (
                      <TableRow className="bg-muted/20">
                        {displayedCols.map((c: any) => {
                          const col = String(c);
                          const { editKey, fieldMeta, inlineEditable } =
                            resolveForColumn(col);
                          if (!fieldMeta) {
                            return (
                              <TableCell key={col} className="px-4">
                                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                                  <InfoIcon className="h-3.5 w-3.5" /> Not in
                                  schema
                                </span>
                              </TableCell>
                            );
                          }
                          if (!inlineEditable) {
                            return (
                              <TableCell key={col} className="px-4">
                                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                                  <InfoIcon className="h-3.5 w-3.5" /> Edit in
                                  form
                                </span>
                              </TableCell>
                            );
                          }
                          const v = draftNew[editKey];
                          return (
                            <TableCell key={col} className="px-4">
                              <InlineFieldControl
                                field={fieldMeta}
                                value={v}
                                setOtherField={(k, val) =>
                                  setDraftVal(setDraftNew, k, val)
                                }
                                onChange={(val) =>
                                  setDraftVal(setDraftNew, editKey, val)
                                }
                              />
                            </TableCell>
                          );
                        })}
                        <TableCell className="text-right sticky right-0 bg-background border-l">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              type="button"
                              size="sm"
                              variant="default"
                              onClick={saveAdd}
                              title="Save"
                            >
                              <SaveIcon className="h-4 w-4 mr-1" /> Save
                            </Button>
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={cancelAdd}
                              title="Cancel"
                            >
                              <XIcon className="h-4 w-4 mr-1" /> Cancel
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}

                    {/* Data rows */}
                    {ctl.pageItems.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={Math.max(1, displayedCols.length + 1)}
                          className="text-center py-10 text-sm text-muted-foreground px-4 table-header"
                        >
                          No data found
                        </TableCell>
                      </TableRow>
                    ) : (
                      ctl.pageItems.map((r: any, i: number) => {
                        const rowKey = makeRowKey(r, i);
                        const isSelected = selectedKey === rowKey;
                        const editing = inlineEnabled && editRowKey === rowKey;

                        return (
                          <TableRow
                            key={rowKey}
                            data-selected={isSelected ? "true" : "false"}
                            className={`cursor-pointer transition-colors ${
                              isSelected
                                ? "bg-blue-50 hover:bg-blue-100 border-blue-500"
                                : "hover:bg-muted/50"
                            }`}
                            onClick={() => {
                              setSelectedKey(rowKey);
                              if (!inlineEnabled) {
                                onSelectRow?.(r);
                              }
                            }}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                setSelectedKey(rowKey);
                                if (!inlineEnabled) onSelectRow?.(r);
                              }
                            }}
                          >
                            {displayedCols.map((c: any) => {
                              const col = String(c);
                              const { editKey, fieldMeta, inlineEditable } =
                                resolveForColumn(col);

                              if (editing) {
                                if (!fieldMeta) {
                                  return (
                                    <TableCell key={col} className="px-4">
                                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                                        <InfoIcon className="h-3.5 w-3.5" /> Not
                                        in schema
                                      </span>
                                    </TableCell>
                                  );
                                }
                                if (!inlineEditable) {
                                  return (
                                    <TableCell key={col} className="px-4">
                                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                                        <InfoIcon className="h-3.5 w-3.5" />{" "}
                                        Edit in form
                                      </span>
                                    </TableCell>
                                  );
                                }
                                const v = (() => {
                                  if (draftEdit.hasOwnProperty(editKey))
                                    return draftEdit[editKey];
                                  return readInitialForColumn(r, col).value;
                                })();
                                return (
                                  <TableCell key={col} className="px-4">
                                    <InlineFieldControl
                                      field={fieldMeta}
                                      value={v}
                                      setOtherField={(k, val) =>
                                        setDraftVal(setDraftEdit, k, val)
                                      }
                                      onChange={(val) =>
                                        setDraftVal(setDraftEdit, editKey, val)
                                      }
                                    />
                                  </TableCell>
                                );
                              } else {
                                const display = formatCell(
                                  getDisplayValue(r, col)
                                );
                                return (
                                  <TableCell
                                    key={col}
                                    className="px-4 table-header"
                                  >
                                    {display}
                                  </TableCell>
                                );
                              }
                            })}

                            <TableCell className="text-right sticky right-0 bg-background border-l">
                              {inlineEnabled ? (
                                editing ? (
                                  <div className="flex items-center justify-end gap-1">
                                    <Button
                                      type="button"
                                      size="sm"
                                      variant="default"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        saveEdit();
                                      }}
                                      title="Save"
                                    >
                                      <SaveIcon className="h-4 w-4 mr-1" /> Save
                                    </Button>
                                    <Button
                                      type="button"
                                      size="sm"
                                      variant="outline"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        cancelEdit();
                                      }}
                                      title="Cancel"
                                    >
                                      <XIcon className="h-4 w-4 mr-1" /> Cancel
                                    </Button>
                                  </div>
                                ) : (
                                  <>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedKey(rowKey);
                                        startEdit(r, rowKey, hard_code_filter);
                                      }}
                                      title="Inline Edit"
                                    >
                                      <EditIcon />
                                    </Button>
                                    <Button
                                      type="button"
                                      size="sm"
                                      variant="ghost"
                                      onClick={async (e) => {
                                        e.stopPropagation();
                                        await handleDelete(r);
                                        if (selectedKey === rowKey)
                                          setSelectedKey(null);
                                      }}
                                      title="Delete"
                                    >
                                      <Trash2Icon />
                                    </Button>
                                  </>
                                )
                              ) : (
                                <>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedKey(rowKey);
                                      onSelectRow?.(r);
                                      onToggleSplit?.();
                                    }}
                                    title="Edit"
                                  >
                                    <EditIcon />
                                  </Button>
                                  <Button
                                    type="button"
                                    size="sm"
                                    variant="ghost"
                                    onClick={async (e) => {
                                      e.stopPropagation();
                                      await handleDelete(r);
                                      if (selectedKey === rowKey)
                                        setSelectedKey(null);
                                    }}
                                    title="Delete"
                                  >
                                    <Trash2Icon />
                                  </Button>
                                </>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>

                {ctl.loading ? (
                  <div className="p-6 text-sm text-muted-foreground">
                    Loading…
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Pager */}
      <div className="mt-3 flex px-4 flex-col items-center gap-3 md:flex-row md:justify-between text-muted-foreground">
        <div className="flex items-center gap-2 text-sm">
          <span className="inline-block min-w-max">Rows per page</span>
          <Select
            value={"" + ctl.pageSize}
            onValueChange={(v) => ctl.setPageSize(Number(v))}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select page size" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {[2, 10, 25, 50, 100].map((n) => (
                  <SelectItem key={n} value={"" + n}>
                    {n}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <span className="text-muted-foreground inline-block min-w-max tabular-nums">
            Page {ctl.curPage} / {ctl.totalPages}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={() => ctl.setPage(1)}
            disabled={ctl.curPage === 1}
          >
            <ChevronsLeftIcon />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={() => ctl.setPage((p: number) => Math.max(1, p - 1))}
            disabled={ctl.curPage === 1}
          >
            <ChevronLeftIcon />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={() =>
              ctl.setPage((p: number) => Math.min(ctl.totalPages, p + 1))
            }
            disabled={ctl.curPage >= ctl.totalPages}
          >
            <ChevronRightIcon />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={() => ctl.setPage(ctl.totalPages)}
            disabled={ctl.curPage >= ctl.totalPages}
          >
            <ChevronsRightIcon />
          </Button>
        </div>
      </div>

      {dialog}

      {/* Bottom Add: only in inline mode */}
      {inlineEnabled ? (
        <div className="sticky bottom-0 bg-background border-t pt-3 pb-4 mt-4">
          <div className="flex justify-end">
            <Button
              onClick={startAdd}
              disabled={isAdding}
              type="button"
              title="Inline Add"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
