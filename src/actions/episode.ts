"use server";

import { api } from "@/lib";

import type { Episode } from "@/types";

import type { FilteredSearchAssetPayload, SearchAssetResponse } from "@/types/asset";

export async function getEpisodesBySeason(
  seasonKey: string
): Promise<Episode[]> {
  const response = await api.post<
    FilteredSearchAssetPayload,
    SearchAssetResponse<Episode>
  >(
    "/api/query/search",  
    {
      query: {
        selector: {
          "@assetType": "episodes",
          "season": { 
            "@assetType": "seasons", 
            "@key": seasonKey 
          },
        },
      },
    }
  );

  return response.result ?? [];
}
