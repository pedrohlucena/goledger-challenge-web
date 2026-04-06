import { StarIcon } from "@/common/assets/svgs/starIcon";

type StarRatingProps = {
  averageRating: number;
  totalRatings: number;
};

export function StarRating({ averageRating, totalRatings }: StarRatingProps) {
  const formattedRating = averageRating > 0 ? averageRating.toFixed(1) : "N/A";

  return (
    <div className="flex flex-col items-center gap-y-1">
      <span className="text-xs text-muted font-bold tracking-widest uppercase">
        Avaliação IMDp
      </span>

      <div className="flex items-center gap-x-2">
        <StarIcon className="h-7 w-7" />

        <div className="flex items-baseline gap-x-1">
          <span className="text-xl font-bold text-white">{formattedRating}</span>
          <span className="text-sm text-muted">/10</span>
        </div>
      </div>

      {totalRatings > 0 && (
        <span className="text-xs text-muted">
          {totalRatings.toLocaleString("pt-BR")} avaliações
        </span>
      )}
    </div>
  );
}
