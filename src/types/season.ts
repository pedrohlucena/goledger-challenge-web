import type { BaseAsset } from "@/types/asset";

export type Season = BaseAsset & {
  "@assetType": "seasons";
  number: number;
  tvShow: { "@assetType": "tvShows"; "@key": string };
  year: number;
};
