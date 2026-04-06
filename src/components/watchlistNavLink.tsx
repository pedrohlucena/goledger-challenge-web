import { Suspense } from "react";
import Link from "next/link";
import { BookmarkIcon } from "@/common/assets/svgs/bookmarkIcon";
import { WatchlistCount } from "@/components/watchlistCount";

export function WatchlistNavLink() {
  return (
    <Link
      href="/watchlist"
      className="flex items-center gap-x-1.5 hover:text-accent transition-colors"
    >
      <BookmarkIcon className="h-4 w-4 flex-shrink-0" />
      <p className="text-sm font-medium">Lista de favoritos</p>
      <Suspense fallback={null}>
        <WatchlistCount />
      </Suspense>
    </Link>
  );
}
