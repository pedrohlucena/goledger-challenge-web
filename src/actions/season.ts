"use server";

import { api } from "@/lib";

import type { Season } from "@/types";

import type { FilteredSearchAssetPayload, SearchAssetResponse } from "@/types/asset";

export async function getSeasonsByTvShow(
  tvShowKey: string
): Promise<Season[]> {
  const response = await api.post<
    FilteredSearchAssetPayload,
    SearchAssetResponse<Season>
  >(
    "/api/query/search", 
    {
      query: {
        selector: {
          "@assetType": "seasons",
          "tvShow": { 
            "@assetType": "tvShows", 
            "@key": tvShowKey 
          },
        },
      },
    }
  );

  return response.result ?? [];
}
