import { NextResponse } from "next/server";

import { adminBackendPaths, adminPhase } from "@/lib/admin/config";
import { getCurrentAdminSession } from "@/lib/auth/server";

export async function GET() {
  const session = await getCurrentAdminSession();

  return NextResponse.json(
    {
      adminShell: "ready",
      auth: "ready",
      database: "pending",
      phase: adminPhase.id,
      readyBackendPaths: adminBackendPaths.filter(
        (path) => path.status === "ready",
      ).length,
      role: session?.role ?? null,
      status: "ok",
      writableMutations: false,
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
