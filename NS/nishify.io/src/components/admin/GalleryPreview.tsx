"use client";

import React from "react";

type GalleryPreviewProps = {
  items: (string | File)[];
  onChange?: (newItems: (string | File)[]) => void;
};

export const GalleryPreview: React.FC<GalleryPreviewProps> = ({
  items,
  onChange,
}) => {
  if (!Array.isArray(items) || items.length === 0) return null;

  const handleRemove = (index: number) => {
    if (!onChange) return;
    const newItems = [...items];
    newItems.splice(index, 1);
    onChange(newItems);
  };

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {items.map((it, i) => {
        const src =
          typeof it === "string"
            ? it.startsWith("http")
              ? it
              : `/static/images/${it}`
            : URL.createObjectURL(it);

        return (
          <div
            key={i}
            className="relative w-16 h-16 bg-muted rounded overflow-hidden border border-gray-300"
          >
            <img
              src={src}
              alt={`img-${i}`}
              className="w-full h-full object-cover"
            />
            {onChange && (
              <button
                type="button"
                onClick={() => handleRemove(i)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
              >
                ×
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};
