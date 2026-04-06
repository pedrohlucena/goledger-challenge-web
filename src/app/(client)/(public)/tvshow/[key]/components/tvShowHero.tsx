import { StarRating } from "@/app/(client)/(public)/tvshow/[key]/components/starRating";
import { ImagePlaceholderIcon } from "@/common/assets/svgs/imagePlaceholderIcon";

type TvShowHeroProps = {
  title: string;
  averageRating: number;
  totalRatings: number;
};

export function TvShowHero({ title, averageRating, totalRatings }: TvShowHeroProps) {
  const initials = (title ?? "")
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <div className="flex flex-col gap-4 sm:grid sm:grid-cols-[minmax(0,12.5rem)_1fr_minmax(0,11.25rem)]">
      <div className="bg-card rounded flex items-center justify-center aspect-[2/3] border border-edge">
        <span className="text-4xl font-bold text-element select-none">{initials}</span>
      </div>

      <div className="bg-card rounded flex items-center justify-center aspect-[2/3] border border-edge">
        <div className="flex flex-col items-center gap-y-2 text-subtle">
          <ImagePlaceholderIcon />
          <span className="text-sm">Sem imagem disponível</span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-y-6">
        <StarRating averageRating={averageRating} totalRatings={totalRatings} />
      </div>
    </div>
  );
}
