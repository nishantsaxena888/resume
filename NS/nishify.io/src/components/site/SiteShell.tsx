/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useMemo, useState } from "react";
import Menu from "@/components/admin/Menu"; // or '@/components/layout/Menu' if you moved it
import SiteTopBar from "./SiteTopBar";
import SiteListing from "./SiteListing";
import { useEntity } from "@/hooks/use-entity-crud"; // <-- useEntity (not useEntityList)
import { useClientConfig } from "@/lib/get-client-cfg";

export default function SiteShell({ entity }: { entity: string }) {
  const cfg = useClientConfig();

  // ONE shared controller for the page
  const ctl = useEntity(entity, { mode: "client" });
  const [refreshTick, setRefreshTick] = useState(0);

  const items = useMemo(
    () =>
      Object.keys(cfg?.routing || {}).map((key) => ({
        key,
        href: `/site/${key}`,
      })),
    []
  );

  if (!cfg) return <div className="p-8 text-center text-muted-foreground">Loading configuration...</div>;

  return (
    <div className="flex h-dvh flex-col">
      <Menu items={items} activeKey={entity} placement="top" title="Entities" />
      <SiteTopBar
        entity={entity}
        ctl={ctl}
        onRefresh={() => setRefreshTick((t) => t + 1)}
      />
      <main className="flex-1 overflow-auto p-4">
        <SiteListing entity={entity} ctl={ctl} refreshKey={refreshTick} />
      </main>
    </div>
  );
}
