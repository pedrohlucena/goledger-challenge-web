"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  function handleRemove() {
    startTransition(async () => {
      await fetch("/api/bff/invoke/updateAsset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          update: {
            "@assetType": "watchlist",
            "@key": watchlistKey,
            tvShows: currentTvShows.filter((t) => t["@key"] !== tvShowKey),
          },
        }),
      });
      router.refresh();
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
