import type { BaseAsset } from "@/types/asset";

export type Watchlist = BaseAsset & {
  "@assetType": "watchlist";
  title: string;
  description?: string;
  tvShows?: Array<{ "@assetType": "tvShows"; "@key": string }>;
};
