import { backendClient } from "@/bff/client";
import type { Episode } from "@/types/episode";
import type { FilteredSearchAssetPayload, SearchAssetResponse } from "@/types/asset";

export async function getEpisodesBySeason(seasonKey: string): Promise<Episode[]> {
  const response = await backendClient.post<
    FilteredSearchAssetPayload,
    SearchAssetResponse<Episode>
  >("/api/query/search", {
    query: {
      selector: {
        "@assetType": "episodes",
        season: { "@assetType": "seasons", "@key": seasonKey },
      },
    },
  });
  return response.result ?? [];
}
