import { createSlice } from "@reduxjs/toolkit";


interface ThemeState{
    theme :string;
}

const initialState: ThemeState = {
 theme : localStorage.getItem("theme") || "light"
}

const themeSlice = createSlice({
    name : 'theme',
    initialState,
    reducers : {
        toggleTheme : (state) =>{
            state.theme = state.theme === "light" ? "dark" : "light"; 
            localStorage.setItem("theme",state.theme);
        },

    },
})

export const {toggleTheme} = themeSlice.actions;
const  themeReducer =  themeSlice.reducer;
export default themeReducer;
