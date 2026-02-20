import axios from "axios";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const tmdb = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: process.env.TMDB_API_KEY,
    language: "en-US",
    region: "IN",
  },
});

export const getNowPlayingMovies = () =>
  tmdb.get("/movie/now_playing");

export const getUpcomingMovies = () =>
  tmdb.get("/movie/upcoming");

export const getPopularMovies = () =>
  tmdb.get("/movie/popular");

export const getGenre = () =>
  tmdb.get("/genre/movie/list");