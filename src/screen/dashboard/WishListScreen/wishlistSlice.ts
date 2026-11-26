
import { createSlice } from "@reduxjs/toolkit";
import { addToWishlist, getCartProduct, getWishlistProduct, removeFromWishlist } from "./wishListThunk";

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        wishlistIds: [],
        cartData: [],
        cartItem: 0,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getWishlistProduct.fulfilled, (state, action) => {
                state.wishlistIds = action.payload?.data?.map(item => item._id);
            })
            .addCase(addToWishlist.fulfilled, (state, action) => {
                if (!state.wishlistIds.includes(action.payload.productId)) {
                    state.wishlistIds.push(action.payload.productId);
                }
            })
            .addCase(getCartProduct.fulfilled, (state, action) => {
                console.log("action.payload12345", action.payload)
                state.cartData = action.payload?.cart?.items;
                state.cartItem = action.payload?.cart?.items?.length;
            })
            .addCase(removeFromWishlist.fulfilled, (state, action) => {
                state.wishlistIds = state.wishlistIds.filter(
                    id => id !== action.payload
                );
            });

    },
});

export default wishlistSlice.reducer;
