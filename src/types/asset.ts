import type { Dictionary } from "@/utils/types";

export type AssetType = "tvShows" | "episodes" | "seasons" | "watchlist";

// ---

export type BaseAsset = {
  "@assetType": AssetType;
  "@key": string;
  "@lastTx": string;
  "@lastUpdated": string;
};

export type CreateAssetPayload<AssetData extends Dictionary> = {
  asset: Array<{ "@assetType": AssetType } & AssetData>;
};

export type ReadAssetPayload = {
  key: { "@assetType": AssetType; "@key": string };
};

export type SearchAssetPayload = {
  query: { selector: { "@assetType": AssetType } };
};

export type FilteredSearchAssetPayload = {
  query: { selector: Record<string, unknown> };
};

export type UpdateAssetPayload<T extends Dictionary> = {
  update: { "@assetType": AssetType; "@key": string } & T;
};

export type DeleteAssetPayload = {
  key: { "@assetType": AssetType; "@key": string };
};

export type SearchAssetResponse<Result> = {
  result: Result[];
};
