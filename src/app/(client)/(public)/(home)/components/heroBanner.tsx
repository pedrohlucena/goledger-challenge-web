"use client";

import { useState, useEffect, useCallback } from "react";
import type { TvShow } from "@/types/tvShow";
import CarouselArrow from "@/app/(client)/(public)/(home)/components/carouselArrow";
import { PlayIcon } from "@/common/assets/svgs/playIcon";

type HeroBannerProps = {
  shows: TvShow[];
};

const HERO_COLORS = [
  "from-red-900/60",
  "from-blue-900/60",
  "from-emerald-900/60",
  "from-purple-900/60",
  "from-amber-900/60",
];

export default function HeroBanner({ shows }: HeroBannerProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const heroShows = shows.slice(0, 5);
  const sidebarShows = shows.filter((_, i) => i !== activeIndex).slice(0, 3);

  const goTo = useCallback(
    (dir: "prev" | "next") => {
      setActiveIndex((prev) => {
        if (dir === "next") return (prev + 1) % heroShows.length;
        return (prev - 1 + heroShows.length) % heroShows.length;
      });
    },
    [heroShows.length],
  );

  useEffect(() => {
    if (heroShows.length <= 1) return;
    const timer = setInterval(() => goTo("next"), 8000);
    return () => clearInterval(timer);
  }, [goTo, heroShows.length]);

  if (heroShows.length === 0) return null;

  const current = heroShows[activeIndex];
  const colorGradient = HERO_COLORS[activeIndex % HERO_COLORS.length];

  return (
    <section className="relative w-full max-w-7xl mx-auto flex flex-col md:flex-row">
      <div className="relative flex-1 min-h-90 md:min-h-120 overflow-hidden">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${colorGradient} to-black transition-colors duration-700`}
        />

        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent z-[1]" />

        {heroShows.length > 1 && (
          <>
            <CarouselArrow direction="left" onClick={() => goTo("prev")} className="z-[2] rounded-r-sm" />
            <CarouselArrow direction="right" onClick={() => goTo("next")} className="z-[2] rounded-l-sm" />
          </>
        )}

        <div className="absolute bottom-6 left-6 right-6 z-[2] flex items-end gap-4">
          <a
            href={`/tvshow/${current["@key"]}`}
            className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors"
          >
            <PlayIcon className="h-8 w-8 md:h-10 md:w-10 ml-1" />
          </a>

          <div className="min-w-0">
            <a href={`/tvshow/${current["@key"]}`} className="hover:underline">
              <h2 className="text-xl md:text-2xl font-bold text-white truncate">
                {current.title}
              </h2>
            </a>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-dim bg-element rounded px-2 py-0.5">
                {current.recommendedAge}+
              </span>
            </div>
          </div>
        </div>

        {heroShows.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-[2] flex gap-1.5">
            {heroShows.map((_, i) => (
              <button
                key={heroShows[i]["@key"]}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={`h-0.5 rounded-full transition-all ${
                  i === activeIndex ? "w-5 bg-white" : "w-3 bg-white/40"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <aside className="w-full md:w-75 bg-card flex flex-col">
        <h3 className="px-4 pt-4 pb-2 text-accent font-bold text-sm tracking-wide">
          A seguir
        </h3>

        <div className="flex-1 flex flex-col divide-y divide-element">
          {sidebarShows.map((show) => (
            <a
              key={show["@key"]}
              href={`/tvshow/${show["@key"]}`}
              className="flex items-start gap-3 px-4 py-3 hover:bg-card-hover transition-colors cursor-pointer"
            >
              <div className="flex-shrink-0 w-22 aspect-video rounded bg-element flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-element to-element-deep" />
                <PlayIcon className="h-5 w-5 relative z-[1] opacity-60" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm text-white font-medium truncate">{show.title}</p>
                <p className="text-xs text-dim mt-0.5 line-clamp-2">
                  {show.description}
                </p>
              </div>
            </a>
          ))}
        </div>

      </aside>
    </section>
  );
}
