import express from "express";
import {
  NowPlayingMovies,
  UpcomingMovies,
  PopularMovies,
  Genres
} from "../controllers/movie.controller.js";

const movierouter = express.Router();

movierouter.get("/now-playing", NowPlayingMovies);
movierouter.get("/upcoming", UpcomingMovies);
movierouter.get("/popular", PopularMovies);
movierouter.get("/genres", Genres);

export default movierouter;
