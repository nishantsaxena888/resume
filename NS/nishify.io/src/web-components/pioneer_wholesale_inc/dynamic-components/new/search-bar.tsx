import * as React from "react";

import { CategorySelection } from "./category-selection";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export function SearchBar({ category_menu }: any) {
  return (
    <div className="flex items-center gap-0 border flex border bg-white rounded-sm w-[600px] max-[1399px]:w-[500px] max-[1199px]:w-[400px] max-[991px]:w-full max-[991px]:min-w-[300px] max-[767px]:mt-3 max-[767px]:mb-3 max-[480px]:min-w-[auto]">
      <div className="border-r border-solid border-[#eee] max-[991px]:hidden">
        <CategorySelection menu={category_menu} />
      </div>
      <Input
        placeholder="Search Product here"
        className="flex-1 !border-0 shadow-none outline-none focus:outline-none !rounded-sm"
      />
      <SearchIcon className="mr-3" size={20} />
    </div>
  );
}
