import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/theme/themeSlice";

export const store = configureStore({
    reducer:{
     theme: themeReducer,
    }
})

export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;