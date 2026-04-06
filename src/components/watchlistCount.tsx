import { getAllWatchlists } from "@/bff/watchlist";

export async function WatchlistCount() {
  const watchlists = await getAllWatchlists();
  const count = watchlists[0]?.tvShows?.length ?? 0;

  if (count === 0) return null;

  return <span className="text-xs font-bold text-accent">{count}</span>;
}
