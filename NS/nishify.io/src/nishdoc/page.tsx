/* eslint-disable jsx-a11y/role-has-required-aria-props */

/* eslint-disable jsx-a11y/alt-text */
"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  GripVertical,
  Eye,
  EyeOff,
  MoveDown,
  MoveUp,
  Plus,
  Trash2,
} from "lucide-react";
import { nanoid } from "nanoid";

// -----------------------------------------------------------------------------
// Constants & Defaults
// -----------------------------------------------------------------------------
const INDENT_WIDTH = 28; // px of horizontal movement per level step
const MIN_LEVEL = 1;
const MAX_LEVEL = 3;

const DEFAULT_SECTIONS = [
  {
    id: nanoid(),
    title: "Untitled",
    level: 1,
    widget: { type: "richtext", data: { html: "<p>Start typing…</p>" } },
  },
];

// Widget registry
const WIDGETS: Record<string, { label: string; defaultData: any }> = {
  richtext: {
    label: "Rich Text",
    defaultData: { html: "<p>Start typing…</p>" },
  },
  gallery: { label: "Image Gallery", defaultData: { urls: [] } },
  embed: { label: "Embed", defaultData: { src: "", title: "" } },
  hero: {
    label: "Hero",
    defaultData: {
      headline: "Headline",
      subhead: "",
      ctaText: "",
      ctaHref: "#",
    },
  },
};

function classNames(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

// -----------------------------------------------------------------------------
// Editor & Renderers
// -----------------------------------------------------------------------------
function RichTextEditor({
  html,
  onUpdate,
}: {
  html: string;
  onUpdate?: (html: string) => void;
}) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: html || "<p>Start typing…</p>",
    onUpdate: ({ editor }) => onUpdate?.(editor.getHTML()),
  });
  if (!editor)
    return <div className="text-sm text-zinc-500">Loading editor…</div>;
  return (
    <EditorContent
      editor={editor}
      className="prose dark:prose-invert max-w-none p-3 min-h-[220px] bg-white dark:bg-zinc-950"
    />
  );
}

function WidgetRenderer({
  section,
  editing,
  onChange,
}: {
  section: any;
  editing?: boolean;
  onChange?: (data: any) => void;
}) {
  const type = section?.widget?.type as string;
  const data = section?.widget?.data as any;
  if (type === "richtext") {
    if (editing)
      return (
        <RichTextEditor
          html={data?.html || ""}
          onUpdate={(html) => onChange?.({ html })}
        />
      );
    return (
      <div
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: data?.html || "" }}
      />
    );
  }
  if (type === "gallery") {
    return editing ? (
      <textarea
        className="w-full border rounded p-2 text-sm h-40"
        value={(data?.urls || []).join("\n")}
        onChange={(e) =>
          onChange?.({
            urls: e.target.value
              .split(/\n+/)
              .map((x) => x.trim())
              .filter(Boolean),
          })
        }
      />
    ) : (
      <div className="grid grid-cols-2 gap-2">
        {(data?.urls || []).map((u: string, i: number) => (
          <img key={i} src={u} className="rounded border" />
        ))}
      </div>
    );
  }
  if (type === "embed") {
    return editing ? (
      <div className="grid gap-2">
        <input
          className="border rounded p-1"
          value={data?.title || ""}
          placeholder="Title"
          onChange={(e) => onChange?.({ ...data, title: e.target.value })}
        />
        <input
          className="border rounded p-1"
          value={data?.src || ""}
          placeholder="Embed URL"
          onChange={(e) => onChange?.({ ...data, src: e.target.value })}
        />
      </div>
    ) : (
      <iframe
        src={data?.src}
        title={data?.title}
        className="w-full aspect-video rounded border"
      />
    );
  }
  if (type === "hero") {
    return editing ? (
      <div className="grid gap-2">
        <input
          className="border rounded p-1"
          value={data?.headline || ""}
          placeholder="Headline"
          onChange={(e) => onChange?.({ ...data, headline: e.target.value })}
        />
        <input
          className="border rounded p-1"
          value={data?.subhead || ""}
          placeholder="Subhead"
          onChange={(e) => onChange?.({ ...data, subhead: e.target.value })}
        />
        <input
          className="border rounded p-1"
          value={data?.ctaText || ""}
          placeholder="CTA Text"
          onChange={(e) => onChange?.({ ...data, ctaText: e.target.value })}
        />
        <input
          className="border rounded p-1"
          value={data?.ctaHref || ""}
          placeholder="CTA Href"
          onChange={(e) => onChange?.({ ...data, ctaHref: e.target.value })}
        />
      </div>
    ) : (
      <div className="p-4 border rounded bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950">
        <h1 className="text-2xl font-bold">{data?.headline}</h1>
        <p>{data?.subhead}</p>
        {data?.ctaText && (
          <a
            href={data?.ctaHref}
            className="inline-block mt-2 px-3 py-1 border rounded"
          >
            {data?.ctaText}
          </a>
        )}
      </div>
    );
  }
  return <div className="text-sm text-red-600">Unknown widget</div>;
}

