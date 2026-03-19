import React, { useState } from "react";
import { Checkbox } from "./checkbox";
import { Label } from "./label";
import { cn } from "@/lib/utils";

export const CheckboxGroup = ({ value, onChange, options, ui }: any) => {
  const [expanded, setExpanded] = useState(false);

  // if ui.max exists, apply view more/less
  const hasMax = typeof ui?.max === "number" && ui.max > 0;
  const visibleOptions = hasMax
    ? expanded
      ? options
      : options?.slice(0, ui.max)
    : options;

  return (
    <div className="text-left space-y-2">
      {visibleOptions?.map((option: any) => (
        <div key={option.value}>
          <Checkbox
            id={option.value}
            value={option.value}
            checked={value?.includes(option.value)}
            onCheckedChange={(checked) => {
              onChange(
                checked
                  ? [...value, option.value]
                  : value.filter((v: any) => v !== option.value)
              );
            }}
          />
          <Label className={cn(ui?.labelClassName)} htmlFor={option.value}>
            {option.label}
          </Label>
        </div>
      ))}

      {hasMax && options?.length > ui.max && (
        <button
          type="button"
          onClick={() => setExpanded((p) => !p)}
          className="text-sm text-blue-600 hover:underline mt-2"
        >
          {expanded ? "View less" : "View more"}
        </button>
      )}
    </div>
  );
};
