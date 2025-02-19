import Breadcrumbs from "@/components/breadcrumbs";
import { NavSidebar } from "@/components/nav/nav-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import db from "@/db";
import { owners, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // refactor with auth
  const [result] = await db
    .select({
      id: users.id,
      name: owners.name,
      email: users.email,
      imageUrl: owners.imageUrl ?? undefined,
    })
    .from(users)
    .innerJoin(owners, eq(users.id, owners.userId))
    .where(eq(users.email, "john@example.com"));

  const loggedInUser = {
    id: result.id,
    name: result.name,
    email: result.email,
    imageUrl: result.imageUrl ?? undefined,
    initials: result.name
      .split(" ")
      .map((n) => n[0])
      .join("."),
  };

  return (
    <SidebarProvider>
      <NavSidebar loggedInUser={loggedInUser} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumbs />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
