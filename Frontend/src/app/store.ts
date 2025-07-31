import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/theme/themeSlice";
import authReducer from "../features/authenticaton/authSlice"; // Import auth reducer
import sidebarReducer from '../features/theme/sliderSlice';

export const store = configureStore({
    reducer:{
     theme: themeReducer,
     auth: authReducer, // Add auth reducer to the store
     sidebar: sidebarReducer
    }
})

export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;