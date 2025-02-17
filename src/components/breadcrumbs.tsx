"use client";

import { usePathname } from "next/navigation";
import React from "react";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function Breadcrumbs() {
  const pathname = usePathname();

  const pathSegments = pathname.split("?")[0].split("/").filter(Boolean);

  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join("/")}`;

    const words = segment.split("-");
    const label = words.map((word, i) => (i === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word)).join(" ");

    return { href, label };
  });

  if (breadcrumbs.length === 0) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <React.Fragment key={crumb.href}>
              <BreadcrumbItem>
                {isLast ? (
                  <>
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  </>
                ) : (
                  <>
                    <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
                  </>
                )}
              </BreadcrumbItem>
              {!isLast && (
                <>
                  <BreadcrumbSeparator className="hidden md:block" />
                </>
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
