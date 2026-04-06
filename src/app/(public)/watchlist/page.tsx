import type { Metadata } from "next";
import { getWatchlistDetails } from "@/services/watchlistDetails";
import { getAllTvShows } from "@/actions/tvShow";
import { WatchlistHeader } from "@/app/(public)/watchlist/components/watchlistHeader";
import { WatchlistControls } from "@/app/(public)/watchlist/components/watchlistControls";
import { WatchlistList } from "@/app/(public)/watchlist/components/watchlistList";
import { WatchlistAddSearch } from "@/app/(public)/watchlist/components/watchlistAddSearch";

export const metadata: Metadata = {
  title: "Sua lista de favoritos - IMDp",
};

export default async function WatchlistPage() {
  const [details, allTvShows] = await Promise.all([
    getWatchlistDetails(),
    getAllTvShows(),
  ]);

  const watchlist = details?.watchlist;
  const tvShows = details?.tvShows ?? [];
  const watchlistKey = watchlist?.["@key"] ?? "";
  const watchlistTvShows = watchlist?.tvShows ?? [];

  return (
    <main className="flex-1 bg-white text-black">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <WatchlistHeader />

        <div className="flex gap-x-8 items-start mt-6">
          <div className="flex-1 min-w-0">
            <WatchlistControls tvShowCount={tvShows.length} />
            
            <WatchlistList
              tvShows={tvShows}
              watchlistKey={watchlistKey}
              currentTvShows={watchlistTvShows}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
