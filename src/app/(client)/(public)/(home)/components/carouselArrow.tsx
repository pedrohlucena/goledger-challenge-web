"use client";

import { ChevronLeftIcon } from "@/common/assets/svgs/chevronLeftIcon";
import { ChevronRightIcon } from "@/common/assets/svgs/chevronRightIcon";

type CarouselArrowProps = {
  direction: "left" | "right";
  onClick: () => void;
  className?: string;
};

export default function CarouselArrow({ direction, onClick, className = "" }: CarouselArrowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 z-10 flex h-full w-10 items-center justify-center
        bg-black/40 text-white/80 hover:bg-black/70 hover:text-white transition-colors cursor-pointer
        ${direction === "left" ? "left-0 rounded-r" : "right-0 rounded-l"}
        ${className}`}
      aria-label={direction === "left" ? "Previous" : "Next"}
    >
      {direction === "left" ? (
        <ChevronLeftIcon className="h-6 w-6" />
      ) : (
        <ChevronRightIcon className="h-6 w-6" />
      )}
    </button>
  );
}
