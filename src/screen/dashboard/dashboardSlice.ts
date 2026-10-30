import { createSlice } from '@reduxjs/toolkit';

import { getProducts } from './dashboardThunk.ts';
import { ProductState } from '../../types.ts';

const initialState: ProductState = {
    productData: null,
    loading: false,
    error: null,
    success: false,
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {},

    extraReducers: builder => {
        builder
            .addCase(getProducts.pending, state => {
                state.loading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                console.log("actionaction", action?.payload)
                state.loading = false;
                // state.productData = action.payload?.data?.user;
                state.success = true;
            })
            .addCase(getProducts.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export const { } = dashboardSlice.actions;

export default dashboardSlice.reducer;