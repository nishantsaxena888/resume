"use client";

import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useEntity } from "@/hooks";
// import { useEntity } from '@/hooks/use-entity'

type Ctl = ReturnType<typeof useEntity>;

export default function SiteListing({
  entity,
  ctl,
  refreshKey,
}: {
  entity: string;
  ctl: Ctl;
  refreshKey: number;
}) {
  useEffect(() => {
    ctl.refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  if (ctl.loading)
    return <div className="p-4 text-sm text-muted-foreground">Loading…</div>;
  if (ctl.error)
    return <div className="p-4 text-sm text-red-500">{ctl.error}</div>;

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {ctl.pageItems.length === 0 && (
        <div className="p-4 text-sm text-muted-foreground">
          No {entity} found.
        </div>
      )}

      {ctl.pageItems.map((r, i) => (
        <Card key={r.id ?? i} className="p-4 hover:shadow-sm transition">
          <div className="mb-1 truncate text-base font-medium">
            {String(r.name ?? r.id ?? "")}
          </div>
          <div className="space-y-1 text-sm text-muted-foreground">
            {Object.entries(r)
              .slice(0, 6)
              .map(([k, v]) => (
                <div key={k} className="flex gap-2">
                  <span className="min-w-24 shrink-0 text-foreground/80">
                    {k.replace(/_/g, " ")}:
                  </span>
                  <span className="truncate">{formatCell(v)}</span>
                </div>
              ))}
          </div>
        </Card>
      ))}

      <div className="col-span-full mt-2 flex items-center justify-between text-sm">
        <div>
          Page {ctl.curPage} / {ctl.totalPages}
        </div>
        <div className="flex gap-2">
          <button
            className="rounded border px-2 py-1"
            onClick={() => ctl.setPage(1)}
            disabled={ctl.curPage === 1}
          >
            {"<<"}
          </button>
          <button
            className="rounded border px-2 py-1"
            onClick={() => ctl.setPage((p) => Math.max(1, p - 1))}
            disabled={ctl.curPage === 1}
          >
            {"<"}
          </button>
          <button
            className="rounded border px-2 py-1"
            onClick={() => ctl.setPage((p) => Math.min(ctl.totalPages, p + 1))}
            disabled={ctl.curPage >= ctl.totalPages}
          >
            {">"}
          </button>
          <button
            className="rounded border px-2 py-1"
            onClick={() => ctl.setPage(ctl.totalPages)}
            disabled={ctl.curPage >= ctl.totalPages}
          >
            {">>"}
          </button>
        </div>
      </div>
    </div>
  );
}

function formatCell(v: any) {
  if (v === null || v === undefined) return "";
  if (typeof v === "boolean") return v ? "Yes" : "No";
  if (typeof v === "string" && /^[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(v))
    return v.slice(0, 10);
  return String(v);
}
