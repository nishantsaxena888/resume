"use client";

import * as React from "react";
import {
  // AudioWaveform,
  // BadgePercent,
  // ChartLine,
  // Command,
  // Component,
  // Frame,
  GalleryVerticalEnd,
  // Group,
  // Map,
  // MonitorCog,
  // PieChart,
  // Settings,
  // Settings2,
  // ShoppingCart,
  // Users,
} from "lucide-react";

import { NavMain } from "@/components/dashboard-component/nav-main";
// import { NavUser } from "@/components/dashboard-component/nav-user";
import {
  Sidebar,
  SidebarContent,
  // SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import { useClientConfig } from "@/lib/get-client-cfg";

// export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
export function AppSidebar(props: any) {
  const cfg = useClientConfig();

  const { menu, activeKey, title, ...rest } = props; // <- strip them out

  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      {
        name: cfg?.app_name || "",
        logo: GalleryVerticalEnd,
        plan: "",
      },
    ],
  };
  return (
    <Sidebar collapsible="icon" {...rest}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={menu} activeKey={activeKey} title={title} debug={false}
          navOrder={cfg?.nav_order}
        />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  );
}
