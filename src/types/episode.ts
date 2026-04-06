import type { BaseAsset } from "@/types/asset";

export type Episode = BaseAsset & {
  "@assetType": "episodes";
  season: { "@assetType": "seasons"; "@key": string };
  episodeNumber: number;
  title: string;
  releaseDate: string;
  description: string;
  rating?: number;
};
