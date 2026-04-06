import { getAllTvShows } from "@/bff/tvShow";
import type { TvShow } from "@/types/tvShow";

type TvShowSearchData = {
  query: string;
  results: TvShow[];
};

function matchesTitleQuery(tvShow: TvShow, normalizedQuery: string): boolean {
  return tvShow.title.toLowerCase().includes(normalizedQuery);
}

export async function getTvShowSearchResults(
  query: string
): Promise<TvShowSearchData> {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return { query, results: [] };
  }

  const allTvShows = await getAllTvShows();
  const results = allTvShows.filter((tvShow) =>
    matchesTitleQuery(tvShow, normalizedQuery)
  );

  return { query, results };
}
