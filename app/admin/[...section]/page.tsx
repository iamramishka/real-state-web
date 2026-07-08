import Link from "next/link";
import { notFound } from "next/navigation";

import { AdminStatusBadge } from "@/components/admin/AdminStatusBadge";
import {
  adminContentModules,
  adminOperationsModules,
  type AdminModule,
} from "@/lib/admin/config";

type AdminSectionPageProps = Readonly<{
  params: Promise<{
    section: string[];
  }>;
}>;

const staticSections: AdminModule[] = [
  {
    description:
      "Configure site defaults, admin users, roles, and publishing rules.",
    href: "/admin/settings",
    id: "settings",
    owner: "Admin",
    status: "planned",
    title: "Settings",
  },
  {
    description:
      "Manage AI operations records for Claude, Codex, and human review.",
    href: "/admin/ai-ops",
    id: "ai-ops",
    owner: "Claude",
    status: "planned",
    title: "AI operations",
  },
];

const adminSections = [
  ...adminContentModules,
  ...adminOperationsModules,
  ...staticSections,
];

function getSection(pathname: string) {
  return adminSections.find((section) => section.href === pathname);
}

export default async function AdminSectionPage({
  params,
}: AdminSectionPageProps) {
  const { section } = await params;
  const pathname = `/admin/${section.join("/")}`;
  const activeSection = getSection(pathname);

  if (!activeSection) {
    notFound();
  }

  return (
    <main className="border-line bg-surface shadow-soft rounded-lg border p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-muted text-xs font-semibold tracking-[0.08em] uppercase">
            {activeSection.owner}
          </p>
          <h2 className="text-h2 text-ink mt-1 font-semibold">
            {activeSection.title}
          </h2>
          <p className="text-small text-muted mt-2 max-w-3xl">
            {activeSection.description}
          </p>
        </div>
        <AdminStatusBadge status={activeSection.status} />
      </div>

      <div className="border-line bg-bg mt-6 rounded-md border p-4">
        <h3 className="text-h3 text-ink font-semibold">
          Implementation status
        </h3>
        <p className="text-small text-muted mt-2">
          The admin route is prepared. Data entry, validation, publishing, and
          audit logging will be wired after X-101 authentication and X-102
          database setup are complete.
        </p>
      </div>

      <Link
        className="text-accent mt-6 inline-flex text-sm font-semibold underline-offset-4 hover:underline"
        href="/admin"
      >
        Back to admin dashboard
      </Link>
    </main>
  );
}
