import { getAllTvShows } from "@/bff/tvShow";
import HeroBanner from "@/app/(client)/(public)/(home)/components/heroBanner";
import FeaturedCarousel from "@/app/(client)/(public)/(home)/components/featuredCarousel";

export default async function HomePage() {
  const tvShows = await getAllTvShows();

  return (
    <main className="flex-1 bg-black">
      <HeroBanner shows={tvShows} />
      <FeaturedCarousel shows={tvShows} />
    </main>
  );
}
