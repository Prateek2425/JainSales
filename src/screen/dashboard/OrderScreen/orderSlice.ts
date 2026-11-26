import { createSlice } from '@reduxjs/toolkit';

import { orderState } from '../../../types.ts';

const initialState: orderState = {
    orderListData: []
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        getOrderList: (state, action) => {
            state.orderListData = action?.payload;
        },
    },
});

export const { getOrderList } = orderSlice.actions;

export default orderSlice.reducer;