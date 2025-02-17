import type { LucideIcon } from "lucide-react";
import { DrillIcon, LocateFixedIcon, PackageIcon } from "lucide-react";

export const DATABASE_PREFIX = "inventoryManager";
export const SITE_TITLE = "Inventory manager";
export const SITE_TITLE_TEMPLATE = "%s - Inventory manager";
export const SITE_DESCRIPTION = "Manage your assets.";

export type SidebarItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
  items?: SidebarSubItem[];
};

export type SidebarSubItem = {
  title: string;
  url: string;
};

export const sidebarItems: SidebarItem[] = [
  {
    title: "Assets",
    url: "/dashboard/assets",
    icon: PackageIcon,
    items: [
      {
        title: "Create",
        url: "/dashboard/assets/create",
      },
      {
        title: "Favorties",
        url: "/dashboard/assets/favorites",
      },
      {
        title: "Recently added",
        url: "/dashboard/assets/recently-added",
      },
    ],
  },
  {
    title: "Locations",
    url: "/dashboard/locations",
    icon: LocateFixedIcon,
    items: [
      {
        title: "Create",
        url: "/dashboard/locations/create",
      },
      {
        title: "Edit",
        url: "/dashboard/locations/edit",
      },
    ],
  },
  {
    title: "Tools",
    url: "/dashboard/tools",
    icon: DrillIcon,
    items: [
      {
        title: "Import/Export",
        url: "/dashboard/tools?tool=import-export",
      },
      {
        title: "Reports",
        url: "/dashboard/tools?tool=report",
      },
    ],
  },
];
