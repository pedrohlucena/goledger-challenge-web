"use client";

import { useState } from "react";
import { EpisodeList } from "@/app/(public)/tvshow/[key]/components/episodeList";
import type { Season } from "@/types/season";
import type { Episode } from "@/types/episode";

type SeasonTabsProps = {
  seasons: Season[];
  episodesBySeasonKey: Record<string, Episode[]>;
};

export function SeasonTabs({ seasons, episodesBySeasonKey }: SeasonTabsProps) {
  const [activeSeasonKey, setActiveSeasonKey] = useState<string>(
    seasons[0]?.["@key"] ?? ""
  );

  const activeEpisodes = episodesBySeasonKey[activeSeasonKey] ?? [];

  if (seasons.length === 0) {
    return (
      <div className="text-sm text-muted py-4">
        Nenhuma temporada cadastrada.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center gap-x-1 overflow-x-auto scrollbar-hide border-b border-edge">
        {seasons.map((season) => {
          const isActive = season["@key"] === activeSeasonKey;

          return (
            <button
              key={season["@key"]}
              type="button"
              onClick={() => setActiveSeasonKey(season["@key"])}
              className={`flex-shrink-0 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 cursor-pointer ${
                isActive
                  ? "text-white border-accent"
                  : "text-muted border-transparent hover:text-white hover:border-subtle"
              }`}
            >
              Temporada {season.number}
              <span className="ml-1.5 text-xs text-faint">({season.year})</span>
            </button>
          );
        })}
      </div>

      <EpisodeList episodes={activeEpisodes} />
    </div>
  );
}
