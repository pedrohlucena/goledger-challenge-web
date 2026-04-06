import type { Metadata } from "next";
import { getTvShowSearchResults } from "@/services/tvShowSearch";
import { SearchResultsList } from "@/app/(public)/search/components/searchResultsList";
import { SearchSidebar } from "@/app/(public)/search/components/searchSidebar";

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: `Pesquisar "${q ?? ""}" - IMDp`,
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q ?? "";

  const { results } = await getTvShowSearchResults(query);

  return (
    <main className="flex-1 bg-white text-black">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-normal mb-6">
          Pesquisar <span className="font-bold">&ldquo;{query}&rdquo;</span>
        </h1>

        <div className="flex gap-x-10 items-start">
          <div className="flex-1 min-w-0">
            <SearchResultsList results={results} />
          </div>
        </div>
      </div>
    </main>
  );
}
