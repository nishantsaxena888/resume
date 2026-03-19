"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export const CheckboxGroupChip = ({ value, onChange, options, ui }: any) => {
  const [expanded, setExpanded] = useState(false);

  const selected: string[] = Array.isArray(value) ? value : [];

  const hasMax = typeof ui?.max === "number" && ui.max > 0;
  const visible = hasMax
    ? expanded
      ? options
      : options?.slice(0, ui.max)
    : options;

  const toggle = (val: string) => {
    if (selected.includes(val)) onChange(selected.filter((v) => v !== val));
    else onChange([...selected, val]);
  };

  return (
    <div className={cn("text-left")}>
      <div className="flex flex-wrap gap-3">
        {visible?.map((opt: any) => {
          const active = selected.includes(opt.value);
          return (
            <Button
              key={opt.value}
              type="button"
              role="checkbox"
              aria-checked={active}
              variant={active ? "default" : "outline"}
              onClick={() => toggle(opt.value)}
              className={cn("px-2 h-auto py-1 text-xs")}
              title={opt.label}
            >
              {opt.label}
            </Button>
          );
        })}
      </div>

      {hasMax && options?.length > ui.max && (
        <div className="mt-3">
          <button
            type="button"
            onClick={() => setExpanded((p) => !p)}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm font-medium transition-all border ring-1 ring-black/5",
              expanded
                ? "bg-indigo-500 text-white border-transparent hover:bg-indigo-600"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
            )}
          >
            {expanded ? ui?.lessLabel ?? "Less" : ui?.moreLabel ?? "More"}
          </button>
        </div>
      )}
    </div>
  );
};
