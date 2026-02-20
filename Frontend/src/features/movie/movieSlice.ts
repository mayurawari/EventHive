import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;

interface MoviesState {
  nowplaying: [],
  upcoming: [],
  popular: [],
  genre: []
  loading: {
    nowplaying: boolean,
    upcoming: boolean,
    popular: boolean,
    genre:boolean
  },
  error: {
    nowplaying: string | null,
    upcoming: string | null,
    popular: string | null,
    genre: string |null
  }
}

export const fetchNowPlayingMovies = createAsyncThunk(
  "movies/fetchNowPlaying",
  async () => {
    const res = await axios.get(`${API}/now-playing`);
    return res.data;
  },
);

export const fetchUpcomingMovies = createAsyncThunk(
  "movies/fetchUpcoming",
  async () => {
    const res = await axios.get(`${API}/upcoming`);
    return res.data;
  },
);

export const fetchPopularMovies = createAsyncThunk(
  "movies/fetchPopular",
  async () => {
    const res = await axios.get(`${API}/popular`);
    return res.data;
  },
);

export const fetchGenresById = createAsyncThunk(
  "movies/genres",
  async () => {
    const res = await axios.get(`${API}/popular`);
    return res.data;
  },
);



const initialState: MoviesState = {
    nowplaying: [],
    upcoming: [],
    popular: [],
    genre:[],
    loading: {
      nowplaying: false,
      upcoming: false,
      popular: false,
      genre:false
    },
    error: {
      nowplaying: null,
      upcoming: null,
      popular: null,
      genre: null
    }
  }

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //NOW-PLAYING 
      .addCase(fetchNowPlayingMovies.pending, (state) => {
        state.loading.nowplaying = true;
        state.error.nowplaying = null;
      })
      .addCase(fetchNowPlayingMovies.fulfilled, (state, action) => {
        state.loading.nowplaying = false;
        state.nowplaying = action.payload;
      })
      .addCase(fetchNowPlayingMovies.rejected, (state, action) => {
        state.loading.nowplaying = false;
        state.error.nowplaying = action.error.message || "Failed to fetch nowplaying movies";
      })

      //UPCOMING
      .addCase(fetchUpcomingMovies.pending, (state) => {
        state.loading.upcoming = true;
      })
      .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
        state.loading.upcoming = false;
        state.upcoming = action.payload;
      })
      .addCase(fetchUpcomingMovies.rejected, (state, action) => {
        state.loading.upcoming = false;
        state.error.upcoming = action.error.message || "Failed to fetch upcoming movies";
      })

      //POPULAR
      .addCase(fetchPopularMovies.pending, (state) => {
        state.loading.popular = true;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.loading.popular = false;
        state.popular = action.payload;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.loading.popular = false;
        //Nullish Coalescing Operator "??" meaning if not a then b else a.
        state.error.popular = action.error.message ?? "Failed to fetch popular movies";
      })

      //GENRES
      .addCase(fetchGenresById.pending, (state) => {
        state.loading.popular = true;
      })
      .addCase(fetchGenresById.fulfilled, (state, action) => {
        state.loading.popular = false;
        state.popular = action.payload;
      })
      .addCase(fetchGenresById.rejected, (state, action) => {
        state.loading.popular = false;
        //Nullish Coalescing Operator "??" meaning if not a then b else a.
        state.error.popular = action.error.message ?? "Failed to fetch genres";
      })
  }
})

export default movieSlice.reducer;