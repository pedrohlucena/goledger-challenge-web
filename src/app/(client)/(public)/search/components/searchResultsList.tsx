import { SearchResultItem } from "@/app/(client)/(public)/search/components/searchResultItem";
import type { TvShow } from "@/types/tvShow";

type SearchResultsListProps = {
  results: TvShow[];
};

function SectionLabel({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="w-5 h-5 rounded-full bg-accent flex items-center justify-center text-black text-xs font-bold flex-shrink-0">
        {count > 9 ? "9+" : count}
      </span>
      <span className="text-lg font-bold text-black">Títulos</span>
    </div>
  );
}

export function SearchResultsList({ results }: SearchResultsListProps) {
  if (results.length === 0) {
    return (
      <p className="text-sm text-subtle mt-4">
        Nenhum resultado encontrado.
      </p>
    );
  }

  return (
    <section>
      <SectionLabel count={results.length} />

      <ul>
        {results.map((tvShow) => (
          <SearchResultItem key={tvShow["@key"]} tvShow={tvShow} />
        ))}
      </ul>
    </section>
  );
}
