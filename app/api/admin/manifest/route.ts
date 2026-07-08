import { NextResponse } from "next/server";

import {
  adminBackendPaths,
  adminContentModules,
  adminNextTasks,
  adminOperationsModules,
  adminPhase,
} from "@/lib/admin/config";

export function GET() {
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
