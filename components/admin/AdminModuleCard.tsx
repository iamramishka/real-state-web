import Link from "next/link";

import { AdminStatusBadge } from "@/components/admin/AdminStatusBadge";
import type { AdminModule } from "@/lib/admin/config";

export function AdminModuleCard({ module }: { module: AdminModule }) {
  return (
    <article className="border-line bg-surface shadow-soft flex min-h-48 flex-col justify-between rounded-lg border p-5">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-muted text-xs font-semibold tracking-[0.08em] uppercase">
              {module.owner}
            </p>
            <h3 className="text-h3 text-ink mt-1 font-semibold">
              {module.title}
            </h3>
          </div>
          <AdminStatusBadge status={module.status} />
        </div>
        <p className="text-small text-muted">{module.description}</p>
      </div>
      <Link
        className="text-accent mt-6 inline-flex text-sm font-semibold underline-offset-4 hover:underline"
        href={module.href}
      >
        Open {module.title}
      </Link>
    </article>
  );
}
