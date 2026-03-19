"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useEntity } from "@/hooks/use-entity-crud";
// type Ctl = ReturnType<typeof useEntity>

type Ctl = ReturnType<typeof useEntity>;

export default function SiteTopBar({
  entity,
  ctl,
  onRefresh,
}: {
  entity: string;
  ctl: Ctl;
  onRefresh: () => void;
}) {
  return (
    <div className="flex items-center justify-between border-b bg-background px-4 py-2">
      <div className="font-semibold capitalize">{entity} listing</div>
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
        <Button variant="outline" onClick={onRefresh}>
          Refresh
        </Button>
      </div>
    </div>
  );
}
