import { createSlice } from '@reduxjs/toolkit';

import { getProducts, orderByUser, productByVendor } from './dashboardThunk.ts';
import { ProductState } from '../../types.ts';

const initialState: ProductState = {
    orderByUserData: [],
    productData: [],
    productByVendorData: [],
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
            .addCase(getProducts.fulfilled, (state, action) => {
                state.productData = action?.payload?.data?.data
                state.loading = false;
                state.success = true;
            })
            .addCase(productByVendor.fulfilled, (state, action) => {
                state.productByVendorData = action?.payload?.data?.products;
            })
            .addCase(orderByUser.fulfilled, (state, action) => {
                state.orderByUserData = action?.payload?.orders;
            })
    },
});

export const { } = dashboardSlice.actions;

export default dashboardSlice.reducer;