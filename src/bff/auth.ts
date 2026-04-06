"use server";

import { redirect } from "next/navigation";
import { createSession, deleteSession } from "@/lib/session";
import { callGoLedger } from "@/bff/client";
import type { SearchAssetPayload, SearchAssetResponse } from "@/types/asset";
import type { TvShow } from "@/types/tvShow";

export type LoginState = { error?: string } | undefined;

async function validateCredentials(
  username: string,
  password: string
): Promise<string | null> {
  const credentials = Buffer.from(`${username}:${password}`).toString("base64");
  try {
    const response = await callGoLedger<
      SearchAssetPayload,
      SearchAssetResponse<TvShow>
    >(
      "/api/query/search",
      { query: { selector: { "@assetType": "tvShows" } } },
      credentials
    );
    if (Array.isArray(response.result)) return credentials;
    return null;
  } catch {
    return null;
  }
}

export async function login(
  _state: LoginState,
  formData: FormData
): Promise<LoginState> {
  const username = (formData.get("username") as string) ?? "";
  const password = (formData.get("password") as string) ?? "";

  if (!username || !password) {
    return { error: "Preencha todos os campos." };
  }

  const credentials = await validateCredentials(username, password);
  if (!credentials) {
    return { error: "Credenciais inválidas." };
  }

  await createSession(credentials);
  redirect("/watchlist");
}

export async function logout(): Promise<void> {
  await deleteSession();
  redirect("/");
}
