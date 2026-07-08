import { NextResponse } from "next/server";

import { adminOperationsModules } from "@/lib/admin/config";
import { getCurrentAdminSession } from "@/lib/auth/server";

export async function GET() {
  const session = await getCurrentAdminSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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

export async function POST() {
  const session = await getCurrentAdminSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
