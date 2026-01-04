"use client"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "./breadcrumb";
import { usePathname } from "next/navigation";

export function LayoutBreadcrumb() {
  const pathname = usePathname();
  const breadcrumb = pathname.split("/").filter(Boolean).slice(1).map((segment) => ({
    label: segment.charAt(0).toUpperCase() + segment.slice(1),
    href: `/${segment}`,
  }));
  console.log(breadcrumb);
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          {breadcrumb.length == 1 && <BreadcrumbSeparator />}
        </BreadcrumbItem>
        {breadcrumb.map((item) => (
          <BreadcrumbItem key={item.href}>
            <BreadcrumbLink href={ breadcrumb.length > 1 ? item.href : `/dashboard/${item.href}`}>{item.label}</BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}