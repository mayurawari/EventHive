// [FE/frontend.md > State Management]: Redux Toolkit store setup for EventHive
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/theme/themeSlice";
import authReducer from "../features/authenticaton/authSlice"; // Import auth reducer
import sidebarReducer from '../features/theme/sliderSlice';
import eventReducer from '../features/events/eventSlice'; // Import event reducer
import movieSlice from "../features/movie/movieSlice"
export const store = configureStore({
    reducer:{
     theme: themeReducer,
     auth: authReducer, // Add auth reducer to the store
     sidebar: sidebarReducer,
     events: eventReducer, // Add event reducer to the store
     movies: movieSlice
    }
})

export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;