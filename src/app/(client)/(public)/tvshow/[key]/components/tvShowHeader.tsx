type TvShowHeaderProps = {
  title: string;
  recommendedAge: number;
  yearRange: string;
};

export function TvShowHeader({ title, recommendedAge, yearRange }: TvShowHeaderProps) {
  return (
    <div className="flex flex-col gap-y-1">
      <h1 className="text-3xl font-bold text-white leading-tight">{title}</h1>

      <div className="flex items-center gap-x-3 text-sm text-muted">
        <span>{yearRange}</span>

        <span className="border border-muted rounded px-1.5 py-0.5 text-xs font-medium leading-none">
          {recommendedAge}+
        </span>
      </div>
    </div>
  );
}
