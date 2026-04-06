import type { BaseAsset } from "@/types/asset";

export type TvShow = BaseAsset & {
  "@assetType": "tvShows";
  title: string;
  description: string;
  recommendedAge: number;
};
