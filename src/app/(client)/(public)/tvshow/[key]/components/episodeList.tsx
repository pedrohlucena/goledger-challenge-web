import { EpisodeCard } from "@/app/(client)/(public)/tvshow/[key]/components/episodeCard";
import type { Episode } from "@/types/episode";

type EpisodeListProps = {
  episodes: Episode[];
};

export function EpisodeList({ episodes }: EpisodeListProps) {
  if (episodes.length === 0) {
    return (
      <div className="text-sm text-muted py-4">
        Nenhum episódio cadastrado para esta temporada.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-3">
      <h2 className="text-lg font-bold text-white">
        Episódios
        <span className="ml-2 text-sm font-normal text-muted">
          {episodes.length}
        </span>
      </h2>

      <div className="flex flex-col gap-y-2">
        {episodes.map((episode) => (
          <EpisodeCard
            key={episode["@key"]}
            episodeNumber={episode.episodeNumber}
            title={episode.title}
            description={episode.description}
            releaseDate={episode.releaseDate}
            rating={episode.rating}
          />
        ))}
      </div>
    </div>
  );
}
