type WatchlistControlsProps = {
  tvShowCount: number;
};

export function WatchlistControls({ tvShowCount }: WatchlistControlsProps) {
  if (tvShowCount === 0) return null;

  return (
    <div className="flex items-center justify-between py-3 border-b border-divider mb-3">
      <span className="font-bold text-sm">
        {tvShowCount === 1 ? "1 título" : `${tvShowCount} títulos`}
      </span>
    </div>
  );
}
