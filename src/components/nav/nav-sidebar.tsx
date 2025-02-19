"use client";

import NavHeader from "@/components/nav/nav-header";
import { NavMain } from "@/components/nav/nav-main";
import { NavUser } from "@/components/nav/nav-user";
import { Sidebar, SidebarContent, SidebarFooter, SidebarRail } from "@/components/ui/sidebar";
import { sidebarItems } from "@/config/site";
import { LoggedInUser } from "@/db/types";

export function NavSidebar({ loggedInUser, ...props }: React.ComponentProps<typeof Sidebar> & { loggedInUser: LoggedInUser }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <NavHeader />
      <SidebarContent>
        <NavMain items={sidebarItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser loggedInUser={loggedInUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
