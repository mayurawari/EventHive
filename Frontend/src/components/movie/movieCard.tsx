import { useMemo } from "react";
import SkeletonMovieCard from "../loaders/blockCardLoader.tsx";
import HeroCarousel from "./HeroCarousel.tsx";
import UpcomingMoviesCard from "./UpcomingMoviesCard.tsx";
import PopularMoviesCard from "./PopularMoviesCard.tsx";

type MovieCompProps = {
  theme: string;
  nowplaying?: any[];
  upcoming?: any[];
  popular?: any[];
  genre?: any[];
  loading: {
    nowplaying: boolean;
    upcoming: boolean;
    popular: boolean;
    genre: boolean;
  };
  error: {
    nowplaying: string | null;
    upcoming: string | null;
    popular: string | null;
    genre: string | null;
  };
};

const movieCard = ({
  theme,
  nowplaying = [],
  upcoming = [],
  popular = [],
  genre = [],
  loading,
  error,
}: MovieCompProps) => {
  const top5Movies = useMemo(() => {
    return [...nowplaying]
      .sort((a, b) => b.vote_count - a.vote_count)
      .slice(0, 5);
  }, [nowplaying]);

  if (loading.nowplaying) {
    return (
      <div className="w-full px-10 mt-10 mb-10">
        <SkeletonMovieCard />
      </div>
    );
  }

  //   {
  //     "adult": false,
  //     "backdrop_path": "/swxhEJsAWms6X1fDZ4HdbvYBSf9.jpg",
  //     "genre_ids": [
  //         12,
  //         35,
  //         27
  //     ],
  //     "id": 1234731,
  //     "original_language": "en",
  //     "original_title": "Anaconda",
  //     "overview": "A group of friends facing mid-life crises head to the rainforest with the intention of remaking their favorite movie from their youth, only to find themselves in a fight for their lives against natural disasters, giant snakes and violent criminals.",
  //     "popularity": 238.1653,
  //     "poster_path": "/qxMv3HwAB3XPuwNLMhVRg795Ktp.jpg",
  //     "release_date": "2025-12-25",
  //     "title": "Anaconda",
  //     "video": false,
  //     "vote_average": 5.965,
  //     "vote_count": 228
  // }
  return (
    <div className="w-full px-10 rounded-2xl">
      <h1
        className={`${theme === "dark" ? "text-white" : "text-black"} font-light text-6xl`}
      >
        Now Streaming
      </h1>
      {/* Hero Section */}
      <section className="w-full mt-5">
        {nowplaying && nowplaying.length > 0 && (
          <HeroCarousel movies={top5Movies.slice(0, 5)} />
        )}
      </section>

      {/* Movie Cards Section Upcoming */}
      <section className="w-full mt-2">
        <UpcomingMoviesCard movies = {upcoming} genre = {genre} loading={loading.upcoming} error={error.upcoming} theme={theme}/>
      </section>

      {/* Most Popular Section */}
      <section className="w-full mt-2 mb-10">
        <PopularMoviesCard movies = {popular} genre = {genre} loading={loading.popular} error={error.popular} theme={theme}/>
      </section>
    </div>
  );
};

export default movieCard;
