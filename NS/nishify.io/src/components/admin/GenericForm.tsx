/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEntity, useRefOptions, useEntityOptions } from "@/hooks";
import type { SchemaField } from "./types";
import { DatePicker } from "../ui/date-picker";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "@/lib/utils";
import { DocumentUpload } from "../ui/document-upload";
import {
  array_file_conversion,
  DocumentGalleryUpload,
} from "../ui/document-gallery-upload";
import { toast } from "sonner";
import { GoogleAddress } from "../ui/google-address";
import { EditorInput } from "../ui/editor-input";
import { ArrayInput, InputArrayType } from "../ui/array-input";
import { MultiSelect } from "../ui/multi-select";
import { MultiSelectTable } from "../ui/multi-select-table/multi-select-table";
import GenericTable from "./GenericTable";

function prettyLabel(name: string) {
  return name.replace(/_?id$/i, "").replaceAll("_", " ");
}

type Props = {
  entity: string;
  value?: Record<string, any> | null;
  onSaved?: () => void;
  onCancel?: () => void;

  /** Hide the CardHeader so outer layout can supply its own header chrome */
  showHeader?: boolean;

  /** Force density from parent; if omitted, defaults to "compact" */
  density?: "cozy" | "compact";

  /** Show action buttons at the top (under the section header) */
  actionsAtTop?: boolean;

  /** If true, bottom action bar is hidden (defaults to true) */
  hideBottomActions?: boolean;
};

