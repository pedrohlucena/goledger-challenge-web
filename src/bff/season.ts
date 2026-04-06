import { backendClient } from "@/bff/client";
import type { Season } from "@/types/season";
import type { FilteredSearchAssetPayload, SearchAssetResponse } from "@/types/asset";

export async function getSeasonsByTvShow(tvShowKey: string): Promise<Season[]> {
  const response = await backendClient.post<
    FilteredSearchAssetPayload,
    SearchAssetResponse<Season>
  >("/api/query/search", {
    query: {
      selector: {
        "@assetType": "seasons",
        tvShow: { "@assetType": "tvShows", "@key": tvShowKey },
      },
    },
  });
  return response.result ?? [];
}
