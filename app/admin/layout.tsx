import type { Metadata } from "next";
import { headers } from "next/headers";

import { getCurrentAdminSession } from "@/lib/auth/server";
import { AdminShell } from "@/layouts/AdminShell";

export const metadata: Metadata = {
  robots: {
    follow: false,
    index: false,
  },
  title: "Admin | Nordhaven",
};

type AdminLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function AdminLayout({ children }: AdminLayoutProps) {
  return <AdminLayoutContent>{children}</AdminLayoutContent>;
}

async function AdminLayoutContent({ children }: AdminLayoutProps) {
  const requestHeaders = await headers();
  const pathname = requestHeaders.get("x-admin-pathname");

  if (pathname === "/admin/login") {
    return children;
  }

  const session = await getCurrentAdminSession();

  return <AdminShell session={session}>{children}</AdminShell>;
}
