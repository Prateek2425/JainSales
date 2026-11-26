import { createAsyncThunk } from "@reduxjs/toolkit";
import { addOrderApi, getOrderApi } from "../../../api/endpoints";


export const getOrderProduct = createAsyncThunk(
    "Order/getOrderProduct",
    async (_: any, thunkAPI) => {
        try {
            const response = await getOrderApi();
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);

// Add Order
export const addToOrder = createAsyncThunk(
    "Order/addToOrder",
    async (productIds: any, thunkAPI) => {
        try {
            const response = await addOrderApi(productIds);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);