/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import React, { useMemo, useRef, useState } from "react";
import { Button } from "./button";
import {
  ChevronDown,
  ChevronUp,
  FullscreenIcon,
  PlusIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { API_BASE } from "@/lib/api/config";

/* ---------------- Types ---------------- */
export type ValueType = {
  url: string;
  name: string;
  size: number;
};

export function array_file_conversion(temp_value: any): ValueType[] {
  let parsed: any = temp_value;

  // if it's a string, try parsing JSON
  if (typeof temp_value === "string") {
    try {
      parsed = JSON.parse(temp_value);
    } catch {
      return [];
    }
  }

  // must be an array
  if (!Array.isArray(parsed)) return [];

  // filter/normalize
  return parsed.filter(
    (it: any) =>
      it &&
      typeof it.url === "string" &&
      typeof it.name === "string" &&
      typeof it.size === "number"
  );
}

export type GalleryUploadProps = {
  value?: ValueType[];
  onChange?: (prop: Array<ValueType>) => void;

  accept?: string | string[];

  disabled?: boolean;
  className?: string;
  filenamePrefix?: string;
  maxFiles?: number;
  maxFileSizeMB?: number;
  title?: string;
};
/* -------------------------------------- */

const CLIENT_NAME = process.env.NEXT_PUBLIC_CLIENT_NAME;

/* ---------------------------------------------------
   useUpload hook — uploads a File to your API
   --------------------------------------------------- */
function useUpload() {
  async function upload(file: File): Promise<ValueType> {
    const formData = new FormData();
    formData.append("files", file);

    const res = await fetch(`${API_BASE}/doc/`, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: formData,
    });
    if (!res.ok) {
      throw new Error(res.statusText || "Upload failed");
    }

    const data = await res.json();
    const item = data?.items?.[0];
    if (!item) throw new Error("Invalid server response");

    // Prefer absolute_ui_url -> ui_url -> url
    const url: string = item.absolute_ui_url ?? item.ui_url ?? item.url ?? "";

    return {
      url,
      name: item.stored_name ?? file.name,
      size: item.size ?? file.size,
    };
  }

  return { upload };
}

/* ---------------------------------------------------
   Helpers for validation and UI
   --------------------------------------------------- */
