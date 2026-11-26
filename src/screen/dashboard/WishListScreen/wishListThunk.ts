
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addToCartApi, addWishlistApi, deleteCartApi, deleteWishlistApi, getCartApi, getWishlistApi, updateCartApi } from "../../../api/endpoints";

// Get wishlist
export const getWishlistProduct = createAsyncThunk(
    "wishlist/getWishlistProduct",
    async (_: any, thunkAPI) => {
        try {
            const response = await getWishlistApi();
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);

// Add wishlist
export const addToWishlist = createAsyncThunk(
    "wishlist/addToWishlist",
    async (data: any, thunkAPI) => {
        try {
            const response = await addWishlistApi(data);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);

// Remove wishlist
export const removeFromWishlist = createAsyncThunk(
    "wishlist/removeFromWishlist",
    async (data: any, thunkAPI) => {
        try {
            const response = await deleteWishlistApi(data);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);

export const getCartProduct = createAsyncThunk(
    "wishlist/getCartProduct",
    async (_: any, thunkAPI) => {
        try {
            const response = await getCartApi();
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);

// Add wishlist
export const addToCart = createAsyncThunk(
    "wishlist/addToCart",
    async (data: any, thunkAPI) => {
        try {
            const response = await addToCartApi(data);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);

// Remove wishlist
export const removeFromCart = createAsyncThunk(
    "wishlist/removeFromCart",
    async (data: any, thunkAPI) => {
        try {
            const response = await deleteCartApi(data);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);

export const updateFromCart = createAsyncThunk(
    "wishlist/updateFromCart",
    async (data: any, thunkAPI) => {
        try {
            const response = await updateCartApi(data);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);


