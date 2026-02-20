import { useEffect, useState } from "react";
import HeroMovie from "./HeroSection";

type Movie = {
  id: number;
  backdrop_path: string;
  title: string;
  overview: string;
  vote_average: number;
};

type HeroCarouselProps = {
  movies: Movie[];
};

const AUTO_SLIDE_MS = 5000;

const HeroCarousel = ({ movies }: HeroCarouselProps) => {
  const [current, setCurrent] = useState(0);
  const [isHovering,setIsHovering] = useState(false);

  const total = movies.length;

  useEffect(() => {
    if (!total|| isHovering) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, AUTO_SLIDE_MS);

    return () => clearInterval(timer);
  }, [total,isHovering]);

  const prev = () => {
    setCurrent((prev) => (prev - 1 + total) % total);
  };

  const next = () => {
    setCurrent((prev) => (prev + 1) % total);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-black" onMouseEnter={()=>setIsHovering(true)} onMouseLeave={()=>setIsHovering(false)}>
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {movies.map((movie) => (
          <div key={movie.id} className="min-w-full">
            <HeroMovie movie={movie} />
          </div>
        ))}
      </div>

      {/* Navigation */}
      <button
        onClick={prev}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white p-3 rounded-full hover:bg-black"
      >
        ❮
      </button>

      <button
        onClick={next}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white p-3 rounded-full hover:bg-black"
      >
        ❯
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {movies.map((_, i) => (
          <span
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              current === i ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
