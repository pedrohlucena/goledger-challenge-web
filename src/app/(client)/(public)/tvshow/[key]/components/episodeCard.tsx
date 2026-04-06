import { StarIcon } from "@/common/assets/svgs/starIcon";

type EpisodeCardProps = {
  episodeNumber: number;
  title: string;
  description: string;
  releaseDate: string;
  rating?: number;
};

export function EpisodeCard({
  episodeNumber,
  title,
  description,
  releaseDate,
  rating,
}: EpisodeCardProps) {
  const formattedDate = new Date(releaseDate).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="flex gap-x-4 bg-card rounded border border-edge p-4 hover:border-edge-hover transition-colors">
      <div className="flex items-center justify-center w-12 h-12 bg-edge rounded-full flex-shrink-0">
        <span className="text-lg font-bold text-muted">{episodeNumber}</span>
      </div>

      <div className="flex flex-col gap-y-1.5 flex-1 min-w-0">
        <div className="flex items-center justify-between gap-x-4">
          <h3 className="text-base font-semibold text-white truncate">{title}</h3>

          {rating != null && rating > 0 && (
            <div className="flex items-center gap-x-1 flex-shrink-0">
              <StarIcon />
              <span className="text-sm text-muted">{rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        <span className="text-xs text-faint">{formattedDate}</span>

        <p className="text-sm text-muted line-clamp-2">{description}</p>
      </div>
    </div>
  );
}
