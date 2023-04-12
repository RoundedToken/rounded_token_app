import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as AuthService from '../services/AuthService';

const initialState = {
    isAuth: false,
    error: null,
    user: {},
    isLoading: false,
};

export const registration = createAsyncThunk('registration', async (data, ThunkApi) => {
    try {
        const response = await AuthService.registration(data.email, data.password, data.nickname);
        return response.data;
    } catch (e) {
        return ThunkApi.rejectWithValue(e.response.data.message);
    }
});

export const logout = createAsyncThunk('logout', async (_, ThunkApi) => {
    try {
        await AuthService.logout();
    } catch (e) {
        return ThunkApi.rejectWithValue(e.response.data.message);
    }
});

export const login = createAsyncThunk('login', async (data, ThunkApi) => {
    try {
        const response = await AuthService.login(data.email, data.password);
        return response.data;
    } catch (e) {
        return ThunkApi.rejectWithValue(e.response.data.message);
    }
});

export const checkAuth = createAsyncThunk('checkAuth', async (_, ThunkApi) => {
    try {
        const response = await AuthService.checkAuth();
        return response.data;
    } catch (e) {
        return ThunkApi.rejectWithValue(e.response.data.message);
    }
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setErrorClear(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            //registration
            .addCase(registration.fulfilled.type, (state, action) => {
                state.isLoading = false;
                state.isAuth = true;
                state.user = action.payload.user;
                localStorage.token = action.payload.accessToken;
            })
            .addCase(registration.pending.type, (state) => {
                state.isLoading = true;
            })
            .addCase(registration.rejected.type, (state, action) => {
                state.isLoading = false;
                state.error = action.payload === undefined ? 'Unknown error' : action.payload;
            })

            //logout
            .addCase(logout.fulfilled.type, (state) => {
                state.isLoading = false;
                state.isAuth = false;
                localStorage.removeItem('token');
            })
            .addCase(logout.pending.type, (state) => {
                state.isLoading = true;
            })
            .addCase(logout.rejected.type, (state, action) => {
                state.isLoading = false;
                state.error = action.payload === undefined ? 'Unknown error' : action.payload;
            })

            //login
            .addCase(login.fulfilled.type, (state, action) => {
                state.isLoading = false;
                state.isAuth = true;
                state.user = action.payload.user;
                localStorage.token = action.payload.accessToken;
            })
            .addCase(login.pending.type, (state) => {
                state.isLoading = true;
            })
            .addCase(login.rejected.type, (state, action) => {
                state.isLoading = false;
                state.error = action.payload === undefined ? 'Unknown error' : action.payload;
            })

            //refresh
            .addCase(checkAuth.fulfilled.type, (state, action) => {
                state.isLoading = false;
                state.isAuth = true;
                state.user = action.payload.user;
                localStorage.token = action.payload.accessToken;
            })
            .addCase(checkAuth.pending.type, (state) => {
                state.isLoading = true;
            })
            .addCase(checkAuth.rejected.type, (state, action) => {
                state.isLoading = false;
                state.error = action.payload === undefined ? 'Unknown error' : action.payload;
            });
    },
});

export const { setErrorClear } = authSlice.actions;

export default authSlice.reducer;
