"use client";

import { useTransition } from "react";
import { removeTvShowFromWatchlist } from "@/actions/watchlist";
import { XIcon } from "@/common/assets/svgs/xIcon";
import type { Watchlist } from "@/types/watchlist";

type RemoveFromWatchlistButtonProps = {
  tvShowKey: string;
  watchlistKey: string;
  currentTvShows: NonNullable<Watchlist["tvShows"]>;
};

export function RemoveFromWatchlistButton({
  tvShowKey,
  watchlistKey,
  currentTvShows,
}: RemoveFromWatchlistButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleRemove() {
    startTransition(async () => {
      await removeTvShowFromWatchlist(watchlistKey, tvShowKey, currentTvShows);
    });
  }

  return (
    <button
      type="button"
      onClick={handleRemove}
      disabled={isPending}
      aria-label="Remover da lista"
      className="flex-shrink-0 text-dim hover:text-danger transition-colors disabled:opacity-50 cursor-pointer"
    >
      <XIcon className="w-4 h-4" />
    </button>
  );
}
