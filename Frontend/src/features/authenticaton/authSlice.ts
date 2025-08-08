// [FE/frontend.md > State Management]: Auth slice for authentication state management
// [BE/backend.md > Authentication]: Integration with backend login/register endpoints
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

// [BE/backend.md > Authentication]: Login user with backend integration
export const LoginUser = createAsyncThunk(
    'user/login',
    async (credentials: { username: string, password: string }, thunkApi) => {
        try {
            const res = await axios.post("http://localhost:9090/api/login", credentials);
            
            if (res.data.accessToken) {
                localStorage.setItem("token", res.data.accessToken);
            }

            return res.data;
        } catch (error: any) {
            // [FE/frontend.md > Error Handling]: Robust error handling for login failures
            const errorMessage = error.response?.data?.error || "Login failed. Please try again.";
            return thunkApi.rejectWithValue(errorMessage);
        }
    }
)

// [BE/backend.md > Authentication]: Register user with backend integration
export const RegisterUser = createAsyncThunk(
    'user/register',
    async (credentials: { username: string, email: string, password: string }, thunkApi) => {
        try {
            const res = await axios.post("http://localhost:9090/api/register", credentials);
            if(res.status === 201 && res.data.accessToken){
                localStorage.setItem("token", res.data.accessToken);
            }
            console.log("res.data",res.data.newuser.role);
            return res.data;
        } catch (error: any) {
            // [FE/frontend.md > Error Handling]: Robust error handling for registration failures
            const errorMessage = error.response?.data?.error || "Registration failed. Please try again.";
            return thunkApi.rejectWithValue(errorMessage);
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
            localStorage.removeItem("token");
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // [FE/frontend.md > State Management]: Login states
            .addCase(LoginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(LoginUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isLoading = false;
                state.error = null;
                state.isLoggedin = true;
                state.token = action.payload.accessToken;
            })
            .addCase(LoginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            // [FE/frontend.md > State Management]: Register states
            .addCase(RegisterUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(RegisterUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.accessToken;
                state.isLoggedin = true;
                state.error = null;
            })
            .addCase(RegisterUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    }
})

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;


