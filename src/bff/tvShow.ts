import { backendClient } from "@/bff/client";
import type { TvShow } from "@/types/tvShow";
import type {
  ReadAssetPayload,
  SearchAssetPayload,
  SearchAssetResponse,
} from "@/types/asset";

export async function getAllTvShows(): Promise<TvShow[]> {
  const response = await backendClient.post<
    SearchAssetPayload,
    SearchAssetResponse<TvShow>
  >("/api/query/search", { query: { selector: { "@assetType": "tvShows" } } });
  return response.result ?? [];
}

export async function getTvShowByKey(key: string): Promise<TvShow> {
  return backendClient.post<ReadAssetPayload, TvShow>("/api/query/readAsset", {
    key: { "@assetType": "tvShows", "@key": key },
  });
}
