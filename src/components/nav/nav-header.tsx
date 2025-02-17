import { ArchiveIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Label } from "@/components/ui/label";
import { SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarInput, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator, useSidebar } from "@/components/ui/sidebar";
import { SITE_TITLE } from "@/config/site";
import { cn } from "@/lib/utils";

export default function NavHeader() {
  const pathname = usePathname();
  const { open } = useSidebar();

  function handleOpenSearch() {
    console.log("search dialog opened");
  }

  return (
    <>
      {!open ? (
        <>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/dashboard">
                  <SidebarMenuButton tooltip={SITE_TITLE} className={cn(pathname === "/dashboard" && "bg-sidebar-accent")}>
                    <ArchiveIcon className={cn("text-base", pathname === "/dashboard" && "text-primary")} />
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleOpenSearch} tooltip="Search" className={cn(pathname === "/dashboard/search" && "bg-sidebar-accent")}>
                  <SearchIcon className={cn("text-base", pathname === "/dashboard/search" && "text-primary")} />
                  <span className="sr-only">Search</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarSeparator />
        </>
      ) : (
        <SidebarHeader className="px-4 py-2">
          <SidebarGroup className="p-0">
            <SidebarGroupContent className="mb-0">
              <SidebarMenu>
                <SidebarMenuItem className="h-12 flex items-center mb-2">
                  <Link href="/dashboard" className="flex gap-3 items-center justify-center">
                    <div className="p-2 rounded-full bg-background">
                      <ArchiveIcon className="text-primary size-5" />
                    </div>
                    <span className="text-lg font-bold underline-offset-4 underline decoration-primary truncate max-w-[175px]">{SITE_TITLE}</span>
                  </Link>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <form className="relative">
                    <Label htmlFor="search" className="sr-only">
                      Search
                    </Label>
                    <SearchIcon className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
                    <SidebarInput id="search" placeholder="Search..." className="pl-8" />
                  </form>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarHeader>
      )}
    </>
  );
}
