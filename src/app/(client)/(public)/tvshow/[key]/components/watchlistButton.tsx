"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { BookmarkIcon } from "@/common/assets/svgs/bookmarkIcon";
import type { Watchlist } from "@/types/watchlist";

type WatchlistButtonProps = {
  tvShowKey: string;
  watchlistKey: string;
  isInitiallyWatchlisted: boolean;
  currentTvShows: NonNullable<Watchlist["tvShows"]>;
  isAuthenticated: boolean;
};

export function WatchlistButton({
  tvShowKey,
  watchlistKey,
  isInitiallyWatchlisted,
  currentTvShows,
  isAuthenticated,
}: WatchlistButtonProps) {
  const [isWatchlisted, setIsWatchlisted] = useState(isInitiallyWatchlisted);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleToggle() {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    const previousState = isWatchlisted;
    setIsWatchlisted(!previousState);

    startTransition(async () => {
      try {
        const nextTvShows = previousState
          ? currentTvShows.filter((t) => t["@key"] !== tvShowKey)
          : [...currentTvShows, { "@assetType": "tvShows" as const, "@key": tvShowKey }];

        const res = await fetch("/api/bff/invoke/updateAsset", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            update: {
              "@assetType": "watchlist",
              "@key": watchlistKey,
              tvShows: nextTvShows,
            },
          }),
        });

        if (!res.ok) throw new Error("Failed");
      } catch {
        setIsWatchlisted(previousState);
      }
    });
  }

  if (!isAuthenticated) {
    return (
      <button
        type="button"
        onClick={handleToggle}
        className="flex items-center gap-x-2 px-4 py-2 rounded font-medium text-sm transition-colors cursor-pointer bg-edge text-white hover:bg-edge-hover border border-edge-hover"
      >
        <BookmarkIcon fill="none" />
        Adicionar aos favoritos
      </button>
    );
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
