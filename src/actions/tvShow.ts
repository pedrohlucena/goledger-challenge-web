"use server";

import { api } from "@/lib";

import type { TvShow } from "@/types";

import type {
  ReadAssetPayload,
  SearchAssetPayload,
  SearchAssetResponse,
} from "@/types/asset";

export async function getAllTvShows(): Promise<TvShow[]> {
  const response = await api.post<SearchAssetPayload, SearchAssetResponse<TvShow>>(
    "/api/query/search", 
    {
      query: { 
        selector: { 
          "@assetType": "tvShows" 
        }
      },
    }
  );
  
  const tvShows = response.result;

  return tvShows ?? [];
}

export async function getTvShowByKey(
  key: string
): Promise<TvShow> {
  const response = await api.post<ReadAssetPayload, TvShow>(
    "/api/query/readAsset",
    { 
      key: { 
        "@assetType": "tvShows", 
        "@key": key 
      } 
    }
  );
  
  const tvShow = response;

  return tvShow;
}