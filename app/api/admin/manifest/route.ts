import { NextResponse } from "next/server";

import {
  adminBackendPaths,
  adminContentModules,
  adminNextTasks,
  adminOperationsModules,
  adminPhase,
} from "@/lib/admin/config";
import { getCurrentAdminSession } from "@/lib/auth/server";

export async function GET() {
  const session = await getCurrentAdminSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(
    {
      backendPaths: adminBackendPaths,
      contentModules: adminContentModules,
      nextTasks: adminNextTasks,
      operationsModules: adminOperationsModules,
      phase: adminPhase,
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
