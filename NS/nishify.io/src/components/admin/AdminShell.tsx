/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useMemo, useState } from "react";
import GenericForm from "./GenericForm";
import GenericTable from "./GenericTable";
import dynamic from "next/dynamic";
import { useClientConfig } from "@/lib/get-client-cfg";

// ⭐ ADD THIS
import InventoryFilterDrawer from "./inventory-filter-drawer";

const DashboardTemplate = dynamic(
  () =>
    import("../dashboard-component/dashboard-template").then(
      (mod) => mod.DashboardTemplate
    ),
  { ssr: false }
);

export type Row = Record<string, any>;

export default function AdminShell({ entity }: { entity: string }) {
  const cfg = useClientConfig();

  const [selected, setSelected] = useState<Row | null>(null);
  const [refreshTick, setRefreshTick] = useState(0);

  // ---------------------- INVENTORY FILTER STATE ----------------------
  const [filters, setFilters] = useState({});

  // Drawer visibility
  const [showFilter, setShowFilter] = useState(false);

  // Convert drawer filters → backend filter format
  function applyFilters(f: any) {
    const backendFilters: Record<string, any> = {};

    Object.entries(f).forEach(([k, v]) => {
      if (!v) return;

      // convert ___contains → contains
      if (k.endsWith("__contains")) {
        backendFilters[k] = { op: "contains", value: v };
      } else {
        backendFilters[k] = { op: "eq", value: v };
      }
    });

    setFilters(backendFilters);
    setRefreshTick((t) => t + 1);
  }

  // ---------------------- UI STATE ----------------------
  const [viewMode, setViewMode] = useState<"both" | "form" | "table">("table");

  useEffect(() => {
    setSelected(null);
    setViewMode("table");
  }, [entity]);

  // ---------------------- MENU ----------------------
  const entities = useMemo(
    () =>
      Object.keys(cfg?.routing || {}).map((key) => ({
        key,
        href: `/admin/${key}`,
      })),
    [cfg]
  );

  const hasEntity = !!entity && entity.trim().length > 0;
  const title = hasEntity ? entity.replace(/_/g, " ") : "Admin";

  const isFormFocused = viewMode === "form";
  const isTableFocused = viewMode === "table";
  const showBoth = viewMode === "both";

  if (!cfg) {
    return <div className="p-8 text-center text-muted-foreground">Loading configuration...</div>;
  }

  return (
    <DashboardTemplate
      name={title}
      title="Entities"
      menu={entities}
      activeKey={hasEntity ? entity : undefined}
    >
      <main className="px-3 pt-1 pb-3 h-full flex flex-col min-h-0">
        {!hasEntity ? (
          <div className="rounded-md border p-6 text-sm text-muted-foreground">
            Select an entity from the menu to get started.
          </div>
        ) : (
          <div className="flex-1 min-h-0 flex flex-col gap-0 pt-3">
            {/* ---------- FORM PANEL ---------- */}
            {(!isTableFocused || showBoth) && (
              <section
                className={[
                  "group relative rounded-[var(--theme-radius)]",
                  "transition-all duration-200 ease-out border overflow-hidden",
                  "flex flex-col min-h-0",
                  showBoth
                    ? "max-h-[42dvh] min-h-[220px]"
                    : "h-[calc(100%-8px)]",
                  "bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60",
                ].join(" ")}
              >
                <div style={{ overflowAnchor: "none" }}>
                  <GenericForm
                    entity={entity}
                    value={selected}
                    onSaved={() => {
                      setSelected(null);
                      setRefreshTick((t) => t + 1);
                    }}
                    onCancel={() => {
                      setSelected(null);
                      setViewMode("table");
                    }}
                    showHeader={false}
                    density={"cozy"}
                  />
                </div>
              </section>
            )}

            {/* ---------- TABLE PANEL ---------- */}
            {(!isFormFocused || showBoth) && (
              <section
                className={[
                  showBoth
                    ? "max-h-[55dvh] min-h-[240px]"
                    : "h-[calc(100%-8px)]",
                  "overflow-hidden bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60",
                ].join(" ")}
              >

                {/* ⭐ FILTER BUTTON */}
                <div className="p-2 flex justify-end">
                  <button
                    onClick={() => setShowFilter(true)}
                    className="px-3 py-1 rounded border text-sm"
                  >
                    Filters
                  </button>
                </div>

                {/* ⭐ FILTER DRAWER */}
                {showFilter && (
                  <div className="absolute right-4 top-4 z-50">
                    <InventoryFilterDrawer
                      initialValues={filters}
                      onApply={(f) => {
                        applyFilters(f);
                        setShowFilter(false);
                      }}
                      onClose={() => setShowFilter(false)}
                    />
                  </div>
                )}

                <div className="flex-1 min-h-0 overflow-auto">
                  <GenericTable
                    entity={entity}
                    refreshKey={refreshTick}
                    filters={filters}   // ⭐ CONNECTED
                    onSelectRow={(row: any) => setSelected(row)}
                    viewMode={viewMode}
                    onToggleSplit={() => setViewMode(() => "form")}
                    editMode="form"
                  />
                </div>
              </section>
            )}
          </div>
        )}
      </main>
    </DashboardTemplate>
  );
}















