"use client";

import { useState, useTransition } from "react";
import {
  addTvShowToWatchlist,
  removeTvShowFromWatchlist,
} from "@/actions/watchlist";
import { BookmarkIcon } from "@/common/assets/svgs/bookmarkIcon";

type WatchlistButtonProps = {
  tvShowKey: string;
  watchlistKey: string;
  isInitiallyWatchlisted: boolean;
  currentTvShows: Array<{ "@assetType": "tvShows"; "@key": string }>;
};

export function WatchlistButton({
  tvShowKey,
  watchlistKey,
  isInitiallyWatchlisted,
  currentTvShows,
}: WatchlistButtonProps) {
  const [isWatchlisted, setIsWatchlisted] = useState(isInitiallyWatchlisted);
  const [isPending, startTransition] = useTransition();

  function handleToggle() {
    const previousState = isWatchlisted;
    setIsWatchlisted(!previousState);

    startTransition(async () => {
      try {
        if (previousState) {
          await removeTvShowFromWatchlist(watchlistKey, tvShowKey, currentTvShows);
        } else {
          await addTvShowToWatchlist(watchlistKey, tvShowKey, currentTvShows);
        }
      } catch {
        setIsWatchlisted(previousState);
      }
    });
  }

  if (!watchlistKey) return null;

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      className={`flex items-center gap-x-2 px-4 py-2 rounded font-medium text-sm transition-colors cursor-pointer ${
        isWatchlisted
          ? "bg-accent text-black hover:bg-accent-hover"
          : "bg-edge text-white hover:bg-edge-hover border border-edge-hover"
      } disabled:opacity-50`}
    >
      <BookmarkIcon fill={isWatchlisted ? "currentColor" : "none"} />

      {isWatchlisted ? "Na lista de favoritos" : "Adicionar aos favoritos"}
    </button>
  );
}