function FieldControl({
  field,
  value,
  onChange,
  error,
  dense,
  updateField,
  id,
}: {
  field: SchemaField;
  value: any;
  id?: number | string;
  onChange: (v: any) => void;
  error?: string;
  dense: boolean;
  updateField?: (k: string, v: any) => void;
}) {
  const { kind, options, ref, ui = {} } = field as any;
  const { items: fkItems } = useRefOptions(ref);

  const invalidCls = error ? "border-red-500 focus-visible:ring-red-500" : "";
  const hInput = dense ? "h-9" : "h-10";
  const pxInput = dense ? "px-3" : "px-4";

  if (ui.input === "google_address") {
    return (
      <>
        <GoogleAddress
          type="text"
          value={value ?? ""}
          onChange={(props: any) => onChange(props)}
          className={cn("w-full", hInput, pxInput, invalidCls)}
          aria-invalid={!!error}
          updateField={updateField}
          ui={ui}
        />
      </>
    );
  }
  if (ui.input === "editor") {
    return (
      <>
        <EditorInput
          value={value ?? ""}
          onChange={(props: any) => onChange(props)}
          className={cn("w-full", hInput, pxInput, invalidCls)}
          aria-invalid={!!error}
          updateField={updateField}
          ui={ui}
        />
      </>
    );
  }
  if (ui.input === "array") {
    let tempValue: unknown = [];
    try {
      const parseValue = JSON.parse(value);
      if (Array.isArray(parseValue)) {
        tempValue = parseValue;
      }
    } catch (error) {
      tempValue = [];
    }
    return (
      <>
        <ArrayInput
          value={tempValue as InputArrayType[]}
          onChange={(props: any) => {
            if (Array.isArray(props)) {
              onChange(JSON.stringify(props));
            } else {
              onChange(props);
            }
          }}
          className={cn("w-full", hInput, pxInput, invalidCls)}
          ui={ui}
        />
      </>
    );
  }
  if (ui.input === "multi_select_table" && ref?.entity) {
    return (
      <>
        <MultiSelectTable
          entity={ref?.entity}
          hard_code_filter={{
            key: ui.id_key,
            value: id,
          }}
        />
      </>
    );
  }
  if (ref && fkItems.length > 0 && ui.input === "multi_select") {
    // Ensure we always pass/keep an array
    const arr: (string | number)[] = Array.isArray(value)
      ? value
      : value == null || value === ""
        ? []
        : [value];

    return (
      <>
        <MultiSelect
          value={arr}
          onChange={(vals) => onChange(vals)}
          options={fkItems.map((o: any) => ({
            label: o.label,
            value: typeof o.value === "number" ? o.value : String(o.value),
          }))}
          className={cn("w-full", invalidCls)}
          aria-invalid={!!error}
        />
      </>
    );
  }
  if (options && options.length > 0) {
    return (
      <>
        <Select value={value ?? ""} onValueChange={onChange}>
          <SelectTrigger
            className={cn("w-full", hInput, pxInput, invalidCls)}
            aria-invalid={!!error}
          >
            <SelectValue placeholder="Select…" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {options.map((opt: any, idx: number) => (
                <SelectItem key={idx} value={String(opt.value)}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </>
    );
  }

  if (ref && fkItems.length > 0) {
    return (
      <>
        <Select value={value ? String(value) : ""} onValueChange={onChange}>
          <SelectTrigger
            className={cn("w-full", hInput, pxInput, invalidCls)}
            aria-invalid={!!error}
          >
            <SelectValue placeholder="Select…" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {fkItems.map((opt, idx) => (
                <SelectItem key={idx} value={String(opt.value)}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </>
    );
  }

  if (kind === "number") {
    return (
      <Input
        type="number"
        value={value ?? ""}
        onChange={(e) =>
          onChange(e.target.value === "" ? "" : Number(e.target.value))
        }
        className={cn(hInput, pxInput, invalidCls)}
        aria-invalid={!!error}
      />
    );
  }

  if (kind === "date") {
    return (
      <DatePicker
        value={value?.slice?.(0, 10) ?? ""}
        onChange={(d) => onChange(d)}
      />
    );
  }

  if (["file", "image"].includes(ui.input)) {
    return (
      <div className="flex flex-col gap-2">
        <DocumentUpload value={value} onChange={onChange} />
      </div>
    );
  }

  if (["image_gallery"].includes(ui.input)) {
    const file_data = array_file_conversion(value);
    return (
      <DocumentGalleryUpload
        value={file_data || []}
        accept="*/*"
        onChange={(prop) => onChange(JSON.stringify(prop))}
      />
    );
  }

  if (kind === "bool") {
    return (
      <input
        type="checkbox"
        className="h-4 w-4"
        checked={!!value}
        onChange={(e) => onChange(e.target.checked)}
      />
    );
  }

  return (
    <Input
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      className={cn(hInput, pxInput, invalidCls)}
      aria-invalid={!!error}
    />
  );
}

export default function GenericForm({
  entity,
  value,
  onSaved,
  onCancel,
  showHeader = true,
  density = "compact",
  actionsAtTop = true,
  hideBottomActions = true,
}: Props) {
  const { schema, loading, error } = useEntityOptions(entity);
  const { create, update } = useEntity(entity);

  const [form, setForm] = useState<Record<string, any>>({});
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Only include fields that actually have inputs (exclude id and any ui.none_input)
  const inputSchema = useMemo(
    () =>
      (schema as any[]).filter(
        (f) => f?.name !== "id" && !(f?.ui && f.ui.none_input)
      ),
    [schema]
  );

  useEffect(() => {
    if (value) {
      // Pick only keys that belong to input fields
      const next: Record<string, any> = {};
      for (const { name, kind } of inputSchema as any[]) {
        next[name] = value[name] ?? (kind === "bool" ? false : null);
      }
      setForm(next);
    } else {
      const blank: Record<string, any> = {};
      for (const { name, kind } of inputSchema as any[]) {
        blank[name] = kind === "bool" ? false : null;
      }
      setForm(blank);
    }
  }, [value, inputSchema]);

  // const pk = useMemo(() => schema.find((f) => f.name === "id"), [schema]);
  // const isEdit = Boolean(value && (value as any).id);

  const updateField = (k: string, v: any) => {
    setForm((s) => ({ ...s, [k]: v }));
    setFieldErrors((e) => ({ ...e, [k]: "" }));
  };

  function normalizeAndValidate() {
    // Start from *form* keys only — ensures payload only has fields present in form
    const payload: Record<string, any> = { ...form };
    const errors: Record<string, string> = {};

    for (const {
      name,
      kind,
      required,
      validate,
      options: enumOpts,
      ui,
    } of inputSchema as any[]) {
      let v = payload[name];

      const isFiley =
        kind === "file" || kind === "image" || kind === "image_gallery";

      const isMulti = ui?.input === "multi_select";
      const isArrayish = Array.isArray(v) || isMulti;
      const isObjectish =
        !isArrayish &&
        v != null &&
        typeof v === "object" &&
        !(v instanceof Date);

      // ---------- Normalization ----------
      if (!isFiley) {
        if (isMulti) {
          // Always normalize to array
          if (!Array.isArray(v)) v = v == null || v === "" ? [] : [v];

          // Coerce numeric option values if options are numeric
          const numericEnums = enumOpts?.some?.(
            (o: any) => typeof o.value === "number"
          );
          if (numericEnums) {
            v = v.map((x: any) =>
              typeof x === "string" && /^\d+$/.test(x) ? Number(x) : x
            );
          }
        } else if (isArrayish) {
          // Keep arrays as-is (no coercion)
          // v = v
        } else if (isObjectish) {
          // Keep objects as-is (no String(...))
          // v = v
        } else {
          // Scalar normalization
          if (v === "" || v === undefined) v = null;

          if (v !== null) {
            if (kind === "number") {
              const n = typeof v === "number" ? v : Number(v);
              if (!Number.isFinite(n)) errors[name] = "Must be a number";
              else v = n;
            } else if (kind === "fk" || /(_id|Id|ID)$/.test(name)) {
              if (typeof v === "string" && /^\d+$/.test(v)) v = Number(v);
              else if (v !== null && typeof v === "number" && !Number.isFinite(v)) v = null;
              // otherwise leave it as a string (like our KSUIDs)
            } else if (kind === "bool") {
              if (typeof v !== "boolean") v = v === "true" || v === 1;
            } else if (kind === "date") {
              const t = Date.parse(String(v));
              if (!Number.isFinite(t)) errors[name] = "Invalid date";
              else v = new Date(t).toISOString().slice(0, 10);
            } else {
              // text-ish scalar
              v = String(v);
            }
          }
        }
      }

      payload[name] = v;

      // ---------- Required check ----------
      if (!errors[name] && required) {
        const empty =
          v === null ||
          v === "" ||
          v === undefined ||
          (Array.isArray(v) && v.length === 0) ||
          // treat {} as empty too
          (v &&
            typeof v === "object" &&
            !Array.isArray(v) &&
            Object.keys(v).length === 0);

        if (empty) {
          errors[name] = "Required";
          continue;
        }
      }

      // Skip further checks for null/empty/file fields
      if (errors[name] || v == null || isFiley) continue;

      const rules: any = validate || {};

      // ---------- Enum checks ----------
      if (enumOpts && enumOpts.length) {
        const allowed = new Set(enumOpts.map((o: any) => o.value));
        if (isMulti || Array.isArray(v)) {
          const allValid = (v as any[]).every((x) => allowed.has(x));
          if (!allValid) {
            errors[name] = "Invalid value";
            continue;
          }
        } else {
          if (!allowed.has(v)) {
            errors[name] = "Invalid value";
            continue;
          }
        }
      }

      // ---------- Validation rules for scalars only ----------
      if (!Array.isArray(v) && typeof v !== "object") {
        if (rules.type === "email") {
          const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!re.test(String(v)))
            errors[name] = rules.message || "Invalid email";
        }

        if (rules.type === "url") {
          try {
            new URL(String(v));
          } catch {
            errors[name] = rules.message || "Invalid URL";
          }
        }

        if (rules.regex) {
          const re = new RegExp(rules.regex);
          if (!re.test(String(v)))
            errors[name] = rules.message || "Invalid format";
        }

        if (
          typeof rules.min === "number" &&
          typeof v === "number" &&
          v < rules.min
        )
          errors[name] = `Min ${rules.min}`;

        if (
          typeof rules.max === "number" &&
          typeof v === "number" &&
          v > rules.max
        )
          errors[name] = `Max ${rules.max}`;

        if (
          typeof rules.min_length === "number" &&
          String(v).length < rules.min_length
        )
          errors[name] = `Min length ${rules.min_length}`;

        if (
          typeof rules.max_length === "number" &&
          String(v).length > rules.max_length
        )
          errors[name] = `Max length ${rules.max_length}`;

        if (Array.isArray(rules.one_of) && !rules.one_of.includes(v))
          errors[name] = "Invalid value";
      }
    }

    return { payload, errors };
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr(null);

    const { payload, errors } = normalizeAndValidate();
    console.log({ form, payload });
    setFieldErrors(errors);
    if (Object.keys(errors).length) {
      setBusy(false);
      return;
    }

    console.log("payload", payload);

    try {
      // if (isEdit && pk) await update((value as any)?.id ?? payload.id, payload);
      if ((value as any)?.id)
        await update((value as any)?.id ?? payload.id, payload);
      else await create(payload);
      onSaved?.();
      onCancel?.();
      toast.success("Success", {
        description: value?.id
          ? entity.replaceAll("_", " ") + " is updated successfully"
          : entity.replaceAll("_", " ") + " is created successfully",
      });
    } catch (e: any) {
      setErr(String(e?.message || e));
      toast.error("Failed", {
        description: value?.id
          ? entity.replaceAll("_", " ") + " is updated is failed"
          : entity.replaceAll("_", " ") + " is created is failed",
      });
    } finally {
      setBusy(false);
    }
  };

  if (loading)
    return (
      <Card className="shadow-none">
        <CardContent className="p-4">Loading form…</CardContent>
      </Card>
    );
  if (error)
    return (
      <Card className="shadow-none">
        <CardContent className="p-4 text-red-500">{error}</CardContent>
      </Card>
    );

  const dense = density === "compact";
  const padX = dense ? "px-3" : "px-4";
  const padY = dense ? "py-2" : "py-3";
  const gap = dense ? "gap-3" : "gap-4";

  return (
    <div>
      {showHeader && (
        <CardHeader className={cn(padY, padX, "pb-2")}>
          <CardTitle className="text-base md:text-lg capitalize">
            Create {entity.replace(/_/g, " ")}
          </CardTitle>
        </CardHeader>
      )}

      {actionsAtTop ? (
        <div className="sticky top-0 z-[10] flex items-center justify-between border-b bg-gray-50  px-3 py-2">
          <div className="flex items-center gap-2">
            <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Form
            </div>
            <div className="text-sm font-medium capitalize">
              {value?.id ? "Edit " : "Create "} {entity}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              type="submit"
              form="__generic_form"
              className={cn(dense ? "h-9 px-3" : "h-10 px-4", "min-w-[92px]")}
              disabled={busy}
            >
              {busy ? "Saving…" : value?.id ? "Update" : "Create"}
            </Button>
            <span className="mx-1 text-muted-foreground select-none">|</span>
            <Button
              type="button"
              variant="outline"
              className={cn(dense ? "h-9 px-3" : "h-10 px-4", "min-w-[92px]")}
              onClick={() => onCancel?.()}
              disabled={busy}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : null}
      {err && (
        <span className="text-red-500 text-xs md:text-sm ml-2">{err}</span>
      )}

      <div
        className={cn(
          padX,
          padY,
          "pb-2",
          actionsAtTop
            ? "flex-1 max-h-[calc(100dvh_-_165px)] min-h-[calc(100dvh_-_165px)] overflow-auto"
            : ""
        )}
      >
        {/* ---- Form ---- */}
        <form
          id="__generic_form"
          onSubmit={handleSubmit}
          className={cn("grid md:grid-cols-12", gap)}
        >
          {schema
            .filter((f) => f.name !== "id")
            .map((field, index: number) => (
              <div
                key={`${field.name}-${index}`}
                className={cn(
                  dense ? "space-y-1" : "space-y-1.5",
                  "md:col-span-6",
                  /(description|notes|address|detail)/i.test(field.name) && "",
                  (field as any)?.className
                )}
              >
                {(field as any)?.ui?.none_input ? (
                  <div
                    className={cn(
                      "capitalize mt-[20px] pb-[11px] border-b-[#cec6c6] border-b border-dashed"
                    )}
                  >
                    <strong className="text-md font-sans text-black dark:text-white inline-block">
                      {prettyLabel((field as any).ui?.label || field.name)}
                    </strong>
                  </div>
                ) : (
                  <Label
                    className={cn(
                      "capitalize",
                      dense ? "text-xs" : "text-sm",
                      "text-foreground/85",
                      (field as any)?.ui?.label_hidden ? " hidden" : ""
                    )}
                  >
                    {prettyLabel((field as any).ui?.label || field.name)}
                    {(field as any).required ? (
                      <span className="text-red-500 ml-1">*</span>
                    ) : null}
                  </Label>
                )}

                {(field as any)?.ui?.none_input ? null : (
                  <FieldControl
                    field={field as any}
                    value={form[field.name]}
                    onChange={(v) => updateField(field.name, v)}
                    error={fieldErrors[field.name]}
                    dense={dense}
                    updateField={updateField}
                    id={value?.id}
                  />
                )}

                {fieldErrors[field.name] && (
                  <span className="text-xs text-red-500">
                    {fieldErrors[field.name]}
                  </span>
                )}
              </div>
            ))}

          {/* ---- Bottom action bar (optional) ---- */}
          {!hideBottomActions && (
            <div className="col-span-full flex flex-wrap gap-2 pt-2">
              <Button
                type="submit"
                className={cn(dense ? "h-9 px-3" : "h-10 px-4", "w-24")}
                disabled={busy}
              >
                {busy ? "Saving…" : "Save"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className={cn(dense ? "h-9 px-3" : "h-10 px-4", "w-24")}
                onClick={() => onCancel?.()}
                disabled={busy}
              >
                Cancel
              </Button>
              {err && (
                <span className="text-red-500 text-xs md:text-sm ml-2">
                  {err}
                </span>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
