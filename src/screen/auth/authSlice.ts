import { createSlice } from '@reduxjs/toolkit';

import {
    loginUser,
    signupUser,
} from './authThunk.ts';

import { AuthState } from '../../types.ts'

const initialState: AuthState = {
    user: null,
    token: null,
    loading: false,
    error: null,
    success: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: state => {
            state.user = null;
            state.token = null;
        },
        clearError: state => {
            state.error = null;
        },
        clearSuccess: state => {
            state.success = false;
        },
    },

    extraReducers: builder => {
        builder
            .addCase(loginUser.pending, state => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload?.data?.user;
                state.token = action.payload?.data?.token;
                state.success = true;
            })
            .addCase(loginUser.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            })
            // SIGNUP
            .addCase(signupUser.pending, state => {
                state.loading = true;
            })
            .addCase(signupUser.fulfilled, (state, action: any) => {
                state.loading = false;
                state.user = action.payload?.data?.user;
                state.token = action.payload?.data?.token;
                state.success = true;
            })
            .addCase(signupUser.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export const {
    logout,
    clearError,
    clearSuccess,
} = authSlice.actions;

export default authSlice.reducer;