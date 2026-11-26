import { createAsyncThunk } from '@reduxjs/toolkit';

import {
    addCategoryApi,
    addProductApi,
    addReviewApi,
    deleteProductApi,
    getCategoryApi,
    getProductApi,
    orderByUserApi,
    productByCategoryApi,
    productByIDApi,
    productByVendorApi,
    updateStatusByVendorApi,
} from '../../api/endpoints';

export const addProduct = createAsyncThunk(
    'product/addProduct',
    async (formData: FormData, thunkAPI) => {
        try {
            const response = await addProductApi(formData);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || 'Something went wrong'
            );
        }
    }
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

export const deleteProduct = createAsyncThunk(
    "dashboard/deleteProduct",
    async (data: any, thunkAPI) => {
        try {
            const response = await deleteProductApi(data);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);

export const addCategory = createAsyncThunk(
    'dashboard/addCategory',
    async (data: any, thunkAPI) => {
        try {
            const response = await addCategoryApi(data);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message,
            );
        }
    },
);

export const getCategory = createAsyncThunk(
    "dashboard/getCategory",
    async (_: any, thunkAPI) => {
        try {
            const response = await getCategoryApi();
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);

export const productByVendor = createAsyncThunk(
    "dashboard/productByVendor",
    async (_: any, thunkAPI) => {
        try {
            const response = await productByVendorApi();
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);

export const productByCategory = createAsyncThunk(
    "dashboard/productByCategory",
    async (data: any, thunkAPI) => {
        try {
            const response = await productByCategoryApi(data);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);

export const productByID = createAsyncThunk(
    "dashboard/productByID",
    async (data: any, thunkAPI) => {
        try {
            const response = await productByIDApi(data);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);

export const addReview = createAsyncThunk(
    "dashboard/addReview",
    async (data: any, thunkAPI) => {
        try {
            const response = await addReviewApi(data);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);

export const orderByUser = createAsyncThunk(
    "dashboard/orderByUser",
    async (data: any, thunkAPI) => {
        try {
            const response = await orderByUserApi();
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);

export const updateStatusByVendor = createAsyncThunk(
    "dashboard/updateStatusByVendor",
    async (data: any, thunkAPI) => {
        try {
            const response = await updateStatusByVendorApi(data);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);