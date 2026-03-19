"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type DatePickerProps = {
  value?: Date | string; // allow string too
  onChange?: (date: string | undefined) => void;
};

// format as YYYY-MM-DD using *local* getters
const formatLocalYMD = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

// parse "YYYY-MM-DD" as *local* midnight (avoid UTC shift)
const parseLocalYMD = (s: string) => new Date(`${s}T00:00:00`);

export function DatePicker({ value, onChange }: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(
    typeof value === "string" ? parseLocalYMD(value) : value
  );

  React.useEffect(() => {
    if (typeof value === "string") {
      const parsed = parseLocalYMD(value);
      setDate(isNaN(parsed.getTime()) ? undefined : parsed);
    } else {
      setDate(value);
    }
  }, [value]);

  const changeHandle = (prop: Date | undefined) => {
    if (!prop) return onChange?.(undefined);
    onChange?.(formatLocalYMD(prop));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id="date"
          className="w-full justify-between font-normal form-input"
        >
          {date ? formatLocalYMD(date) : "Select date"}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          captionLayout="dropdown"
          onSelect={(d) => {
            setDate(d);
            changeHandle(d);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
