"use client";

import { AppSidebar } from "@/components/dashboard-component/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import React, { useEffect, useState } from "react";
import { useClient } from "@/providers/ClientProvider";
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/use-session";
import { LogOut } from "lucide-react";

export const DashboardTemplate = ({
  children,
  name,
  menu,
  activeKey,
  title,
  rightExtras,
}: {
  children: React.ReactNode;
  name: string;
  menu: any;
  activeKey?: string;
  title?: string;
  rightExtras?: React.ReactNode;
}) => {
  const { activeClient, setActiveClient } = useClient();
  const [clients, setClients] = useState<string[]>([]);
  const router = useRouter();
  const { logout } = useSession();

  useEffect(() => {
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
        console.error("Failed to fetch clients:", err);
      }
    };
    fetchClients();
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <SidebarProvider>
        <AppSidebar menu={menu} activeKey={activeKey} title={title} />
        <SidebarInset className="overflow-hidden">
          <div className="h-full">
            <header className="sticky top-0 z-[1] flex h-14 shrink-0 items-center justify-between gap-2 border-b bg-background px-4 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mx-2 data-[orientation=vertical]:h-4"
                />
                <h1 className="text-lg font-semibold capitalize text-slate-800 dark:text-slate-200">
                  {name}
                </h1>
                <span className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider hidden sm:inline-block">
                  SuperAdmin Database Control
                </span>
              </div>
              <div className="flex items-center gap-3">
                {clients.length > 0 && (
                  <select
                    className="text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 text-slate-700 dark:text-slate-200 outline-none cursor-pointer uppercase tracking-wider font-semibold"
                    value={activeClient}
                    onChange={(e) => {
                      setActiveClient(e.target.value);
                      window.location.reload();
                    }}
                  >
                    {clients.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                )}
                <button
                  type="button"
                  onClick={() => router.push("/admin/settings")}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                >
                  Advanced Settings
                </button>
                <div className="w-px h-4 bg-slate-200 dark:bg-slate-700" />
                <button
                  type="button"
                  onClick={() => logout()}
                  className="text-xs font-semibold text-red-500 hover:text-red-600 transition-colors flex items-center gap-1.5"
                >
                  <LogOut className="h-3 w-3" />
                  Logout
                </button>
              </div>
            </header>

            {/* Content */}
            <div>{children}</div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};
