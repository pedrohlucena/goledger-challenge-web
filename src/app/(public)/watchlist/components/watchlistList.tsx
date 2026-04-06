import Link from "next/link";
import { WatchlistItem } from "@/app/(public)/watchlist/components/watchlistItem";
import type { TvShow } from "@/types/tvShow";
import type { Watchlist } from "@/types/watchlist";

type WatchlistListProps = {
  tvShows: TvShow[];
  watchlistKey: string;
  currentTvShows: NonNullable<Watchlist["tvShows"]>;
};

function EmptyState() {
  return (
    <div className="py-10 text-center">
      <p className="text-subtle text-sm">Nenhum título na sua lista.</p>
      <Link
        href="/"
        className="mt-4 inline-block text-link text-sm hover:underline"
      >
        Explorar títulos
      </Link>
    </div>
  );
}

export function WatchlistList({
  tvShows,
  watchlistKey,
  currentTvShows,
}: WatchlistListProps) {
  if (tvShows.length === 0) return <EmptyState />;

  return (
    <ol>
      {tvShows.map((tvShow, index) => (
        <WatchlistItem
          key={tvShow["@key"]}
          tvShow={tvShow}
          position={index + 1}
          watchlistKey={watchlistKey}
          currentTvShows={currentTvShows}
        />
      ))}
    </ol>
  );
}
