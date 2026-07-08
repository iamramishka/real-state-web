import { AdminModuleCard } from "@/components/admin/AdminModuleCard";
import { AdminStatusBadge } from "@/components/admin/AdminStatusBadge";
import {
  adminBackendPaths,
  adminContentModules,
  adminNextTasks,
  adminOperationsModules,
} from "@/lib/admin/config";

const dashboardStats = [
  {
    label: "Content modules",
    value: adminContentModules.length,
  },
  {
    label: "AI ops modules",
    value: adminOperationsModules.length,
  },
  {
    label: "Backend paths",
    value: adminBackendPaths.length,
  },
  {
    label: "Ready endpoints",
    value: adminBackendPaths.filter((path) => path.status === "ready").length,
  },
];

export default function AdminPage() {
  return (
    <main className="space-y-6">
      <section
        aria-labelledby="admin-dashboard-title"
        className="border-line bg-surface shadow-soft rounded-lg border p-5"
      >
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-muted text-xs font-semibold tracking-[0.08em] uppercase">
              Dashboard
            </p>
            <h2
              className="text-h2 text-ink mt-1 font-semibold"
              id="admin-dashboard-title"
            >
              Admin panel foundation
            </h2>
            <p className="text-small text-muted mt-2 max-w-3xl">
              This first Codex slice creates the admin workspace and backend
              routes. Writes stay disabled until auth, RBAC, and the database
              are added in the next tasks.
            </p>
          </div>
          <AdminStatusBadge status="ready" />
        </div>

        <dl className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {dashboardStats.map((stat) => (
            <div
              className="border-line bg-bg rounded-md border p-4"
              key={stat.label}
            >
              <dt className="text-muted text-xs font-semibold tracking-[0.08em] uppercase">
                {stat.label}
              </dt>
              <dd className="font-display text-ink mt-2 text-3xl font-semibold">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="admin-content-title">
        <div className="mb-4">
          <p className="text-muted text-xs font-semibold tracking-[0.08em] uppercase">
            CMS
          </p>
          <h2
            className="text-h2 text-ink font-semibold"
            id="admin-content-title"
          >
            Content management areas
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {adminContentModules.map((module) => (
            <AdminModuleCard key={module.id} module={module} />
          ))}
        </div>
      </section>

      <section
        aria-labelledby="admin-backend-title"
        className="border-line bg-surface shadow-soft rounded-lg border p-5"
      >
        <div className="mb-4">
          <p className="text-muted text-xs font-semibold tracking-[0.08em] uppercase">
            Backend
          </p>
          <h2
            className="text-h2 text-ink font-semibold"
            id="admin-backend-title"
          >
            Backend paths prepared
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="text-small w-full min-w-[44rem] border-collapse text-left">
            <caption className="sr-only">
              Admin backend paths and implementation status
            </caption>
            <thead className="border-line text-muted border-b text-xs font-semibold tracking-[0.08em] uppercase">
              <tr>
                <th className="py-3 pr-4" scope="col">
                  Method
                </th>
                <th className="py-3 pr-4" scope="col">
                  Path
                </th>
                <th className="py-3 pr-4" scope="col">
                  Status
                </th>
                <th className="py-3" scope="col">
                  Purpose
                </th>
              </tr>
            </thead>
            <tbody className="divide-line divide-y">
              {adminBackendPaths.map((path) => (
                <tr key={`${path.method}-${path.path}`}>
                  <td className="text-ink py-3 pr-4 font-semibold">
                    {path.method}
                  </td>
                  <td className="text-accent py-3 pr-4 font-mono text-xs">
                    {path.path}
                  </td>
                  <td className="py-3 pr-4">
                    <AdminStatusBadge status={path.status} />
                  </td>
                  <td className="text-muted py-3">{path.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section
        aria-labelledby="admin-next-title"
        className="border-line bg-surface shadow-soft rounded-lg border p-5"
      >
        <p className="text-muted text-xs font-semibold tracking-[0.08em] uppercase">
          Work queue
        </p>
        <h2
          className="text-h2 text-ink mt-1 font-semibold"
          id="admin-next-title"
        >
          Next Codex and Claude tasks
        </h2>
        <ol className="mt-4 grid gap-3">
          {adminNextTasks.map((task) => (
            <li
              className="border-line bg-bg text-small text-ink-700 rounded-md border px-4 py-3"
              key={task}
            >
              {task}
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
