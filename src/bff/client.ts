import { getSession } from "@/lib/session";
import { env } from "@/utils/env";

/**
 * The single function that directly calls the GoLedger backend.
 * Used by Route Handlers (browser-proxied requests) and by validateCredentials (pre-auth).
 */
export async function callGoLedger<Req, Res>(
  path: string,
  body: Req,
  credentials: string
): Promise<Res> {
  const res = await fetch(`${env.backend.apiUrl}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return res.json() as Promise<Res>;
}

function serviceCredentials(): string {
  return Buffer.from(
    `${env.backend.loginUsername}:${env.backend.loginPassword}`
  ).toString("base64");
}

/**
 * Server-side client for bff/* modules.
 * Uses session credentials when authenticated (private pages),
 * falls back to service credentials for public pages.
 */
async function post<Req, Res>(path: string, body: Req): Promise<Res> {
  const session = await getSession();
  const credentials = session?.credentials ?? serviceCredentials();
  return callGoLedger(path, body, credentials);
}

export const backendClient = { post };
