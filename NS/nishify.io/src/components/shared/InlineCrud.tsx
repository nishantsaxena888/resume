"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  PlusIcon,
  Edit3Icon,
  Trash2Icon,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import GenericForm from "@/components/admin/GenericForm";
import { useEntity } from "@/hooks/use-entity-crud";

// type Ctl = ReturnType<typeof useEntity>

export default function InlineCrud({
  entity,
  preferredColumns = [],
  maxColumns,
}: {
  entity: string;
  preferredColumns?: string[];
  maxColumns?: number;
}) {
  const ctl = useEntity(entity, {
    preferredColumns,
    maxColumns,
    mode: "client",
  });
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Record<string, any> | null>(null);
  const [refreshTick, setRefreshTick] = useState(0);

  // external refresh trigger (e.g. after save/delete)
  useEffect(() => {
    ctl.refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshTick]);

  const openCreate = () => {
    setEditing(null);
    setShowForm(true);
  };
  const openEdit = (row: Record<string, any>) => {
    setEditing(row);
    setShowForm(true);
  };
  const handleSaved = () => {
    setShowForm(false);
    setEditing(null);
    setRefreshTick((t) => t + 1);
  };

  const sortIndicator = (key: string) =>
    ctl.isSortedAsc(key) ? " ▲" : ctl.isSortedDesc(key) ? " ▼" : "";
  const headerLabel = (c: string) => c.replace(/_/g, " ");

  return (
    <div className="flex h-full flex-col gap-3">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-3 border-b bg-background px-3 py-2">
        <div className="font-semibold capitalize">
          {entity.replace(/_/g, " ")} list
        </div>
        <div className="flex items-center gap-3">
          <Input
            value={ctl.qInput}
            onChange={(e) => ctl.setQInput(e.target.value)}
            placeholder={`Search ${entity}…`}
            className="w-64"
          />
          <div className="flex items-center gap-2">
            <Switch
              checked={ctl.mode === "server"}
              onCheckedChange={(v) => ctl.setMode(v ? "server" : "client")}
            />
            <Label className="text-xs text-muted-foreground">
              {ctl.mode === "server" ? "Server" : "Client"}
            </Label>
          </div>
          <Button onClick={openCreate}>
            <PlusIcon className="mr-2 h-4 w-4" /> Add
          </Button>
        </div>
      </div>

      {/* Inline form area */}
      {showForm && (
        <Card className="p-3">
          <GenericForm
            entity={entity}
            value={editing}
            onSaved={handleSaved}
            onCancel={() => {
              setShowForm(false);
              setEditing(null);
            }}
          />
        </Card>
      )}

      {/* Table */}
      <div className="rounded-md border">
        {ctl.loading ? (
          <div className="p-4 text-sm text-muted-foreground">Loading…</div>
        ) : ctl.error ? (
          <div className="p-4 text-sm text-red-500">{ctl.error}</div>
        ) : (
          <div className="relative w-full overflow-auto">
            <Table className="w-full caption-bottom text-sm">
              <TableHeader className="sticky top-0 z-10 bg-muted [&_tr]:border-b">
                <TableRow className="hover:bg-muted/50">
                  {ctl.cols.map((c) => (
                    <TableHead
                      key={String(c)}
                      className="h-10 cursor-pointer select-none px-4 capitalize"
                      onClick={() => ctl.toggleSort(String(c))}
                    >
                      {headerLabel(String(c))}
                      <span className="ml-1 opacity-70">
                        {sortIndicator(String(c))}
                      </span>
                    </TableHead>
                  ))}
                  <TableHead className="px-4 text-right">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {ctl.pageItems.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={Math.max(1, ctl.cols.length + 1)}
                      className="px-4 py-6 text-center text-sm text-muted-foreground"
                    >
                      No data found
                    </TableCell>
                  </TableRow>
                ) : (
                  ctl.pageItems.map((r, i) => (
                    <TableRow
                      key={r.id ?? `${ctl.startIndex + i}`}
                      className="hover:bg-muted/50"
                    >
                      {ctl.cols.map((c) => (
                        <TableCell key={String(c)} className="px-4">
                          {formatCell(r[String(c)])}
                        </TableCell>
                      ))}
                      <TableCell className="whitespace-nowrap px-4 text-right">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => openEdit(r)}
                        >
                          <Edit3Icon className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={async () => {
                            await ctl.deleteById(r?.id);
                            setRefreshTick((t) => t + 1);
                          }}
                        >
                          <Trash2Icon className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2 text-sm text-muted-foreground">
        <div>
          {ctl.effectiveTotal.toLocaleString()}{" "}
          {ctl.effectiveTotal === 1 ? "item" : "items"} • Page {ctl.curPage} /{" "}
          {ctl.totalPages}
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="outline"
            onClick={() => ctl.setPage(1)}
            disabled={ctl.curPage === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={() => ctl.setPage((p) => Math.max(1, p - 1))}
            disabled={ctl.curPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={() => ctl.setPage((p) => Math.min(ctl.totalPages, p + 1))}
            disabled={ctl.curPage >= ctl.totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={() => ctl.setPage(ctl.totalPages)}
            disabled={ctl.curPage >= ctl.totalPages}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function formatCell(v: any) {
  if (v == null) return "";
  if (typeof v === "boolean") return v ? "Yes" : "No";
  if (typeof v === "string" && /^[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(v))
    return v.slice(0, 10);
  return String(v);
}
