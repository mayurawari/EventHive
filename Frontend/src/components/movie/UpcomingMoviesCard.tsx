import { useMemo} from "react";

interface Moviesprops {
  movies: any[];
  genre: any[];
  loading: boolean;
  error: string | null;
  theme: string;
}

// {
//   "genres": [
//     {
//       "id": 28,
//       "name": "Action"
//     },
//   ]
// }

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

let url = "https://image.tmdb.org/t/p/w342";

const UpcomingMoviesCard = ({
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

  const latest5movies = useMemo(()=>{
     let latestupcoming = movies.filter((movie)=> movie?.poster_path || movie?.backdrop_path).slice(0,6);
     return latestupcoming;
  },[movies])

  const formatdate = (datestring:string) => {
    const date = new Date(datestring).toLocaleDateString("en-GB", {day: "numeric", month: "short", year: "numeric"});
    return date;
  }

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
        Upcoming Movies
      </h2>

      <div className="flex justify-center items-center gap-5  ">
        {latest5movies.map((movie) => (
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
                <div className="flex h-full items-center justify-center text-xs text-gray-500">
                  <img
                    src={`${url}${movie.backdrop_path}`}
                    alt={movie.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Details */}
            <div className="p-2">
              <p className="text-sm font-medium text-white line-clamp-1">
                {movie.title}
              </p>

              <p className="mt-1 text-xs text-gray-400 line-clamp-1">
                {movie.genre_ids
                  .map(({ id }: any) => genreMap[id])
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

export default UpcomingMoviesCard;
