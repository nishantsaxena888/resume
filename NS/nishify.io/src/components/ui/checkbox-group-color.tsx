import React, { useState } from "react";
import { cn } from "@/lib/utils";

export const CheckboxGroupColor = ({ value, onChange, options, ui }: any) => {
  const [expanded, setExpanded] = useState(false);

  // normalize value so we never iterate undefined/null
  const selected: string[] = Array.isArray(value) ? value : [];

  // view more/less only if ui.max provided
  const hasMax = typeof ui?.max === "number" && ui.max > 0;
  const visibleOptions = hasMax
    ? expanded
      ? options
      : options?.slice(0, ui.max)
    : options;

  const toggle = (val: string) => {
    if (selected.includes(val)) {
      onChange(selected.filter((v) => v !== val));
    } else {
      onChange([...selected, val]);
    }
  };

  return (
    <div className="text-left">
      {/* swatches */}
      <div className="flex flex-wrap gap-3">
        {visibleOptions?.map((option: any, index: number) => {
          const isChecked = selected.includes(option.value);
          return (
            <button
              key={index}
              type="button"
              onClick={() => toggle(option.value)}
              role="checkbox"
              aria-checked={isChecked}
              title={option.label}
              className={cn(
                "relative inline-flex items-center justify-center w-5 h-5 rounded-full ring-1 ring-black/5 transition-transform",
                "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black/20",
                isChecked && "scale-95"
              )}
              style={{ backgroundColor: option.color }}
            >
              {/* white check overlay when selected */}
              {isChecked && (
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="w-4 h-4 text-white"
                >
                  <path
                    fill="currentColor"
                    d="M9.0 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"
                  />
                </svg>
              )}
              <span className="sr-only">{option.label}</span>
            </button>
          );
        })}
      </div>

      {/* View more / less */}
      {hasMax && options?.length > ui.max && (
        <button
          type="button"
          onClick={() => setExpanded((p) => !p)}
          className="mt-3 text-sm text-blue-600 hover:underline"
        >
          {expanded ? "View less" : "View more"}
        </button>
      )}
    </div>
  );
};
