import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AuthState {
    user: any;
    isLoading: boolean;
    error: string | null;
    isLoggedin: boolean;
    token: string | null;
}

const initialState: AuthState = {
    user: null,
    isLoading: false,
    error: null,
    isLoggedin: !!localStorage.getitem("token"),
    token: localStorage.getItem("token") || null
}

export const LoginUser = createAsyncThunk(
    'user/login',
    async (credentials:{email:string,password:string},thunkApi) => {
        try {

        } catch (error) {

        }
    }
)


const authSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isLoading = false;
            state.error = null;
            state.isLoggedin = false;
            state.token = null;
        }
    }
})

