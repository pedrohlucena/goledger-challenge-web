import Link from "next/link";
import { ImagePlaceholderIcon } from "@/common/assets/svgs/imagePlaceholderIcon";
import { StarIcon } from "@/common/assets/svgs/starIcon";
import { RemoveFromWatchlistButton } from "@/app/(public)/watchlist/components/removeFromWatchlistButton";
import type { TvShow } from "@/types/tvShow";
import type { Watchlist } from "@/types/watchlist";

type WatchlistItemProps = {
  tvShow: TvShow;
  position: number;
  watchlistKey: string;
  currentTvShows: NonNullable<Watchlist["tvShows"]>;
};

export function WatchlistItem({
  tvShow,
  position,
  watchlistKey,
  currentTvShows,
}: WatchlistItemProps) {
  const detailHref = `/tvshow/${encodeURIComponent(tvShow["@key"])}`;

  return (
    <li className="flex items-start gap-4 py-4 border-b border-divider last:border-b-0">
      <span className="text-sm text-dim w-4 flex-shrink-0 pt-1 text-right">
        {position}
      </span>

      <Link href={detailHref} className="flex-shrink-0">
        <div className="w-[45px] h-[67px] bg-poster flex items-center justify-center rounded-sm overflow-hidden">
          <ImagePlaceholderIcon className="w-6 h-6 text-dim" />
        </div>
      </Link>

      <div className="flex flex-col items-center gap-1 flex-shrink-0 w-10">
        <StarIcon className="w-4 h-4" />
        <span className="text-xs text-subtle">–</span>
      </div>

      <div className="flex-1 min-w-0">
        <Link
          href={detailHref}
          className="text-link font-bold text-sm hover:underline leading-snug block"
        >
          {tvShow.title}
        </Link>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <span className="text-xs font-medium bg-link text-white px-1 py-0.5 rounded-sm">
            {tvShow.recommendedAge}+
          </span>
        </div>
        <p className="text-xs text-subtle mt-1 line-clamp-2">{tvShow.description}</p>
      </div>

      <RemoveFromWatchlistButton
        tvShowKey={tvShow["@key"]}
        watchlistKey={watchlistKey}
        currentTvShows={currentTvShows}
      />
    </li>
  );
}
