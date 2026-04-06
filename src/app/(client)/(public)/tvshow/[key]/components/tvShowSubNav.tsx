"use client";

import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@/common/assets/svgs/chevronLeftIcon";

export function TvShowSubNav() {
  const router = useRouter();

  return (
    <nav className="flex items-center bg-card border-b border-edge h-11 px-4 gap-x-6 text-sm overflow-x-auto scrollbar-hide">
      <button
        type="button"
        onClick={() => router.back()}
        className="text-muted hover:text-white transition-colors flex-shrink-0 cursor-pointer"
        aria-label="Voltar"
      >
        <ChevronLeftIcon />
      </button>

      <span className="text-white font-semibold flex-shrink-0">Visão geral</span>
      <span className="text-muted hover:text-white transition-colors cursor-pointer flex-shrink-0">
        Temporadas e Episódios
      </span>
    </nav>
  );
}
