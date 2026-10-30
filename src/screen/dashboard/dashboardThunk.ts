import { createAsyncThunk } from '@reduxjs/toolkit';

import {
    addProductApi,
    getProductApi,
} from '../../api/endpoints';

export const addProduct = createAsyncThunk(
    'dashboard/addProducts',
    async (data: any, thunkAPI) => {
        try {
            const response = await addProductApi(data);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message,
            );
        }
    },
);

export const getProducts = createAsyncThunk(
    "dashboard/getProducts",
    async (_, thunkAPI) => {
        try {
            const response = await getProductApi();
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);
