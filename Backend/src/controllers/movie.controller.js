import {getNowPlayingMovies, getUpcomingMovies, getPopularMovies, getGenre} from "../services/tmdb.service.js"

export const NowPlayingMovies = async (req, res) => {
  try {
    const response = await getNowPlayingMovies();
    res.json(response.data.results);
  } catch (error) {
    console.log("error in now playing movies",error)
  }
};

export const UpcomingMovies = async (req, res) => {
  try {
    const response = await getUpcomingMovies();
    res.json(response.data.results);
  } catch (error) {
    console.log("error in upcoming movies",error)
  }
};

export const PopularMovies = async (req, res) => {
  try {
    const response = await getPopularMovies();
    res.json(response.data.results);
  } catch (error) {
    console.log("error in popularmovies", error)
  }
};

export const Genres = async (req, res) => {
  try {
    const response = await getGenre();
    res.json(response.data.results);
  } catch (error) {
    console.log("error in getting genres", error)
  }
};
