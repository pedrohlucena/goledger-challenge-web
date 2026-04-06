import { backendClient } from "@/bff/client";
import type { Watchlist } from "@/types/watchlist";
import type { SearchAssetPayload, SearchAssetResponse } from "@/types/asset";

export async function getAllWatchlists(): Promise<Watchlist[]> {
  const response = await backendClient.post<
    SearchAssetPayload,
    SearchAssetResponse<Watchlist>
  >("/api/query/search", {
    query: { selector: { "@assetType": "watchlist" } },
  });
  return response.result ?? [];
}
