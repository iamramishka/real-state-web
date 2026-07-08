import { NextResponse } from "next/server";

import { adminBackendPaths, adminPhase } from "@/lib/admin/config";
import { getCurrentAdminSession } from "@/lib/auth/server";

export async function GET() {
  const session = await getCurrentAdminSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(
    {
      adminShell: "ready",
      auth: "ready",
      database: "pending",
      phase: adminPhase.id,
      readyBackendPaths: adminBackendPaths.filter(
        (path) => path.status === "ready",
      ).length,
      role: session.role,
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
