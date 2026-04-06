"use client";

import { useRef, useState, useEffect } from "react";
import type { TvShow } from "@/types/tvShow";
import CarouselArrow from "@/app/(client)/(public)/(home)/components/carouselArrow";
import SectionHeader from "@/app/(client)/(public)/(home)/components/sectionHeader";

type FeaturedCarouselProps = {
  shows: TvShow[];
};

const CARD_COLORS = [
  "from-rose-800 to-rose-950",
  "from-sky-800 to-sky-950",
  "from-emerald-800 to-emerald-950",
  "from-violet-800 to-violet-950",
  "from-amber-800 to-amber-950",
  "from-teal-800 to-teal-950",
  "from-fuchsia-800 to-fuchsia-950",
  "from-indigo-800 to-indigo-950",
];

export default function FeaturedCarousel({ shows }: FeaturedCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    return () => el.removeEventListener("scroll", updateScrollState);
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  if (shows.length === 0) return null;

  return (
    <section className="w-full max-w-[1280px] mx-auto px-4 mt-10">
      <SectionHeader title="Em destaque" />

      <div className="relative group">
        {canScrollLeft && (
          <CarouselArrow direction="left" onClick={() => scroll("left")} className="opacity-0 group-hover:opacity-100 rounded-r-sm" />
        )}

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
        >
          {shows.map((show, i) => (
            <a
              key={show["@key"]}
              href={`/tvshow/${show["@key"]}`}
              className="flex-shrink-0 w-[180px] group/card"
            >
              <div
                className={`w-[180px] h-[268px] rounded-lg bg-gradient-to-b ${CARD_COLORS[i % CARD_COLORS.length]} flex items-end p-3 relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-black/20" />

                <span className="relative z-[1] text-white font-bold text-sm leading-tight line-clamp-3">
                  {show.title}
                </span>
              </div>

              <div className="mt-2">
                <p className="text-sm text-white font-medium truncate group-hover/card:text-accent transition-colors">
                  {show.title}
                </p>
                
                <p className="text-xs text-dim mt-0.5 line-clamp-2">
                  {show.description}
                </p>
              </div>
            </a>
          ))}
        </div>

        {canScrollRight && (
          <CarouselArrow direction="right" onClick={() => scroll("right")} className="opacity-0 group-hover:opacity-100 rounded-l-sm" />
        )}
      </div>
    </section>
  );
}
