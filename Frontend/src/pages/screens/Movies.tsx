import { useEffect} from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import Navbar from "../main/Navbar";
import MovieCard from "../../components/movie/movieCard";
import {
  fetchNowPlayingMovies,
  fetchUpcomingMovies,
  fetchPopularMovies,
  fetchGenresById
} from "../../features/movie/movieSlice";
// type Props = {}

const Movies = () => {
  const theme = useAppSelector((state) => state.theme.theme);
  const { nowplaying, upcoming, popular, genre , loading, error } = useAppSelector(
    (state: any) => state.movies,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchNowPlayingMovies());
    dispatch(fetchUpcomingMovies());
    dispatch(fetchPopularMovies());
    dispatch(fetchGenresById());
  }, [dispatch]);

  return (
    <div className="w-full bg-[url('/textures/asfalt-light.png')] bg-repeat ">
      <Navbar />
      <div className={`w-full flex justify-center items-center ${theme === "dark" ? null : "bg-[#EBE9E1]"}`}>
        <MovieCard theme={theme} nowplaying={nowplaying} upcoming={upcoming} popular={popular} genre={genre} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default Movies;
