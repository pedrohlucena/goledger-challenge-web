import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { callGoLedger, serviceCredentials } from "@/bff/client";

export async function POST(req: NextRequest) {
  const session = await getSession();
  const credentials = session?.credentials ?? serviceCredentials();
  const body = await req.json();
  const data = await callGoLedger("/api/query/readAsset", body, credentials);
  return NextResponse.json(data);
}
