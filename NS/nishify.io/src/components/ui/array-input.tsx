import React from "react";
import { Input } from "./input";
import { Button } from "./button";
import { Switch } from "./switch"; // ← ShadCN switch (adjust path if you centralize: "@/components/ui/switch")
import { Plus, Trash2 } from "lucide-react";

export type InputArrayType = {
  label: string;
  value: string;
  featured?: boolean; // ← NEW
};

type Props = {
  className?: string;
  ui?: any;
  value?: InputArrayType[];
  onChange: (next: InputArrayType[]) => void;
};

/** A single row, memoized to avoid re-rendering siblings while typing */
const ArrayInputRow = React.memo(function ArrayInputRow({
  index,
  item,
  onLabelChange,
  onValueChange,
  onFeaturedChange,
  onAdd,
  onRemove,
}: {
  index: number;
  item: InputArrayType;
  onLabelChange: (idx: number, v: string) => void;
  onValueChange: (idx: number, v: string) => void;
  onFeaturedChange: (idx: number, v: boolean) => void;
  onAdd: () => void;
  onRemove: (idx: number) => void;
}) {
  return (
    <div className="grid grid-cols-[1fr_1fr_auto_auto] gap-2 items-center">
      <Input
        placeholder="Enter your label"
        value={item.label}
        onChange={(e) => onLabelChange(index, e.target.value)}
      />
      <Input
        placeholder="Enter your value"
        value={item.value}
        onChange={(e) => onValueChange(index, e.target.value)}
      />

      {/* NEW: Featured switch */}
      <div className="flex items-center gap-2">
        <Switch
          checked={!!item.featured}
          onCheckedChange={(v) => onFeaturedChange(index, v)}
          aria-label={`Toggle featured for row ${index + 1}`}
        />
        <span className="text-sm text-muted-foreground select-none">
          Featured
        </span>
      </div>

      <div className="flex gap-1 justify-end">
        <Button type="button" onClick={onAdd} aria-label="Add row">
          <Plus size={16} />
        </Button>
        <Button
          type="button"
          onClick={() => onRemove(index)}
          aria-label={`Remove row ${index + 1}`}
        >
          <Trash2 size={16} />
        </Button>
      </div>
    </div>
  );
});

export const ArrayInput: React.FC<Props> = ({ value = [], onChange }) => {
  // Keep a local reference; don't reconstruct inside render branches
  const inputArray = value;

  // useCallback so child gets stable handler references
  const updateLabel = React.useCallback(
    (idx: number, v: string) => {
      const next = inputArray.map((item, i) =>
        i === idx ? { ...item, label: v } : item
      );
      onChange(next);
    },
    [inputArray, onChange]
  );

  const updateValue = React.useCallback(
    (idx: number, v: string) => {
      const next = inputArray.map((item, i) =>
        i === idx ? { ...item, value: v } : item
      );
      onChange(next);
    },
    [inputArray, onChange]
  );

  // NEW: featured toggle handler
  const updateFeatured = React.useCallback(
    (idx: number, v: boolean) => {
      const next = inputArray.map((item, i) =>
        i === idx ? { ...item, featured: v } : item
      );
      onChange(next);
    },
    [inputArray, onChange]
  );

  const addRow = React.useCallback(() => {
    onChange([...inputArray, { label: "", value: "", featured: false }]); // default featured: false
  }, [inputArray, onChange]);

  const removeRow = React.useCallback(
    (idx: number) => {
      const next = inputArray.filter((_, i) => i !== idx);
      onChange(next);
    },
    [inputArray, onChange]
  );

  return (
    <div className="space-y-2">
      {inputArray?.length === 0 && (
        <div className="border border-dashed p-4 rounded-md text-center">
          <Button type="button" onClick={addRow}>
            <Plus className="mr-1" size={16} /> Add item
          </Button>
        </div>
      )}

      {inputArray?.map((item, index) => (
        <ArrayInputRow
          key={index} // If possible, use a stable id instead
          index={index}
          item={{ featured: false, ...item }} // ensure backward compat default
          onLabelChange={updateLabel}
          onValueChange={updateValue}
          onFeaturedChange={updateFeatured}
          onAdd={addRow}
          onRemove={removeRow}
        />
      ))}
    </div>
  );
};
