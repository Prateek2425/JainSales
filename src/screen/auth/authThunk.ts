import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  loginApi,
  signupApi,
  forgotPasswordApi,
  verifyOtpApi,
  resetPasswordApi,
} from '../../api/endpoints';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (data: any, thunkAPI) => {
    try {
      const response = await loginApi(data);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message,
      );
    }
  },
);

export const signupUser = createAsyncThunk(
  'auth/signup',
  async (data: any, thunkAPI) => {
    try {
      const response = await signupApi(data);
      return response;
    } catch (error: any) {
      return error
    }
  },
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (data: any, thunkAPI) => {
    try {
      const response = await forgotPasswordApi(data);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message,
      );
    }
  },
);

export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async (data: any, thunkAPI) => {
    try {
      const response = await verifyOtpApi(data);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message,
      );
    }
  },
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (data: any, thunkAPI) => {
    try {
      const response = await resetPasswordApi(data);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message,
      );
    }
  },
);