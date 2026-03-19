"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type Direction = "vertical" | "horizontal";

export type GroupCheckboxProps = {
  options: any[];
  /** selected values */
  value: any[];
  /** callback with the next selected values */
  onChange: (next: any[]) => void;

  /** layout props */
  direction?: Direction; // default: vertical
  columns?: number; // for horizontal/grid layouts
  className?: string;

  /** aria */
  "aria-label"?: string;
  "aria-labelledby"?: string;
};

export function GroupCheckbox({
  options,
  value,
  onChange,
  direction = "vertical",
  columns,
  className,
  ...aria
}: GroupCheckboxProps) {
  const setChecked = React.useCallback(
    (optValue: string, checked: boolean) => {
      if (checked) {
        if (!value?.includes(optValue)) onChange([...value, optValue]);
      } else {
        if (value?.includes(optValue))
          onChange(value?.filter((v) => v !== optValue));
      }
    },
    [onChange, value]
  );

  const containerClass =
    direction === "vertical"
      ? "flex flex-col gap-2"
      : cn(
          "grid gap-2",
          typeof columns === "number" && columns > 0
            ? `grid-cols-${Math.min(columns, 6)}`
            : "grid-cols-2 md:grid-cols-3"
        );

  return (
    <div
      role="group"
      className={cn(containerClass, className)}
      {...aria}
      // helpful to avoid accidental text selection during rapid clicks
      onMouseDown={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.userSelect = "none";
        setTimeout(() => (el.style.userSelect = ""), 0);
      }}
    >
      {options.map((opt) => {
        const id = `gc_${opt.value.replace(/\s+/g, "_")}`;
        const checked = value?.includes(opt.value);

        return (
          <div key={opt.value} className="inline-flex items-center gap-2">
            <Checkbox
              id={id}
              checked={checked}
              disabled={opt.disabled}
              onCheckedChange={(c) => setChecked(opt.value, Boolean(c))}
            />
            <Label
              htmlFor={id}
              className={cn(
                "cursor-pointer",
                opt.disabled && "cursor-not-allowed opacity-60"
              )}
            >
              {opt.label}
            </Label>
          </div>
        );
      })}
    </div>
  );
}
