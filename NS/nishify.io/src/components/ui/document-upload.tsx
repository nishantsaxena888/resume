"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "./button";
import { LoaderCircle, XIcon } from "lucide-react";
import { useUpload } from "@/hooks/use-upload";
import { ValueType } from "./document-gallery-upload";

export function file_Conversion(temp_value: any): ValueType | null {
  let parsed: any = temp_value;

  // if it's a string, try parsing JSON
  if (typeof temp_value === "string") {
    try {
      parsed = JSON.parse(temp_value);
    } catch {
      return null;
    }
  }

  // check shape
  if (
    parsed &&
    typeof parsed.url === "string" &&
    typeof parsed.name === "string" &&
    typeof parsed.size === "number"
  ) {
    return parsed as ValueType;
  }

  return null;
}

export function DocumentUpload({
  value,
  onChange,
  allowedTypes = ["image/png", "image/jpeg", "application/pdf"],
  maxSizeMB = 5,
}: any) {
  const { data, onUpload, error, humanSize, process } = useUpload({
    value,
    onChange,
    allowedTypes,
    maxSizeMB,
  });

  return (
    <div className={`flex flex-col gap-3 `}>
      <div
        className={cn(
          "relative w-full flex items-center gap-3 rounded-md border border-input px-4 py-3 cursor-pointer hover:bg-accent hover:text-accent-foreground",
          error && "border-red-200 border-dashed"
        )}
      >
        {/* Left: thumb or placeholder */}
        {data?.url ? (
          <img
            src={data?.url}
            alt={data?.name ?? "image"}
            className="w-10 h-10 rounded-md object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-md grid place-items-center bg-gray-200 dark:bg-gray-800 text-muted-foreground text-[10px]">
            {process ? <LoaderCircle className="animate-spin" /> : "FILE"}
          </div>
        )}

        {/* Middle */}
        {error ? (
          <div className="min-w-0 flex-1">
            <div className="text-sm  text-red-500">{error}</div>
          </div>
        ) : (
          <div className="min-w-0 flex-1">
            {data?.url ? (
              <>
                <div
                  className="text-sm font-medium text-gray-900 truncate"
                  title={data?.name}
                >
                  <span className="line-clamp-3">{data?.name}</span>
                  {data?.size ? (
                    <span className="text-xs text-muted-foreground">
                      ({humanSize(data.size)})
                    </span>
                  ) : null}
                </div>
              </>
            ) : (
              <div className="text-sm text-muted-foreground">
                Please select file
              </div>
            )}
          </div>
        )}

        {/* Clear button */}
        <input
          type="file"
          onChange={(prop) => onUpload(prop.target.files![0])}
          className="absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer"
        />
        {data?.url ? (
          <Button
            type="button"
            variant={"ghost"}
            size={"icon"}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onChange(null);
            }}
            // disabled={disabled}
            aria-label="Remove"
            title="Remove"
            className="-mr-3 relative"
          >
            <XIcon />
          </Button>
        ) : null}
      </div>
    </div>
  );
}
