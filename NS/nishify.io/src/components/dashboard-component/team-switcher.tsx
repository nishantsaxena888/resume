"use client";

import * as React from "react";
import { ChevronsUpDown, Database } from "lucide-react";
import { useClient } from "@/providers/ClientProvider";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function TeamSwitcher() {
  const { isMobile } = useSidebar();
  const { activeClient, setActiveClient } = useClient();
  const [clients, setClients] = React.useState<string[]>([]);

  React.useEffect(() => {
    const fetchClients = async () => {
      try {
        const base = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";
        const url = new URL(base);
        const endpoint = `${url.origin}/clients`;
        const res = await fetch(endpoint);
        if (res.ok) {
          const list = await res.json();
          setClients(list);
        }
      } catch (err) {
        console.error("Failed to fetch clients for sidebar:", err);
      }
    };
    fetchClients();
  }, []);

  // Parse client_name into company and environment
  const parts = activeClient.split("_");
  const envRaw = parts.length > 1 ? parts.pop() : "unknown";
  const companyRaw = parts.join(" ");

  const currentCompany = companyRaw || activeClient;
  const currentEnv = envRaw;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <Database className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight gap-0.5">
                <span className="truncate font-bold capitalize">{currentCompany}</span>
                <span className={`truncate text-[10px] w-fit font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm ${currentEnv === 'prod' ? 'bg-red-500/20 text-red-500' :
                    currentEnv === 'stage' ? 'bg-amber-500/20 text-amber-500' :
                      currentEnv === 'test' ? 'bg-blue-500/20 text-blue-500' :
                        'bg-emerald-500/20 text-emerald-500'
                  }`}>
                  ENV: {currentEnv}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg max-h-[60vh] overflow-y-auto"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              System Environments
            </DropdownMenuLabel>
            {clients.map((c, index) => {
              const cParts = c.split("_");
              const cEnv = cParts.length > 1 ? cParts.pop() : "unknown";
              const cCompany = cParts.join(" ") || c;

              return (
                <DropdownMenuItem
                  key={c}
                  onClick={() => setActiveClient(c)}
                  className={`gap-2 p-2 justify-between flex w-full ${activeClient === c ? "bg-accent text-accent-foreground" : ""}`}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex size-6 items-center justify-center rounded-md border text-slate-400">
                      <Database className="size-3.5 shrink-0" />
                    </div>
                    <span className="capitalize font-medium">{cCompany}</span>
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                    {cEnv}
                  </span>
                </DropdownMenuItem>
              )
            })}
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
