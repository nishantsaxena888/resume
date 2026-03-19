import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React from "react";
import { headerLabel, sortIndicator } from "./g-lib";

export const GTableHeader = ({
  displayedCols,
  ctl,
}: {
  displayedCols: any;
  ctl: any;
}) => {
  return (
    <TableHeader className="[&_tr]:border-b bg-muted sticky top-0 z-10">
      <TableRow className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors">
        {displayedCols.map((c: any) => (
          <TableHead
            key={String(c)}
            className="capitalize cursor-pointer select-none text-foreground h-10 px-4 text-left align-middle font-medium"
            onClick={() => ctl.toggleSort(String(c))}
            title={headerLabel(c)}
          >
            {headerLabel(c)}{" "}
            <span className="ml-1 opacity-70">
              {sortIndicator(ctl, String(c))}
            </span>
          </TableHead>
        ))}
        <TableHead className="text-right px-4 sticky right-0 bg-muted border-l w-[180px]">
          Action
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};
