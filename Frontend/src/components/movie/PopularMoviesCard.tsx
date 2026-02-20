import { useMemo } from "react";

interface Moviesprops {
  movies: any[];
  genre: any[];
  loading: boolean;
  error: string | null;
  theme: string;
}

let url = "https://image.tmdb.org/t/p/w342";

const PopularMoviesCard = ({
  movies = [],
  genre = [],
  loading,
  theme,
}: Moviesprops) => {

  const genreMap = useMemo(() => {
    const map: Record<number, string> = {};
    genre.forEach((g) => {
      map[g.id] = g.name;
    });
    return map;
  }, [genre]);


  const topPopularMovies = useMemo(() => {
    return movies
      .filter((movie) => movie?.poster_path || movie?.backdrop_path)
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 6);
  }, [movies]);

  const formatdate = (datestring: string) => {
    return new Date(datestring).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <p className="flex justify-center items-center text-2xl text-black">
        Loading movies....
      </p>
    );
  }

  return (
    <section className="mt-20">
      <h2 className={`${theme === "dark" ? "text-white" : "text-black"} text-4xl mb-4 font-light`}>
        Popular Movies
      </h2>

      <div className="flex justify-center items-center gap-5">
        {topPopularMovies.map((movie) => (
          <div
            key={movie.id}
            className="rounded-lg bg-zinc-900 overflow-hidden"
          >
            {/* Poster */}
            <div className="aspect-[2/3] bg-zinc-800">
              {movie.poster_path ? (
                <img
                  src={`${url}${movie.poster_path}`}
                  alt={movie.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <img
                  src={`${url}${movie.backdrop_path}`}
                  alt={movie.title}
                  className="h-full w-full object-cover"
                />
              )}
            </div>

            {/* Details */}
            <div className="p-2">
              <p className="text-sm font-medium text-white line-clamp-1">
                {movie.title}
              </p>

              <p className="mt-1 text-xs text-gray-400 line-clamp-1">
                {movie.genre_ids
                  .map((id: number) => genreMap[id])
                  .filter(Boolean)
                  .slice(0, 2)
                  .join(" • ")}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                {formatdate(movie.release_date)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularMoviesCard;
