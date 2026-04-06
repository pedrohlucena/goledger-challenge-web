import { env } from "@/utils";

async function post<RequestBody, ResponseBody>(
  path: string,
  body: RequestBody
): Promise<ResponseBody> {
  const url = `${env.backend.apiUrl}${path}`;

  const res = await fetch(
    url, 
    {
      method: "POST",
      headers: buildHeaders(),
      body: JSON.stringify(body),
    }
  );

  return res.json() as Promise<ResponseBody>;
}

function buildHeaders(): HeadersInit {
  const credentials = btoa(`${env.backend.loginUsername}:${env.backend.loginPassword}`);

  return {
    Authorization: `Basic ${credentials}`,
    "Content-Type": "application/json",
  };
}

export const api = { post };