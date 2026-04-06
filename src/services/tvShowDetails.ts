import { getTvShowByKey } from "@/actions/tvShow";
import { getSeasonsByTvShow } from "@/actions/season";
import { getEpisodesBySeason } from "@/actions/episode";
import { getAllWatchlists } from "@/actions/watchlist";
import type { TvShow } from "@/types/tvShow";
import type { Season } from "@/types/season";
import type { Episode } from "@/types/episode";
import type { Watchlist } from "@/types/watchlist";

type TvShowRating = {
  averageRating: number;
  totalRatings: number;
};

type TvShowDetailsData = {
  tvShow: TvShow;
  sortedSeasons: Season[];
  episodesBySeasonKey: Record<string, Episode[]>;
  rating: TvShowRating;
  yearRange: string;
  watchlist: Watchlist | undefined;
  isWatchlisted: boolean;
  watchlistTvShows: NonNullable<Watchlist["tvShows"]>;
};

function computeRating(episodes: Episode[]): TvShowRating {
  const ratedEpisodes = episodes.filter(
    (episode): episode is Episode & { rating: number } =>
      episode.rating != null && episode.rating > 0
  );

  if (ratedEpisodes.length === 0) {
    return { averageRating: 0, totalRatings: 0 };
  }

  const sum = ratedEpisodes.reduce((total, episode) => total + episode.rating, 0);

  return {
    averageRating: sum / ratedEpisodes.length,
    totalRatings: ratedEpisodes.length,
  };
}

function computeYearRange(sortedSeasons: Season[]): string {
  const firstYear = sortedSeasons[0]?.year;
  const lastYear = sortedSeasons[sortedSeasons.length - 1]?.year;

  if (!firstYear || !lastYear) return "";

  return firstYear === lastYear
    ? String(firstYear)
    : `${firstYear}–${lastYear}`;
}

function buildEpisodeMap(
  seasons: Season[],
  episodeResults: Episode[][]
): { episodesBySeasonKey: Record<string, Episode[]>; allEpisodes: Episode[] } {
  const episodesBySeasonKey: Record<string, Episode[]> = {};
  const allEpisodes: Episode[] = [];

  for (let seasonIndex = 0; seasonIndex < seasons.length; seasonIndex++) {
    const seasonEpisodes = (episodeResults[seasonIndex] ?? []).sort(
      (episodeA, episodeB) => episodeA.episodeNumber - episodeB.episodeNumber
    );
    episodesBySeasonKey[seasons[seasonIndex]["@key"]] = seasonEpisodes;
    allEpisodes.push(...seasonEpisodes);
  }

  return { episodesBySeasonKey, allEpisodes };
}

export async function getTvShowDetails(key: string): Promise<TvShowDetailsData> {
  const [tvShow, seasons, watchlists] = await Promise.all([
    getTvShowByKey(key),
    getSeasonsByTvShow(key),
    getAllWatchlists(),
  ]);

  const episodeResults = await Promise.all(
    seasons.map((season) => getEpisodesBySeason(season["@key"]))
  );

  const { episodesBySeasonKey, allEpisodes } = buildEpisodeMap(seasons, episodeResults);

  const sortedSeasons = [...seasons].sort(
    (seasonA, seasonB) => seasonA.number - seasonB.number
  );

  const watchlist = watchlists[0];
  const watchlistTvShows = watchlist?.tvShows ?? [];

  return {
    tvShow,
    sortedSeasons,
    episodesBySeasonKey,
    rating: computeRating(allEpisodes),
    yearRange: computeYearRange(sortedSeasons),
    watchlist,
    isWatchlisted: watchlistTvShows.some((tvShowRef) => tvShowRef["@key"] === key),
    watchlistTvShows,
  };
}
