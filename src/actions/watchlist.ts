"use server";

import { refresh } from "next/cache";
import { api } from "@/lib";

import type { Watchlist } from "@/types";

import type { SearchAssetPayload, SearchAssetResponse, UpdateAssetPayload } from "@/types/asset";

type WatchlistTvShows = NonNullable<Watchlist["tvShows"]>;

export async function getAllWatchlists(): Promise<Watchlist[]> {
  const response = await api.post<SearchAssetPayload, SearchAssetResponse<Watchlist>>(
    "/api/query/search",
    {
      query: { 
        selector: { 
          "@assetType": "watchlist"
        } 
      },
    }
  );

  return response.result ?? [];
}

export async function addTvShowToWatchlist(
  watchlistKey: string,
  tvShowKey: string,
  currentTvShows: WatchlistTvShows
): Promise<void> {
  // ---

  const isTvShowAlreadyAddedToWatchlist = currentTvShows.some(
    (tvShow) => tvShow["@key"] === tvShowKey
  );

  if (isTvShowAlreadyAddedToWatchlist) return;

  await api.post<UpdateAssetPayload<Pick<Watchlist, "tvShows">>, unknown>(
    "/api/invoke/updateAsset",
    {
      update: {
        "@assetType": "watchlist",
        "@key": watchlistKey,
        tvShows: [...currentTvShows, { "@assetType": "tvShows" as const, "@key": tvShowKey }],
      },
    }
  );

  refresh();
}

export async function removeTvShowFromWatchlist(
  watchlistKey: string,
  tvShowKey: string,
  currentTvShows: WatchlistTvShows
): Promise<void> {
  await api.post<UpdateAssetPayload<Pick<Watchlist, "tvShows">>, unknown>(
    "/api/invoke/updateAsset",
    {
      update: {
        "@assetType": "watchlist",
        "@key": watchlistKey,
        tvShows: currentTvShows.filter((tvShow) => tvShow["@key"] !== tvShowKey),
      },
    }
  );

  refresh();
}
