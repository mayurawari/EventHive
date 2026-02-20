const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

interface Props {
  movie: {
    backdrop_path: string;
    title: string;
    overview: string;
    vote_average: number;
  };
}

const HeroMovie = ({ movie }: Props) => {
  return (
    <section className="relative w-full h-[90vh] min-h-[520px]">
      {/* Background Image */}
      <img
        src={`${IMAGE_BASE}${movie.backdrop_path}`}
        alt={movie.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-6 md:px-12 lg:px-20">
        <div className="max-w-2xl text-white space-y-6">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            {movie.title}
          </h1>

          <p className="text-sm md:text-base text-gray-200 line-clamp-3">
            {movie.overview}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm">
            <span className="px-3 py-1 rounded-full bg-yellow-500 text-black font-semibold">
              ⭐ {(movie.vote_average / 2).toFixed(1)}
            </span>
            <span className="text-gray-300">Now Playing</span>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:scale-105 transition">
              ▶ Watch Trailer
            </button>

            <button className="px-6 py-3 bg-white/20 backdrop-blur text-white rounded-lg hover:bg-white/30 transition">
              + Add to Watchlist
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroMovie;
