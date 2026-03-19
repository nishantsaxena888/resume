"use client";

import renderBlueberry from "@/ui-template/blueberry/dynamic-render/render";

export const rootComponentMap = {
  ...renderBlueberry,
};

export function getDynamicComponent(type: string) {
  return rootComponentMap[type] || null;
}
