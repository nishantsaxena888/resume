import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPinIcon } from "lucide-react";

export function LocationSelector({ menu }: any) {
  return (
    <>
      <Select defaultValue={menu?.[0]?.value}>
        <SelectTrigger className="w-[200px] transition-all duration-[0.3s] justify-between ease-in-out h-full text-left text-[#777] text-[14px] relative">
          <div className="flex items-center gap-3">
            <MapPinIcon className="text-primary" />
            <SelectValue
              className="flex-1 text-left"
              placeholder="Select a language "
            />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {menu?.map((item: any) => {
              return (
                <SelectItem key={item.label} value={item.value}>
                  {item?.label}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
