import type { AdminModuleStatus } from "@/lib/admin/config";
import { cn } from "@/lib/utils";

const statusLabels: Record<AdminModuleStatus, string> = {
  blocked: "Blocked",
  planned: "Planned",
  ready: "Ready",
};

const statusClasses: Record<AdminModuleStatus, string> = {
  blocked: "border-amber-300 bg-amber-50 text-amber-900",
  planned: "border-line bg-bg text-muted",
  ready: "border-accent/30 bg-accent-soft text-accent",
};

export function AdminStatusBadge({ status }: { status: AdminModuleStatus }) {
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center rounded-full border px-3 text-xs font-semibold",
        statusClasses[status],
      )}
    >
      {statusLabels[status]}
    </span>
  );
}
