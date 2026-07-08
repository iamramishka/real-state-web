import { NextResponse } from "next/server";

import { adminOperationsModules } from "@/lib/admin/config";

export function GET() {
  return NextResponse.json(
    {
      modules: adminOperationsModules,
      status: "read-only",
      writesEnabled: false,
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}

export function POST() {
  return NextResponse.json(
    {
      message:
        "AI operations writes are disabled until auth, RBAC, and database tasks are complete.",
      nextTasks: ["X-101", "X-102", "X-110"],
      writesEnabled: false,
    },
    { status: 501 },
  );
}
