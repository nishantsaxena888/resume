"use client";

import * as React from "react";
import Link from "next/link";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useMenu } from "@/hooks/use-menu";
import {
  BadgeDollarSign,
  BanknoteArrowDown,
  Calculator,
  ChartBar,
  CirclePercent,
  Component,
  ContactRound,
  LayoutGridIcon,
  MapPin,
  ReceiptText,
  ShoppingBag,
  ShoppingCart,
  UserRound,
  UsersRound,
  Warehouse,
  Waypoints,
  type LucideIcon,
} from "lucide-react";

type NavItem = {
  title?: string;
  url?: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: NavItem[];
  key?: string; // supports "app__entity" or "entity"
  href?: string;
  label?: string;
};

type NavOrder = {
  app_order?: string[];
  entity_order?: Record<string, string[]>;
};

export function NavMain({
  items,
  activeKey,
  title,
  navOrder, // <-- pass adminConfig.nav_order here
  debug = true, // turn off if you want silence
}: {
  items: NavItem[];
  activeKey: string;
  title: string;
  navOrder?: NavOrder;
  debug?: boolean;
}) {
  const menu_list: any = items;
  const m = useMenu({ items: menu_list, activeKey, placement: "left" });
  const DEBUG = debug;

  const pretty = (s: string) =>
    String(s || "")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (mm) => mm.toUpperCase());

  const ICONS: Record<string, LucideIcon> = {
    item_category: ChartBar,
    tax_group: Calculator,
    price_group: BadgeDollarSign,
    customer: UserRound,
    purchase_order: ShoppingCart,
    purchase_order_item: ShoppingBag,
    invoice: ReceiptText,
    invoice_item: BanknoteArrowDown,
    salesperson: ContactRound,
    inventory: Warehouse,
    inventory_location: MapPin,
    cash_discount_group: CirclePercent,
    vendor: UsersRound,
    secondary_category: Component,
    state: Waypoints,
  };

  type Row = {
    key: string;
    href: string;
    label: string;
    icon?: LucideIcon;
    app: string;
    entity: string;
  };

  // ✅ Minimal change: accept flat "entity" keys by assigning them to a default app
  const rows: Row[] = React.useMemo(() => {
    const src = Array.isArray(m?.items) ? (m.items as any[]) : [];
    const defaultApp = (navOrder?.app_order && navOrder.app_order[0]) || "core";

    const out = src
      .map((it) => {
        const rawKey = String(it.key ?? it.title ?? "").trim();
        if (!rawKey) return null;

        let app: string;
        let entity: string;

        if (rawKey.includes("__")) {
          const parts = rawKey.split("__").filter(Boolean);
          if (parts.length !== 2) return null;
          [app, entity] = parts;
        } else {
          // flat key (e.g. "vendor") → group under default app
          app = defaultApp;
          entity = rawKey;
          if (DEBUG) {
            console.warn(
              `[NavMain] Non-namespaced key "${rawKey}" → grouping under app "${app}"`
            );
          }
        }

        const raw = String(it.label ?? it.title ?? pretty(entity));
        const clean =
          rawKey.includes("__") && raw.startsWith(`${pretty(app)} `)
            ? raw.slice(pretty(app).length + 1)
            : raw;

        return {
          // keep original key for active highlighting to work in both modes
          key: rawKey,
          href: it.href ?? it.url ?? "#",
          label: clean,
          icon: it.icon as LucideIcon | undefined,
          app,
          entity,
        } as Row;
      })
      .filter(Boolean) as Row[];

    if (DEBUG) {
      console.groupCollapsed("%c[NavMain] rows", "color:#6b7280");
      console.table(
        out.map((r) => ({
          key: r.key,
          app: r.app,
          entity: r.entity,
          label: r.label,
          href: r.href,
        }))
      );
      console.groupEnd();
    }

    return out;
  }, [m?.items, navOrder?.app_order, DEBUG]);

  // Group by app
  const grouped = React.useMemo(() => {
    const g: Record<string, Row[]> = {};
    for (const r of rows) (g[r.app] ||= []).push(r);
    if (DEBUG) {
      console.groupCollapsed("%c[NavMain] grouped by app", "color:#6b7280");
      Object.entries(g).forEach(([app, list]) => {
        console.log(
          app,
          "→",
          list.map((x) => x.entity)
        );
      });
      console.groupEnd();
    }
    return g;
  }, [rows, DEBUG]);

  // Order helper
  const orderBySeq = (list: string[], seq?: string[]) => {
    if (!seq?.length) return list.slice().sort();
    const index = new Map(seq.map((v, i) => [v, i]));
    return list.slice().sort((a, b) => {
      const ia = index.has(a)
        ? (index.get(a) as number)
        : Number.MAX_SAFE_INTEGER;
      const ib = index.has(b)
        ? (index.get(b) as number)
        : Number.MAX_SAFE_INTEGER;
      return ia === ib ? a.localeCompare(b) : ia - ib;
    });
  };

  // Top-level order
  const apps = React.useMemo(() => {
    const present = Object.keys(grouped);
    const pref = navOrder?.app_order || [];
    const inPref = present.filter((a) => pref.includes(a));
    const notInPref = present.filter((a) => !pref.includes(a)).sort();
    const orderedApps = [...orderBySeq(inPref, pref), ...notInPref];

    if (DEBUG) {
      console.groupCollapsed("%c[NavMain] app ordering", "color:#16a34a");
      console.log("present:", present);
      console.log("navOrder.app_order:", navOrder?.app_order);
      console.log("ordered apps:", orderedApps);
      const missingInPresent = (navOrder?.app_order || []).filter(
        (a) => !present.includes(a)
      );
      if (missingInPresent.length) {
        console.warn("apps in navOrder but missing in data:", missingInPresent);
      }
      console.groupEnd();
    }

    return orderedApps;
  }, [grouped, navOrder?.app_order, DEBUG]);

  // Snapshot logger
  React.useEffect(() => {
    if (!DEBUG) return;
    console.groupCollapsed("%c[NavMain] snapshot", "color:#3b82f6");
    console.log("title:", title, "activeKey:", activeKey);
    console.log("navOrder:", navOrder);
    console.log("apps:", apps);
    apps.forEach((app) => {
      const children = grouped[app] || [];
      const seq = navOrder?.entity_order?.[app] || [];
      const entityNames = children.map((c) => c.entity);
      const missingInChildren = seq.filter((s) => !entityNames.includes(s));
      const extraInChildren = entityNames.filter((e) => !seq.includes(e));
      console.groupCollapsed(`app "${app}"`);
      console.log("seq (desired):", seq);
      console.log("children (actual):", entityNames);
      if (missingInChildren.length) {
        console.warn("in seq but NOT present:", missingInChildren);
      }
      if (extraInChildren.length) {
        console.info(
          "present but NOT in seq (sorted A→Z at end):",
          extraInChildren
        );
      }
      console.groupEnd();
    });
    console.groupEnd();
  }, [DEBUG, apps, grouped, navOrder, title, activeKey]);

  const renderEntity = (r: Row) => {
    const Icon = r.icon || ICONS[r.entity] || LayoutGridIcon;
    return (
      <SidebarMenuItem key={r.key}>
        <SidebarMenuButton
          asChild
          tooltip={r.label}
          isActive={r.key === activeKey}
          className="rounded-[var(--theme-radius)]"
        >
          <Link href={r.href}>
            <Icon className="text-slate-600 dark:text-white" />
            <span className="capitalize sidebar-menu">{r.label}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  return (
    <>
      {apps.length === 0 ? (
        <SidebarGroup>
          <SidebarGroupLabel>{title}</SidebarGroupLabel>
          <SidebarMenu />
        </SidebarGroup>
      ) : (
        apps.map((app) => {
          const children = grouped[app] || [];
          const seq = navOrder?.entity_order?.[app] || [];
          const ordered = children.slice().sort((a, b) => {
            const ia = seq.indexOf(a.entity);
            const ib = seq.indexOf(b.entity);
            const aa = ia < 0 ? Number.MAX_SAFE_INTEGER : ia;
            const bb = ib < 0 ? Number.MAX_SAFE_INTEGER : ib;
            return aa === bb ? a.entity.localeCompare(b.entity) : aa - bb;
          });

          if (DEBUG) {
            console.groupCollapsed(
              `%c[NavMain] render "${app}"`,
              "color:#d97706"
            );
            console.log(
              "ordered entities:",
              ordered.map((x) => x.entity)
            );
            console.groupEnd();
          }

          return (
            <SidebarGroup key={app}>
              <SidebarGroupLabel>{pretty(app)}</SidebarGroupLabel>
              <SidebarMenu>{ordered.map(renderEntity)}</SidebarMenu>
            </SidebarGroup>
          );
        })
      )}
    </>
  );
}