function normalizeAccept(accept?: string | string[]): string[] {
  if (!accept) return [];
  if (Array.isArray(accept)) return accept.map((s) => s.trim()).filter(Boolean);
  return accept
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function matchesAcceptToken(file: File, token: string): boolean {
  const name = (file.name || "").toLowerCase();
  const type = (file.type || "").toLowerCase();
  const t = token.toLowerCase();

  // extension: ".png"
  if (t.startsWith(".")) return name.endsWith(t);

  // wildcard mime: "image/*"
  if (t.endsWith("/*")) {
    const major = t.slice(0, t.indexOf("/*"));
    return type.startsWith(major + "/");
  }

  // exact mime: "image/png" or "application/pdf"
  return type === t;
}

function isAllowedByAccept(file: File, acceptList: string[]): boolean {
  if (acceptList.length === 0) return true; // nothing provided → allow all
  if (acceptList.includes("*/*")) return true; // special-case: accept everything
  return acceptList.some((t) => matchesAcceptToken(file, t));
}

function humanSize(bytes: number) {
  if (!Number.isFinite(bytes)) return "";
  if (bytes === 0) return "0B";
  const k = 1024;
  const units = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)}${units[i]}`;
}

function getNameFromUrl(s: string) {
  try {
    if (s.startsWith("/") || s.startsWith("http")) {
      const parts = s.split("?")[0].split("#")[0].split("/");
      return parts[parts.length - 1] || s;
    }
    return s;
  } catch {
    return s;
  }
}

function arrayMove<T>(arr: T[], from: number, to: number): T[] {
  const next = arr.slice();
  const item = next.splice(from, 1)[0];
  next.splice(to, 0, item);
  return next;
}

const hasUrlSchemeOrSlash = (s: string) =>
  s.startsWith("/") || s.startsWith("http");

const resolveUrl = (raw: string, filenamePrefix: string): string => {
  if (!hasUrlSchemeOrSlash(raw)) {
    return filenamePrefix.replace(/\/+$/, "") + "/" + raw.replace(/^\/+/, "");
  }
  return raw;
};

const hasImageExt = (s: string) =>
  /\.(png|jpe?g|gif|webp|avif|svg)(\?.*)?$/i.test(s);

/* ---------------------------------------------------
   Component
   --------------------------------------------------- */
export const DocumentGalleryUpload: React.FC<GalleryUploadProps> = ({
  value = [],
  onChange,
  accept = "*/*",
  disabled = false,
  className = "",
  filenamePrefix = `/assets/${CLIENT_NAME}/img/`,
  maxFiles = 10,
  maxFileSizeMB = 50,
  title = "Files",
}) => {
  const { upload } = useUpload();

  const items: ValueType[] = Array.isArray(value) ? value : [];
  const inputRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const openPicker = () => {
    if (!disabled) inputRef.current?.click();
  };

  /** Validate → enforce limits → upload (parallel) → append results */
  const addFiles = async (files: File[]) => {
    if (!files.length) return;

    const acceptList = normalizeAccept(accept);
    const maxBytes = maxFileSizeMB * 1024 * 1024;

    // validate each file
    const rejected: string[] = [];
    const valid: File[] = [];

    for (const f of files) {
      if (f.size > maxBytes) {
        rejected.push(`"${f.name}" is larger than ${maxFileSizeMB} MB`);
        continue;
      }
      if (!isAllowedByAccept(f, acceptList)) {
        rejected.push(
          `"${f.name}" is not an allowed type (${
            acceptList.join(", ") || "any"
          })`
        );
        continue;
      }
      valid.push(f);
    }

    if (rejected.length > 0) {
      setError(rejected[0]); // show the first error
    } else {
      setError(null);
    }

    if (valid.length === 0) return;

    const room = Math.max(0, maxFiles - items.length);
    if (room <= 0) {
      setError("File limit reached");
      return;
    }

    const toProcess = valid.slice(0, room);

    try {
      setUploading(true);
      // parallel uploads
      const results = await Promise.all(toProcess.map(upload));
      const next: ValueType[] = [...items, ...results];
      onChange?.(next);
    } catch (e: any) {
      setError(e?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // ✅ FIX: don’t await before touching e.currentTarget; clear value immediately.
  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputEl = e.currentTarget; // capture immediately
    const files = Array.from(inputEl?.files ?? []); // copy out
    if (inputEl) inputEl.value = ""; // clear right away
    void addFiles(files); // async, no more use of e
  };

  const removeAt = (idx: number) =>
    onChange?.(items.filter((_, i) => i !== idx));
  const removeAll = () => onChange?.([]);

  // Drag & drop reorder
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const onCardDragStart = (index: number) => (e: React.DragEvent) => {
    if (disabled) return;
    setDragIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", String(index));
  };
  const onCardDragOver = (index: number) => (e: React.DragEvent) => {
    if (disabled) return;
    e.preventDefault();
    setDragOverIndex(index);
    e.dataTransfer.dropEffect = "move";
  };
  const onCardDrop = (index: number) => (e: React.DragEvent) => {
    if (disabled) return;
    e.preventDefault();
    const from = dragIndex ?? Number(e.dataTransfer.getData("text/plain"));
    const to = index;
    setDragIndex(null);
    setDragOverIndex(null);
    if (!Number.isFinite(from) || from === to) return;
    onChange?.(arrayMove(items, from, to));
  };
  const onCardDragEnd = () => {
    setDragIndex(null);
    setDragOverIndex(null);
  };

  // Dropzone DnD
  const [isDragging, setDragging] = useState(false);
  const onDragOverZone = (e: React.DragEvent) => {
    if (disabled) return;
    e.preventDefault();
    setDragging(true);
  };
  const onDragLeaveZone = (e: React.DragEvent) => {
    if (disabled) return;
    e.preventDefault();
    setDragging(false);
  };
  // ✅ also no await here; fire-and-forget to avoid event reuse issues
  const onDropZone = (e: React.DragEvent) => {
    if (disabled) return;
    e.preventDefault();
    setDragging(false);
    const dtFiles = Array.from(e.dataTransfer.files || []);
    void addFiles(dtFiles);
  };

  // Cards (derive from ValueType list)
  const cards = useMemo(() => {
    return items.map((it) => {
      const full = resolveUrl(it.url, filenamePrefix);
      const isImg = hasImageExt(full);
      return {
        kind: (isImg ? "image" : "file") as "image" | "file",
        name: it.name || getNameFromUrl(full),
        sizeText: Number.isFinite(it.size) ? humanSize(it.size) : undefined,
        url: isImg ? full : null,
      };
    });
  }, [items, filenamePrefix]);

  const remaining = Math.max(0, maxFiles - items.length);

  // show/hide grid
  const [showGrid, setShowGrid] = useState(true);

  // Build a browser <input accept="..."> string even if you pass array
  const acceptAttr = useMemo(() => {
    const list = normalizeAccept(accept);
    if (typeof accept === "string" && accept.trim() === "*/*") return "*/*";
    return list.join(",");
  }, [accept]);

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {/* Dropzone */}
      <div
        onClick={openPicker}
        onDragOver={onDragOverZone}
        onDragLeave={onDragLeaveZone}
        onDrop={onDropZone}
        className={[
          "w-full rounded-2xl border-2 border-dashed px-6 py-10 text-center",
          "select-none cursor-pointer hover:bg-accent hover:text-accent-foreground border-input",
          isDragging ? "border-gray-400 bg-gray-50" : "border-gray-200",
          disabled ? "opacity-50 cursor-not-allowed" : "",
        ].join(" ")}
      >
        <div className="mx-auto mb-3 h-12 w-12 rounded-full border border-input grid place-items-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            className="opacity-75"
          >
            <path
              fill="currentColor"
              d="M12 3l4 4h-3v6h-2V7H8l4-4zm-7 14h14v2H5v-2z"
            ></path>
          </svg>
        </div>
        <div className="text-muted-foreground font-medium">
          Drop files here or{" "}
          <span className="text-primary underline">browse files</span>
        </div>
        <div className="mt-2 text-xs text-muted-foreground/70">
          Maximum file size: {maxFileSizeMB}MB • Maximum files: {maxFiles}
          {remaining === 0 ? " • Limit reached" : ""}
          {uploading ? " • Uploading..." : ""}
        </div>
        {error && (
          <div className="mt-2 text-xs text-destructive font-medium">
            {error}
          </div>
        )}
      </div>

      {cards.length > 0 && (
        <>
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-muted-foreground">
              {title} ({items.length})
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={"outline"}
                onClick={openPicker}
                disabled={disabled || remaining === 0 || uploading}
              >
                <PlusIcon /> Add files
              </Button>

              <Button
                type="button"
                variant={"outline"}
                onClick={removeAll}
                disabled={disabled || items.length === 0 || uploading}
              >
                <Trash2Icon /> Remove all
              </Button>
              <Button
                type="button"
                variant={"outline"}
                onClick={() => setShowGrid((s) => !s)}
              >
                {showGrid ? <ChevronDown /> : <ChevronUp />}
              </Button>
            </div>
          </div>

          {/* Cards grid (toggleable) */}
          {showGrid && (
            <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(180px,1fr))]">
              {cards.map((c, idx) => (
                <Card
                  key={idx}
                  index={idx}
                  dragging={dragIndex === idx}
                  dragOver={dragOverIndex === idx}
                  onDragStart={onCardDragStart(idx)}
                  onDragOver={onCardDragOver(idx)}
                  onDrop={onCardDrop(idx)}
                  onDragEnd={onCardDragEnd}
                  kind={c.kind}
                  name={c.name}
                  sizeText={c.sizeText}
                  imageUrl={c.kind === "image" ? c.url ?? undefined : undefined}
                  onRemove={() => removeAt(idx)}
                  disabled={disabled}
                />
              ))}
            </div>
          )}
        </>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={acceptAttr}
        multiple
        disabled={disabled}
        onChange={handleFilesSelected}
        className="hidden"
      />
    </div>
  );
};

function Card({
  dragging,
  dragOver,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  kind,
  name,
  sizeText,
  imageUrl,
  onRemove,
  disabled,
}: {
  index: number;
  dragging: boolean;
  dragOver: boolean;
  onDragStart: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onDragEnd: (e: React.DragEvent) => void;
  kind: "image" | "file";
  name: string;
  sizeText?: string;
  imageUrl?: string;
  onRemove?: () => void;
  disabled?: boolean;
}) {
  const canPreview = kind === "image" && !!imageUrl;

  return (
    <div
      role="listitem"
      aria-grabbed={dragging}
      draggable={!disabled}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
      className={[
        "group rounded-xl border bg-white dark:bg-background overflow-hidden transition",
        "border-input",
        dragging ? "opacity-70 ring-2 ring-primary" : "",
        dragOver ? "ring-2 ring-input" : "",
        disabled ? "cursor-not-allowed" : "cursor-grab active:cursor-grabbing",
      ].join(" ")}
    >
      <div className="h-40 bg-muted relative">
        {canPreview ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover select-none pointer-events-none"
          />
        ) : (
          <div className="w-full h-full grid place-items-center text-gray-400 select-none">
            <svg width="28" height="28" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm0 2l4 4h-4z"
              />
            </svg>
          </div>
        )}
        <div className="absolute top-2 right-2 flex gap-1">
          {canPreview && (
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  type="button"
                  className="w-auto h-auto p-2 rounded-full dark:bg-background dark:hover:bg-background/80"
                >
                  <FullscreenIcon />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[700px]">
                <DialogHeader>
                  <DialogTitle>{name}</DialogTitle>
                </DialogHeader>
                <div className="">
                  <img
                    src={imageUrl}
                    alt={name}
                    className="w-auto h-auto p-2 dark:bg-background dark:hover:bg-background/80"
                  />
                </div>
              </DialogContent>
            </Dialog>
          )}
          <Button
            variant="secondary"
            size="icon"
            type="button"
            className="w-auto h-auto p-2 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              onRemove?.();
            }}
          >
            <XIcon />
          </Button>
        </div>
      </div>
      <div className="px-4 py-3">
        <div
          className="truncate text-sm font-medium text-muted-foreground"
          title={name}
        >
          {name}
        </div>
        {sizeText && (
          <div className="text-xs text-muted-foreground/70 mt-1">
            {sizeText}
          </div>
        )}
      </div>
    </div>
  );
}
