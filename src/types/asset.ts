export type AssetType = "tvShows" | "episodes" | "seasons" | "watchlist";

export type BaseAsset = {
  "@assetType": AssetType;
  "@key": string;
  "@lastTx": string;
  "@lastUpdated": string;
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

export type SearchAssetResponse<Result> = {
  result: Result[];
};
