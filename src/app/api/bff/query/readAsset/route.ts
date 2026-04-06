import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { callGoLedger } from "@/bff/client";
import { env } from "@/utils/env";

function serviceCredentials(): string {
  return Buffer.from(
    `${env.backend.loginUsername}:${env.backend.loginPassword}`
  ).toString("base64");
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  const credentials = session?.credentials ?? serviceCredentials();
  const body = await req.json();
  const data = await callGoLedger("/api/query/readAsset", body, credentials);
  return NextResponse.json(data);
}
