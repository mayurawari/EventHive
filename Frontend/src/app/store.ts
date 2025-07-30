import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/theme/themeSlice";
import authReducer from "../features/authenticaton/authSlice"; // Import auth reducer

export const store = configureStore({
    reducer:{
     theme: themeReducer,
     auth: authReducer, // Add auth reducer to the store
    }
})

export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;