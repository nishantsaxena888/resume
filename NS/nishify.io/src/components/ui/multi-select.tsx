"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandInput,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";

type Option = { label: string; value: string | number };

type Mixed = string | number | Record<string, any>;

type MultiSelectProps = {
  value: Mixed[];
  onChange: (next: Mixed[]) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
  searchable?: boolean;
  maxHeight?: number;
  disabled?: boolean;
  "aria-invalid"?: boolean;
};

function isObj(v: unknown): v is Record<string, any> {
  return typeof v === "object" && v !== null;
}

/**
 * A stable key for comparing selections.
 * - For objects: prefer id -> value -> name -> JSON string
 * - For primitives: String(v)
 */
function keyOf(v: Mixed): string {
  if (isObj(v)) {
    if ("id" in v && v.id != null) return String(v.id);
    if ("value" in v && v.value != null) return String(v.value);
    if ("name" in v && v.name != null) return String(v.name);
    try {
      return JSON.stringify(v);
    } catch {
      return String(v);
    }
  }
  return String(v);
}

/**
 * Human label for badges/list.
 * - For objects: prefer name -> label -> (lookup by id/value in options map) -> id -> JSON
 * - For primitives: lookup in options map -> String(v)
 */
function labelOf(v: Mixed, optMap: Map<string, string>): string {
  if (isObj(v)) {
    if ("name" in v && v.name != null) return String(v.name);
    if ("label" in v && v.label != null) return String(v.label);
    // Try to resolve by id/value to option label
    if ("id" in v && v.id != null)
      return optMap.get(String(v.id)) ?? String(v.id);
    if ("value" in v && v.value != null)
      return optMap.get(String(v.value)) ?? String(v.value);
    try {
      return JSON.stringify(v);
    } catch {
      return String(v);
    }
  }
  return optMap.get(String(v)) ?? String(v);
}

export function MultiSelect({
  value,
  onChange,
  options,
  placeholder = "Select…",
  className,
  searchable = true,
  maxHeight = 260,
  disabled,
  ...rest
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  // Map of option.value -> option.label for quick lookups
  const optionMap = React.useMemo(
    () => new Map(options.map((o) => [String(o.value), o.label])),
    [options]
  );

  // Set of selected keys for O(1) checks
  const selectedKeySet = React.useMemo(
    () => new Set(value.map((v) => keyOf(v))),
    [value]
  );

  const toggle = (optValue: string | number) => {
    const k = String(optValue);
    if (selectedKeySet.has(k)) {
      // remove any entry whose key matches k
      onChange(value.filter((v) => keyOf(v) !== k));
    } else {
      // append the primitive (keep your incoming shape intact)
      onChange([...value, optValue]);
    }
  };

  const clearOne = (v: Mixed) => {
    const k = keyOf(v);
    onChange(value.filter((x) => keyOf(x) !== k));
  };

  const selectedLabels = React.useMemo(
    () =>
      value.map((v) => ({ v, label: labelOf(v, optionMap), key: keyOf(v) })),
    [value, optionMap]
  );

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            className={cn(
              "w-full justify-between min-h-10 !pl-2",
              value?.length ? "pr-2" : "",
              className
            )}
            disabled={disabled}
            {...rest}
          >
            {value?.length ? (
              <div className="flex flex-wrap gap-1 items-center">
                {selectedLabels.map(({ v, label, key }) => (
                  <Badge
                    key={key}
                    variant="secondary"
                    className="flex items-center gap-1"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      clearOne(v);
                    }}
                  >
                    {label}
                    <X className="h-3.5 w-3.5 opacity-60" />
                  </Badge>
                ))}
              </div>
            ) : (
              <span className="text-muted-foreground pl-2">{placeholder}</span>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]">
          <Command>
            {searchable && (
              <CommandInput placeholder="Search…" className="h-9" />
            )}
            <CommandEmpty>No results.</CommandEmpty>
            <ScrollArea style={{ maxHeight }}>
              <CommandGroup>
                {options.map((opt) => {
                  const k = String(opt.value);
                  const checked = selectedKeySet.has(k);
                  return (
                    <CommandItem
                      key={k}
                      onSelect={() => toggle(opt.value)}
                      className="cursor-pointer"
                    >
                      <Checkbox
                        className="mr-2"
                        checked={checked}
                        onCheckedChange={() => toggle(opt.value)}
                      />
                      <span className="flex-1">{opt.label}</span>
                      {checked ? (
                        <Check className="ml-2 h-4 w-4 opacity-70" />
                      ) : null}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </ScrollArea>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
