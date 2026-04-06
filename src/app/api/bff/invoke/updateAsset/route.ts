import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { callGoLedger } from "@/bff/client";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const data = await callGoLedger(
    "/api/invoke/updateAsset",
    body,
    session.credentials
  );

  revalidatePath("/", "layout");
  return NextResponse.json(data);
}
