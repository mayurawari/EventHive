import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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

//Login Uer == Hop In
export const LoginUser = createAsyncThunk(
    'user/login',
    async (credentials: { email: string, password: string }, thunkApi) => {
        try {
            const res = await axios.post("https://event-hive-backend.vercel.app/", credentials);

            localStorage.setItem("token", res.data.token)

            return res.data

        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)

//Register User == create profile
export const RegisterUser = createAsyncThunk(
    'user/Register',
    async (credentials: {name: string, email: string, password: string }, thunkApi) => {
        try {
            const res = await axios.post("https://event-hive-backend.vercel.app/", credentials);

            localStorage.setItem("token", res.data.token)

            return res.data

        } catch (error) {
            return thunkApi.rejectWithValue(error)
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

