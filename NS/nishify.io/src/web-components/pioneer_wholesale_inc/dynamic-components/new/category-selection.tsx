import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CategorySelection({ menu }: any) {
  return (
    <Select defaultValue={menu?.[0]?.value}>
      <SelectTrigger className="w-[180px] border-none shadow-none ">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {menu.map((item: any) => {
            return (
              <SelectItem key={item.label} value={item.value}>
                {item?.label}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
