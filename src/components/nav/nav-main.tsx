"use client";

import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, useSidebar } from "@/components/ui/sidebar";
import { SidebarItem } from "@/config/site";
import { cn } from "@/lib/utils";

export function NavMain({ items }: { items: SidebarItem[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const { open } = useSidebar();

  function handleSidebarItemClick(url: string) {
    if (!open && url !== pathname) {
      router.push(url);
    }
  }
  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarGroupLabel>Platform</SidebarGroupLabel>

        {items.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={pathname.startsWith(item.url)} className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title} className={cn(pathname === item.url && "bg-sidebar-accent")} onClick={() => handleSidebarItemClick(item.url)}>
                  {item.icon && <item.icon className={cn("text-base", pathname.startsWith(item.url) && "text-primary")} />}
                  <span className="text-base font-semibold">{item.title}</span>
                  <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild className={cn(pathname === subItem.url && "bg-sidebar-accent")}>
                        <Link href={subItem.url}>
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
