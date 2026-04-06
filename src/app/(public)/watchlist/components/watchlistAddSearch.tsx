"use client";

import { useState, useTransition } from "react";
import { addTvShowToWatchlist } from "@/actions/watchlist";
import { SearchIcon } from "@/common/assets/svgs/searchIcon";
import type { TvShow } from "@/types/tvShow";
import type { Watchlist } from "@/types/watchlist";

type WatchlistAddSearchProps = {
  watchlistKey: string;
  currentTvShows: NonNullable<Watchlist["tvShows"]>;
  allTvShows: TvShow[];
};

function filterSuggestions(
  allTvShows: TvShow[],
  currentTvShows: NonNullable<Watchlist["tvShows"]>,
  query: string
): TvShow[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return [];

  const watchlistedKeys = new Set(currentTvShows.map((tvShow) => tvShow["@key"]));

  return allTvShows.filter(
    (tvShow) =>
      !watchlistedKeys.has(tvShow["@key"]) &&
      tvShow.title.toLowerCase().includes(normalizedQuery)
  );
}

export function WatchlistAddSearch({
  watchlistKey,
  currentTvShows,
  allTvShows,
}: WatchlistAddSearchProps) {
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  const suggestions = filterSuggestions(allTvShows, currentTvShows, query);
  const isDropdownVisible = suggestions.length > 0;

  function handleAddTvShow(tvShow: TvShow) {
    setQuery("");
    startTransition(async () => {
      await addTvShowToWatchlist(watchlistKey, tvShow["@key"], currentTvShows);
    });
  }

  return (
    <div className="mb-5">
      <p className="text-sm font-bold mb-2">Adicionar um título a esta lista</p>
      <div className="relative">
        <div className="flex items-center border border-muted rounded-sm overflow-hidden bg-white">
          <SearchIcon className="w-4 h-4 text-faint ml-3 flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Pesquisar título para adicionar"
            disabled={isPending || !watchlistKey}
            className="flex-1 px-3 py-2 text-sm outline-none"
          />
        </div>

        {isDropdownVisible && (
          <ul className="absolute z-10 left-0 right-0 bg-white border border-separator shadow-lg max-h-60 overflow-y-auto">
            {suggestions.map((tvShow) => (
              <li key={tvShow["@key"]}>
                <button
                  type="button"
                  onClick={() => handleAddTvShow(tvShow)}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-hover-light flex items-center gap-2 cursor-pointer"
                >
                  <span className="font-medium text-link">{tvShow.title}</span>
                  <span className="text-dim text-xs">{tvShow.recommendedAge}+</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
