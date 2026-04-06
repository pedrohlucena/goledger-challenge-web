import { getAllTvShows } from "@/actions/tvShow";
import HeroBanner from "@/app/(public)/components/heroBanner";
import FeaturedCarousel from "@/app/(public)/components/featuredCarousel";

export default async function HomePage() {
  const tvShows = await getAllTvShows();

  return (
    <main className="flex-1 bg-black">
      <HeroBanner shows={tvShows} />
      <FeaturedCarousel shows={tvShows} />
    </main>
  );
}
