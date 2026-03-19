export type FieldKind =
  | "string"
  | "number"
  | "bool"
  | "date"
  | "enum"
  | "fk"
  | "file"
  | "image"
  | "image_gallery"
  | "json"
  | "array"
  | "object"
  | "heading"
  | "google_address"
  | "button"
  | "password"
  | "price_range";

export interface SchemaField {
  name: string;
  kind: FieldKind;
  label?: string;
  required?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  options?: Array<{ value: string | number; label: string }>;
  ref?: { entity: string; valueKey?: string; labelKey?: string };
  min?: number;
  max?: number;
  step?: number;
  className?: number;
  ui: any;
}

export interface EntityOptionsResponse {
  schema: SchemaField[];
}

export type Row = Record<string, unknown>;
