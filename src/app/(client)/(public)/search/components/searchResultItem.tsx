import { ImagePlaceholderIcon } from "@/common/assets/svgs/imagePlaceholderIcon";
import { StarIcon } from "@/common/assets/svgs/starIcon";
import type { TvShow } from "@/types/tvShow";

type SearchResultItemProps = {
  tvShow: TvShow;
};

export function SearchResultItem({ tvShow }: SearchResultItemProps) {
  const detailHref = `/tvshow/${encodeURIComponent(tvShow["@key"])}`;

  return (
    <li className="flex items-start gap-3 py-3 border-b border-divider last:border-b-0">
      <a href={detailHref} className="flex-shrink-0">
        <div className="w-12 aspect-[2/3] bg-poster flex items-center justify-center rounded-sm overflow-hidden">
          <ImagePlaceholderIcon className="w-6 h-6 text-dim" />
        </div>
      </a>

      <div className="flex-1 min-w-0">
        <a
          href={detailHref}
          className="text-link font-bold text-sm hover:underline leading-snug"
        >
          {tvShow.title}
        </a>

        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <span className="text-xs font-medium bg-link text-white px-1 py-0.5 rounded-sm">
            {tvShow.recommendedAge}+
          </span>

          <span className="text-xs text-subtle truncate">
            {tvShow.description}
          </span>
        </div>

        <div className="flex items-center gap-1 mt-1">
          <StarIcon className="w-3 h-3" />
          <span className="text-xs text-subtle">–</span>
        </div>
      </div>
    </li>
  );
}
