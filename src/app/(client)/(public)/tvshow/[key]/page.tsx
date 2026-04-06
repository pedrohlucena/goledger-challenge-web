import type { Metadata } from "next";
import { getTvShowByKey } from "@/bff/tvShow";
import { getTvShowDetails } from "@/bff/tvShowDetails";
import { getSession } from "@/lib/session";
import { TvShowSubNav } from "@/app/(client)/(public)/tvshow/[key]/components/tvShowSubNav";
import { TvShowHeader } from "@/app/(client)/(public)/tvshow/[key]/components/tvShowHeader";
import { TvShowHero } from "@/app/(client)/(public)/tvshow/[key]/components/tvShowHero";
import { TvShowDescription } from "@/app/(client)/(public)/tvshow/[key]/components/tvShowDescription";
import { SeasonTabs } from "@/app/(client)/(public)/tvshow/[key]/components/seasonTabs";
import { WatchlistButton } from "@/app/(client)/(public)/tvshow/[key]/components/watchlistButton";

type TvShowPageProps = {
  params: Promise<{ key: string }>;
};

export async function generateMetadata({ params }: TvShowPageProps): Promise<Metadata> {
  const { key } = await params;
  const tvShow = await getTvShowByKey(decodeURIComponent(key));

  return {
    title: `${tvShow.title} - IMDp`,
  };
}

export default async function TvShowPage({ params }: TvShowPageProps) {
  const { key: rawKey } = await params;
  const key = decodeURIComponent(rawKey);

  const [
    {
      tvShow,
      sortedSeasons,
      episodesBySeasonKey,
      rating,
      yearRange,
      watchlist,
      isWatchlisted,
      watchlistTvShows,
    },
    session,
  ] = await Promise.all([getTvShowDetails(key), getSession()]);

  return (
    <main className="flex flex-col flex-1">
      <TvShowSubNav />

      <div className="max-w-6xl w-full mx-auto px-4 py-6 flex flex-col gap-y-6">
        <div className="flex items-start justify-between gap-x-4">
          <TvShowHeader
            title={tvShow.title}
            recommendedAge={tvShow.recommendedAge}
            yearRange={yearRange}
          />

          <WatchlistButton
            tvShowKey={key}
            watchlistKey={watchlist?.["@key"] ?? ""}
            isInitiallyWatchlisted={isWatchlisted}
            currentTvShows={watchlistTvShows}
            isAuthenticated={!!session}
          />
        </div>

        <TvShowHero
          title={tvShow.title}
          averageRating={rating.averageRating}
          totalRatings={rating.totalRatings}
        />

        <TvShowDescription description={tvShow.description} />

        <SeasonTabs seasons={sortedSeasons} episodesBySeasonKey={episodesBySeasonKey} />
      </div>
    </main>
  );
}
