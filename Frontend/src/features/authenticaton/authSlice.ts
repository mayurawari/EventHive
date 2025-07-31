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
    isLoggedin: !!localStorage.getItem("token"),
    token: localStorage.getItem("token") || null
}

//Login Uer == Hop In
export const LoginUser = createAsyncThunk(
    'user/login',
    async (credentials: { email: string, password: string }, thunkApi) => {
        try {
            const res = await axios.post("https://event-hive-backend.vercel.app/api/login", credentials);

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
    async (credentials: { name: string, email: string, password: string }, thunkApi) => {
        try {
            const res = await axios.post("https://event-hive-backend.vercel.app/api/register", credentials);
             
            if(res.status === 200){
                localStorage.setItem("token", res.data.token)
            }

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
    },
    extraReducers: (builder) => {
        builder
            //Login States
            .addCase(LoginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null
            })
            .addCase(LoginUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isLoading = false;
                state.error = null;
                state.isLoggedin = true;
                state.token = action.payload.token
            })
            .addCase(LoginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            //Register States
            .addCase(RegisterUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(RegisterUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isLoggedin = true;
                state.error = null;
            })
            .addCase(RegisterUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    }
})


export const { logout } = authSlice.actions;
export default authSlice.reducer;


