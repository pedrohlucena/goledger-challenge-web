"use client";

import { useSearchParams } from "next/navigation";
import { SearchIcon } from "@/common/assets/svgs/searchIcon";

export function NavbarSearchForm() {
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("q") ?? "";

  return (
    <form action="/search" method="get" className="flex flex-1 min-w-0 h-9 rounded-sm overflow-hidden">
      <input
        type="text"
        name="q"
        defaultValue={currentQuery}
        className="flex-1 min-w-0 bg-white h-full px-3 text-sm text-black outline-none"
      />

      <button
        type="submit"
        className="flex items-center justify-center bg-divider px-3 flex-shrink-0 hover:bg-accent transition-colors cursor-pointer"
        aria-label="Buscar"
      >
        <SearchIcon />
      </button>
    </form>
  );
}