// /* eslint-disable react-hooks/exhaustive-deps */
// "use client";

// import { useEffect, useMemo, useState } from "react";
// import GenericForm from "./GenericForm";
// import GenericTable from "./GenericTable";
// import dynamic from "next/dynamic";
// import { getClientCfg } from "@/lib/get-client-cfg";

// const DashboardTemplate = dynamic(
//   () =>
//     import("../dashboard-component/dashboard-template").then(
//       (mod) => mod.DashboardTemplate
//     ),
//   { ssr: false }
// );

// export type Row = Record<string, any>;

// export default function AdminShell({ entity }: { entity: string }) {
//   const cfg = getClientCfg();
//   const [selected, setSelected] = useState<Row | null>(null);
//   const [refreshTick, setRefreshTick] = useState(0);

//   // "both" = split; "form" = form fills right; "table" = table fills right
//   const [viewMode, setViewMode] = useState<"both" | "form" | "table">("table");

//   // UI tuning
//   // const [formDense, setFormDense] = useState(true);
//   // const [formOpen, setFormOpen] = useState(true);

//   useEffect(() => {
//     setSelected(null);
//     setViewMode("table");
//   }, [entity]);

//   const entities = useMemo(
//     () =>
//       Object.keys(cfg.routing || {}).map((key) => ({
//         key,
//         href: `/admin/${key}`,
//       })),
//     []
//   );

//   const hasEntity = !!entity && entity.trim().length > 0;
//   const title = hasEntity ? entity.replace(/_/g, " ") : "Admin";

//   const isFormFocused = viewMode === "form";
//   const isTableFocused = viewMode === "table";
//   const showBoth = viewMode === "both";

//   return (
//     <DashboardTemplate
//       name={title}
//       title="Entities"
//       menu={entities}
//       activeKey={hasEntity ? entity : undefined}
//     >
//       <main className="px-3 pt-1 pb-3 h-full flex flex-col min-h-0">
//         {!hasEntity ? (
//           <div className="rounded-md border p-6 text-sm text-muted-foreground">
//             Select an entity from the menu to get started.
//           </div>
//         ) : (
//           <div className="flex-1 min-h-0 flex flex-col gap-0 pt-3">
//             {/* ---------- FORM PANEL ---------- */}
//             {(!isTableFocused || showBoth) && (
//               <section
//                 className={[
//                   "group relative rounded-[var(--theme-radius)]  ",
//                   "transition-all duration-200 ease-out border overflow-hidden ",
//                   "flex flex-col min-h-0 ",
//                   showBoth
//                     ? "max-h-[42dvh] min-h-[220px]"
//                     : "h-[calc(100%-8px)]",
//                   " bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60",
//                 ].join(" ")}
//               >
//                 <div style={{ overflowAnchor: "none" }}>
//                   <GenericForm
//                     entity={entity}
//                     value={selected}
//                     onSaved={() => {
//                       setSelected(null);
//                       setRefreshTick((t) => t + 1);
//                     }}
//                     onCancel={() => {
//                       setSelected(null);
//                       setViewMode("table");
//                     }}
//                     showHeader={false}
//                     density={"cozy"}
//                   />
//                 </div>
//               </section>
//             )}

//             {/* ---------- TABLE PANEL (headerless) ---------- */}
//             {(!isFormFocused || showBoth) && (
//               <section
//                 className={[
//                   // "group relative rounded-b-[var(--theme-radius)] rounded-t-none  ",
//                   // "transition-all duration-200 ease-out",
//                   // "flex flex-col min-h-0",
//                   showBoth
//                     ? "max-h-[55dvh] min-h-[240px]"
//                     : "h-[calc(100%-8px)]",
//                   "overflow-hidden bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60",
//                 ].join(" ")}
//               >
//                 {/* 1px seam */}
//                 {/* <div className="h-px -mb-px bg-border" aria-hidden /> */}

//                 <div className="flex-1 min-h-0 overflow-auto">
//                   <GenericTable
//                     entity={entity}
//                     refreshKey={refreshTick}
//                     onSelectRow={(row: any) => setSelected(row)}
//                     // ↓ pass view + toggle so the control renders inside the table bar (after Export)
//                     viewMode={viewMode}
//                     onToggleSplit={() => setViewMode(() => "form")}
//                     editMode="form"
//                   />
//                 </div>
//               </section>
//             )}
//           </div>
//         )}
//       </main>
//     </DashboardTemplate>
//   );
// }
