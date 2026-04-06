import { getAllWatchlists } from "@/bff/watchlist";
import { getSession } from "@/lib/session";

export async function WatchlistCount() {
  const session = await getSession();
  if (!session) return null;

  const watchlists = await getAllWatchlists();
  const count = watchlists[0]?.tvShows?.length ?? 0;

  if (count === 0) return null;

  return <span className="text-xs font-bold text-accent">{count}</span>;
}