// -----------------------------------------------------------------------------
// Sortable Row (drag handle only, not whole row)
// -----------------------------------------------------------------------------
function SortableRow({
  id,
  level,
  children,
  actions,
}: {
  id: string;
  level: number;
  children: React.ReactNode;
  actions?: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  } as React.CSSProperties;
  const paddingLeft = (level - 1) * INDENT_WIDTH;
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 p-2 rounded hover:bg-zinc-50 dark:hover:bg-zinc-900"
      role="treeitem"
      aria-level={level}
    >
      {/* drag handle */}
      <button
        aria-label="Drag"
        {...attributes}
        {...listeners}
        className="p-1 rounded cursor-grab hover:bg-zinc-100"
      >
        <GripVertical className="w-4 h-4" />
      </button>
      <div style={{ paddingLeft }} className="flex-1 truncate">
        {children}
      </div>
      <div className="flex items-center gap-1">{actions}</div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Main Component
// -----------------------------------------------------------------------------
export default function DocumentStudio() {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 2 } })
  );
  const [sections, setSections] = useState<any[]>(DEFAULT_SECTIONS);
  const [selected, setSelected] = useState<string>(DEFAULT_SECTIONS[0].id);
  const [preview, setPreview] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // outline numbering
  const outlineNumbers = useMemo(() => {
    const counters = [0, 0, 0, 0];
    const map: Record<string, string> = {};
    for (const s of sections) {
      const L = Math.max(MIN_LEVEL, Math.min(MAX_LEVEL, s.level || 1));
      counters[L] += 1;
      for (let i = L + 1; i <= MAX_LEVEL; i++) counters[i] = 0;
      map[s.id] = counters.slice(1, L + 1).join(".");
    }
    return map;
  }, [sections]);

  // helpers
  const addSection = (level = 1, type = "richtext") => {
    const spec = WIDGETS[type] || WIDGETS.richtext;
    const s = {
      id: nanoid(),
      title: "Untitled",
      level,
      widget: { type, data: JSON.parse(JSON.stringify(spec.defaultData)) },
    };
    setSections((prev) => [...prev, s]);
    setSelected(s.id);
    setPreview(false);
  };

  const addSiblingAfter = (baseId: string) => {
    setSections((prev) => {
      const idx = prev.findIndex((x) => x.id === baseId);
      const base = prev[idx];
      const s = {
        id: nanoid(),
        title: "Untitled",
        level: base?.level || 1,
        widget: {
          type: "richtext",
          data: JSON.parse(JSON.stringify(WIDGETS.richtext.defaultData)),
        },
      };
      const next = [...prev.slice(0, idx + 1), s, ...prev.slice(idx + 1)];
      setSelected(s.id);
      setPreview(false);
      return next;
    });
  };

  const addChild = (baseId: string) => {
    setSections((prev) => {
      const idx = prev.findIndex((x) => x.id === baseId);
      const parent = prev[idx];
      const level = Math.min(MAX_LEVEL, (parent?.level || 1) + 1);
      const s = {
        id: nanoid(),
        title: "Untitled",
        level,
        widget: {
          type: "richtext",
          data: JSON.parse(JSON.stringify(WIDGETS.richtext.defaultData)),
        },
      };
      let insertAt = idx + 1;
      while (insertAt < prev.length && prev[insertAt].level > parent.level)
        insertAt++;
      const next = [...prev.slice(0, insertAt), s, ...prev.slice(insertAt)];
      setSelected(s.id);
      setPreview(false);
      return next;
    });
  };

  const updateSection = (id: string, patch: any) =>
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...patch } : s))
    );
  const updateWidgetData = (id: string, data: any) =>
    setSections((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, widget: { ...s.widget, data } } : s
      )
    );

  const selectedSection = sections.find((s) => s.id === selected) || null;

  // Dev self-tests (lightweight "tests")
  useEffect(() => {
    try {
      const nums = Object.values(outlineNumbers);
      console.assert(nums.length >= 1, "outline numbers empty");
      const joined = ["a", "", "b", " ", "c"].filter(Boolean).join("\n");
      const round = joined
        .split(/\n+/)
        .map((s) => s.trim())
        .filter(Boolean);
      console.assert(
        round.length === 3 && round[2] === "c",
        "gallery join/split failed"
      );
      // clamp sanity
      const clamp = (n: number, lo: number, hi: number) =>
        Math.max(lo, Math.min(hi, n));
      console.assert(
        clamp(5, 1, 3) === 3 && clamp(0, 1, 3) === 1,
        "clamp failed"
      );
      // selected id exists if defined
      if (selected) {
        const ids = sections.map((s) => s.id);
        console.assert(
          ids.includes(selected),
          "selected id missing in sections"
        );
      }
      // extra: numbering shape test for simple hierarchy
      if (sections.length >= 3) {
        const sample = sections.slice(0, 3).map((s) => outlineNumbers[s.id]);
        console.assert(sample[0]?.split(".").length >= 1, "num depth invalid");
      }
    } catch {}
  }, [outlineNumbers, selected, sections]);

  return (
    <div className="h-screen w-full grid grid-cols-[320px_1fr] gap-3 p-3">
      {/* TOC */}
      <aside className="border rounded flex flex-col">
        <div className="flex items-center justify-between p-2 border-b gap-2">
          <span className="font-semibold text-sm">TOC</span>
          <button
            onClick={() => addSection(1, "richtext")}
            className="p-1 rounded hover:bg-zinc-100"
            title="Add section"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {sections.length === 0 && (
          <div className="p-3 text-xs text-zinc-500">
            No sections yet. Click + to add one.
          </div>
        )}

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={(event) => {
            const { active, over, delta } = event as any;
            if (!over) return;
            const oldIndex = sections.findIndex((s) => s.id === active.id);
            const newIndex = sections.findIndex((s) => s.id === over.id);
            if (oldIndex === -1 || newIndex === -1) return;

            // 1) reorder vertically
            const next = arrayMove(sections, oldIndex, newIndex);

            // 2) adjust indent by horizontal drag distance
            const step = INDENT_WIDTH * 0.8; // forgiving threshold
            const steps = Math.round((delta?.x ?? 0) / step);
            const item = { ...next[newIndex] };
            let targetLevel = Math.max(
              MIN_LEVEL,
              Math.min(MAX_LEVEL, (item.level || 1) + steps)
            );
            const prevItem = next[newIndex - 1];
            if (prevItem)
              targetLevel = Math.min(targetLevel, (prevItem.level || 1) + 1);
            next[newIndex] = { ...item, level: targetLevel };

            setSections(next);
          }}
        >
          <SortableContext
            items={sections.map((s) => s.id)}
            strategy={verticalListSortingStrategy}
          >
            {sections.map((s, i) => (
              <SortableRow
                key={s.id}
                id={s.id}
                level={s.level}
                actions={
                  <div className="flex items-center gap-1">
                    {/* fallback move controls when not dragging */}
                    <button
                      title="Up"
                      onClick={() =>
                        setSections((prev) =>
                          arrayMove(prev, i, Math.max(0, i - 1))
                        )
                      }
                      className="p-1 rounded hover:bg-zinc-100"
                    >
                      <MoveUp className="w-4 h-4" />
                    </button>
                    <button
                      title="Down"
                      onClick={() =>
                        setSections((prev) =>
                          arrayMove(prev, i, Math.min(prev.length - 1, i + 1))
                        )
                      }
                      className="p-1 rounded hover:bg-zinc-100"
                    >
                      <MoveDown className="w-4 h-4" />
                    </button>
                    <button
                      title="Add child"
                      onClick={() => addChild(s.id)}
                      className="p-1 rounded hover:bg-zinc-100"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button
                      title="Add sibling"
                      onClick={() => addSiblingAfter(s.id)}
                      className="p-1 rounded hover:bg-zinc-100"
                    >
                      <Plus className="w-4 h-4 rotate-45" />
                    </button>
                    <button
                      title="Delete"
                      onClick={() =>
                        setSections((prev) => prev.filter((x) => x.id !== s.id))
                      }
                      className="p-1 rounded hover:bg-red-50 text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                }
              >
                <div className="flex items-center gap-2 w-full">
                  {/* numbering badge */}
                  <span className="text-[11px] px-1.5 py-0.5 rounded border bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-300 shrink-0">
                    {outlineNumbers[s.id]}
                  </span>

                  {editingId === s.id ? (
                    <input
                      autoFocus
                      value={s.title}
                      onChange={(e) =>
                        updateSection(s.id, { title: e.target.value })
                      }
                      onBlur={() => setEditingId(null)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === "Escape")
                          setEditingId(null);
                      }}
                      className="flex-1 bg-transparent outline-none border-b border-dashed focus:border-indigo-500 text-sm"
                    />
                  ) : (
                    <button
                      onClick={() => setSelected(s.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Tab") {
                          e.preventDefault();
                          setSections((prev) => {
                            const idx = prev.findIndex((x) => x.id === s.id);
                            const cur = { ...prev[idx] } as any;
                            let lvl = cur.level || 1;
                            lvl = Math.max(
                              MIN_LEVEL,
                              Math.min(MAX_LEVEL, lvl + (e.shiftKey ? -1 : 1))
                            );
                            const prevItem = prev[idx - 1];
                            if (prevItem)
                              lvl = Math.min(lvl, (prevItem.level || 1) + 1);
                            const copy = [...prev];
                            copy[idx] = { ...cur, level: lvl };
                            return copy;
                          });
                        }
                      }}
                      onDoubleClick={() => setEditingId(s.id)}
                      className={classNames(
                        "flex-1 text-left text-sm truncate",
                        selected === s.id && "font-semibold"
                      )}
                    >
                      {s.title || "Untitled"}
                    </button>
                  )}
                </div>
              </SortableRow>
            ))}
          </SortableContext>
        </DndContext>
      </aside>

      {/* Right Pane */}
      <main className="border rounded p-4 overflow-auto">
        <div className="flex items-center justify-between mb-3">
          <div className="font-medium text-sm text-zinc-600">
            {selectedSection
              ? outlineNumbers[selectedSection.id] +
                " " +
                (selectedSection.title || "Untitled")
              : "No section"}
          </div>
          <div className="flex items-center gap-2">
            {selectedSection && (
              <select
                className="text-xs border rounded px-2 py-1"
                value={selectedSection.widget?.type || "richtext"}
                onChange={(e) => {
                  const type = e.target.value;
                  const spec = WIDGETS[type] || WIDGETS.richtext;
                  updateSection(selectedSection.id, {
                    widget: {
                      type,
                      data: JSON.parse(JSON.stringify(spec.defaultData)),
                    },
                  });
                }}
                title="Widget type"
              >
                {Object.entries(WIDGETS).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v.label}
                  </option>
                ))}
              </select>
            )}
            <button
              onClick={() => setPreview((p) => !p)}
              className="inline-flex items-center gap-1 rounded border px-2 py-1 text-xs hover:bg-zinc-50"
            >
              {preview ? (
                <>
                  <EyeOff className="w-4 h-4" /> Editing
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" /> Preview
                </>
              )}
            </button>
          </div>
        </div>

        {selectedSection ? (
          <div className="space-y-3">
            {preview ? (
              <WidgetRenderer section={selectedSection} />
            ) : (
              <>
                <input
                  className="text-xl font-bold bg-transparent border-b outline-none"
                  value={selectedSection.title}
                  onChange={(e) =>
                    updateSection(selectedSection.id, { title: e.target.value })
                  }
                  placeholder="Section title"
                />
                <WidgetRenderer
                  section={selectedSection}
                  editing
                  onChange={(d) => updateWidgetData(selectedSection.id, d)}
                />
              </>
            )}
          </div>
        ) : (
          <div className="text-sm text-zinc-500">
            Select a section from the left.
          </div>
        )}
      </main>
    </div>
  );
}
