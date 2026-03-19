/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
import { CheckboxGroup } from "../ui/checkbox-group";
import { CheckboxGroupColor } from "../ui/checkbox-group-color";
import { CheckboxGroupChip } from "../ui/checkbox-group-chip";
import MultiRangeSlider from "../ui/multi-range-slider";
import { LoaderCircleIcon } from "lucide-react";
import { PasswordInput } from "../ui/password-input";

function prettyLabel(name: string) {
  return name.replace(/_?id$/i, "").replaceAll("_", " ");
}

type Props = {
  entity: string;
  value?: Record<string, any> | null;
  onSaved?: (prop: any) => void;
  onCancel?: () => void;
  onAutoSave?: any;
  isAuth?: boolean;
};

function FieldControl({
  field,
  value,
  onChange,
  error,
  busy,
}: {
  field: SchemaField;
  value: any;
  onChange: (v: any) => void;
  error?: string;
  busy?: boolean;
}) {
  const { kind, options, ref } = field;
  const ui = field.ui || {};
  const { items: fkItems } = useRefOptions(ref);

  const invalidCls = error ? "border-red-500 focus-visible:ring-red-500" : "";

  const CheckBoxList: any = {
    multi_select_checkbox: CheckboxGroup,
    multi_select_color: CheckboxGroupColor,
    multi_select_chip: CheckboxGroupChip,
  };

  if (ui.input === "password") {
    return (
      <PasswordInput
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        className={cn(invalidCls, ui.input_class)}
      />
    );
  }

  if (kind === "button") {
    return (
      <div className="flex items-center gap-2 py-2">
        <Button
          type={ui.type || "button"}
          className={cn(ui.input_class)}
          disabled={busy}
        >
          <span className="relative">
            {ui.label}
            {busy ? (
              <LoaderCircleIcon className="animate-spin absolute left-[calc(100%_+_10px)] top-0 bottom-0 my-auto" />
            ) : null}
          </span>
        </Button>
      </div>
    );
  }
  if (kind === "bool") {
    return (
      <div className="flex items-center gap-2 py-2">
        <Switch checked={!!value} onCheckedChange={(v) => onChange(v)} />
        <span className="text-sm text-muted-foreground">{String(!!value)}</span>
      </div>
    );
  }

  if (options && options.length > 0) {
    if (ui.isMultiSelectCheck && CheckBoxList[ui.type]) {
      const MultiCHeckBox = CheckBoxList[ui.type];
      return (
        <MultiCHeckBox
          value={value ?? []}
          onChange={onChange}
          options={options}
          ui={ui}
        />
      );
    }
    return (
      <Select value={value ?? ""} onValueChange={onChange}>
        <SelectTrigger
          className={`w-full ${invalidCls}`}
          aria-invalid={!!error}
        >
          <SelectValue placeholder="Select…" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((opt, idx) => (
              <SelectItem key={idx} value={String(opt.value)}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }

  if (ref && fkItems.length > 0) {
    if (ui.isMultiSelectCheck && CheckBoxList[ui.type]) {
      const MultiCHeckBox = CheckBoxList[ui.type];
      return (
        <MultiCHeckBox
          value={value ?? []}
          onChange={onChange}
          options={fkItems}
          ui={ui}
        />
      );
    }
    return (
      <Select value={value ?? ""} onValueChange={onChange}>
        <SelectTrigger
          className={`w-full ${invalidCls}`}
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
        className={cn(invalidCls, ui.input_class)}
        aria-invalid={!!error}
      />
    );
  }
  if (kind === "price_range") {
    return (
      <MultiRangeSlider
        min={ui.min}
        max={ui.max}
        step={ui.step}
        value={value}
        onChange={onChange}
        currency={ui.currency}
        default_value={ui.default_value}
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

  if (["file", "image"].includes(kind)) {
    return (
      <div className="flex flex-col gap-2">
        <DocumentUpload value={value} onChange={onChange} />
      </div>
    );
  }

  if (["image_gallery"].includes(kind)) {
    const file_data = array_file_conversion(value);
    return (
      <>
        <DocumentGalleryUpload
          value={file_data || []}
          accept="*/*"
          onChange={(prop) => {
            console.log({ prop });
            onChange(JSON.stringify(prop));
          }}
        />
      </>
    );
  }

  return (
    <Input
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      aria-invalid={!!error}
      className={cn(invalidCls, ui.input_class)}
    />
  );
}

export default function GenericFormV2({
  entity,
  value,
  onSaved,
  onCancel,
  onAutoSave,
  isAuth,
}: Props) {
  const { schema, loading, error } = useEntityOptions(entity);
  const { create, update } = useEntity(entity);
  const [form, setForm] = useState<Record<string, any>>({});
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!form) return;
    const handler = setTimeout(() => {
      onAutoSave?.(form);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [form]); // runs whenever form changes

  useEffect(() => {
    if (value) setForm(value);
    else {
      const blank: Record<string, any> = {};
      schema.forEach(({ name, kind }) => {
        if (name === "id") return;
        blank[name] = kind === "bool" ? false : null;
      });
      setForm(blank);
    }
  }, [value, schema]);

  const pk = useMemo(() => schema.find((f) => f.name === "id"), [schema]);
  const isEdit = Boolean(value && (value as any).id);
  const updateField = (k: string, v: any) => {
    setForm((s) => ({ ...s, [k]: v }));
    setFieldErrors((e) => ({ ...e, [k]: "" }));
  };

  function normalizeAndValidate() {
    const payload: Record<string, any> = { ...form };
    const errors: Record<string, string> = {};

    for (const {
      name,
      kind,
      required,
      validate,
      options: enumOpts,
    } of schema as any[]) {
      if (name === "id") continue;
      let v = payload[name];

      const isFiley =
        kind === "file" || kind === "image" || kind === "image_gallery";
      if (!isFiley) {
        if (v === "" || v === undefined) v = null;
        if (v !== null) {
          if (kind === "number") {
            const n = typeof v === "number" ? v : Number(v);
            if (!Number.isFinite(n)) errors[name] = "Must be a number";
            else v = n;
          } else if (kind === "fk" || /(_id|Id|ID)$/.test(name)) {
            if (typeof v === "string" && /^\d+$/.test(v)) v = Number(v);
            if (v !== null && !Number.isFinite(v)) v = null;
          } else if (kind === "bool") {
            if (typeof v !== "boolean") v = v === "true" || v === 1;
          } else if (kind === "date") {
            const t = Date.parse(String(v));
            if (!Number.isFinite(t)) errors[name] = "Invalid date";
            else v = new Date(t).toISOString().slice(0, 10);
          } else {
            v = String(v);
          }
        }
      }
      payload[name] = v;

      if (!errors[name] && required) {
        const empty =
          v === null ||
          v === "" ||
          v === undefined ||
          (Array.isArray(v) && v.length === 0);
        if (empty) {
          errors[name] = "Required";
          continue;
        }
      }

      if (errors[name] || v == null || isFiley) continue;
      const rules: any = validate || {};
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

      if (!errors[name] && enumOpts && enumOpts.length) {
        const allowed = new Set(enumOpts.map((o: any) => o.value));
        if (!allowed.has(v)) errors[name] = "Invalid value";
      }
    }

    return { payload, errors };
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr(null);

    const { payload, errors } = normalizeAndValidate();
    setFieldErrors(errors);

    console.log(errors);

    if (Object.keys(errors).length) {
      setBusy(false);
      return;
    }

    try {
      if (isAuth) {
        await onSaved?.(payload);
      } else {
        let apiResponse: any;

        if (isEdit && pk) {
          apiResponse = await update((value as any)?.id ?? payload.id, payload);
        } else {
          apiResponse = await create(payload);
        }
        onSaved?.({
          success: true,
          response: apiResponse,
        });
      }
    } catch (e: any) {
      setErr(String(e?.message || e));
      const serverPayload =
        e?.response?.data ?? // axios-style
        e?.data ?? // fetch-wrapped libs sometimes
        e?.body ?? // custom wrappers
        e;
      onSaved?.({
        success: false,
        response: serverPayload,
        error: e,
      });
    } finally {
      setBusy(false);
    }
  };

  if (loading)
    return (
      <Card className="shadow-none">
        <CardContent className="p-6">Loading form…</CardContent>
      </Card>
    );
  if (error)
    return (
      <Card className="shadow-none">
        <CardContent className="p-6 text-red-500">{error}</CardContent>
      </Card>
    );

  return (
    <div className="shadow-none">
      <form onSubmit={handleSubmit} className="">
        {schema
          .filter((f) => f.name !== "id")
          .map((field) => {
            const ui = (field as any).ui || {};
            return (
              <div
                key={field.name}
                className={cn("flex flex-col gap-2", ui.columnClassName)}
              >
                {ui?.none_input ? (
                  <>
                    {ui.label_hidden ? null : (
                      <Label className={cn("capitalize", ui.label_class)}>
                        {ui.label || prettyLabel(field.name)}
                        {field.required ? (
                          <span className="text-red-500 ml-1">*</span>
                        ) : null}
                      </Label>
                    )}
                    <FieldControl
                      field={field as any}
                      value={form[field.name]}
                      onChange={(v) => updateField(field.name, v)}
                      error={fieldErrors[field.name]}
                      busy={busy}
                    />
                  </>
                ) : (
                  <>
                    <Label className={cn("capitalize", ui.label_class)}>
                      {ui.label || prettyLabel(field.name)}
                      {field.required ? (
                        <span className="text-red-500 ml-1">*</span>
                      ) : null}
                    </Label>
                    <FieldControl
                      field={field as any}
                      value={form[field.name]}
                      onChange={(v) => updateField(field.name, v)}
                      error={fieldErrors[field.name]}
                    />
                    {fieldErrors[field.name] && (
                      <span className="text-xs text-red-500">
                        {fieldErrors[field.name]}
                      </span>
                    )}
                  </>
                )}
              </div>
            );
          })}

        {onAutoSave || isAuth ? null : (
          <div className="col-span-full flex gap-2 pt-2">
            <Button type="submit" className="w-28" disabled={busy}>
              {busy ? "Saving…" : "Save"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-28"
              onClick={() => onCancel?.()}
              disabled={busy}
            >
              Cancel
            </Button>
            {err && <span className="text-red-500 text-sm ml-2">{err}</span>}
          </div>
        )}
      </form>
    </div>
  );
}
