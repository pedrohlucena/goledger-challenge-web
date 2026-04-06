import { getAllWatchlists } from "@/bff/watchlist";
import { getTvShowByKey } from "@/bff/tvShow";
import type { TvShow } from "@/types/tvShow";
import type { Watchlist } from "@/types/watchlist";

export type WatchlistDetails = {
  watchlist: Watchlist;
  tvShows: TvShow[];
};

function resolveTvShowRefs(
  refs: NonNullable<Watchlist["tvShows"]>
): Promise<TvShow[]> {
  return Promise.all(refs.map((ref) => getTvShowByKey(ref["@key"])));
}

export async function getWatchlistDetails(): Promise<WatchlistDetails | null> {
  const watchlists = await getAllWatchlists();
  const watchlist = watchlists[0];

  if (!watchlist) return null;

  const tvShows = await resolveTvShowRefs(watchlist.tvShows ?? []);

  return { watchlist, tvShows };
}
