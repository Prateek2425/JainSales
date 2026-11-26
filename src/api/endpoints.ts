import axiosInstance from './axios';

export const loginApi = (data: any) =>
    axiosInstance.post('/auth/login', data);

export const signupApi = (data: any) =>
    axiosInstance.post('/auth/signup', data);

export const forgotPasswordApi = (data: any) =>
    axiosInstance.post('/auth/forgot-password', data);

export const verifyOtpApi = (data: any) =>
    axiosInstance.post('/auth/verify-otp', data);

export const resetPasswordApi = (data: any) =>
    axiosInstance.post('/auth/reset-password', data);

export const addProductApi = async (data: FormData) => {
    const response = await axiosInstance.post(
        '/api/products',
        data
    );
    return response.data;
};

export const getProductApi = async () => {
    const response = await axiosInstance.get("/products");
    return response;
};

export const deleteProductApi = async (data: any) => {
    const response = await axiosInstance.delete(`/products/${data}`);
    return response.data;
};

export const addCategoryApi = (data: any) =>
    axiosInstance.post('/categories', data);

export const getCategoryApi = async () => {
    const response = await axiosInstance.get("/categories");
    return response;
};

export const productByVendorApi = async () => {
    const response = await axiosInstance.get("/products/vendor");
    return response;
};

export const productByCategoryApi = async (value: string) => {
    const response = await axiosInstance.get(`/products/category/${value}`);
    return response;
};

export const productByIDApi = async (value: string) => {
    const response = await axiosInstance.get(`/products/${value}`);
    return response?.data;
};

export const addWishlistApi = (data: any) =>
    axiosInstance.post('/wishlist/add', data);


export const getWishlistApi = async () => {
    const response = await axiosInstance.get("/wishlist");
    return response?.data;
};

export const deleteWishlistApi = async (data: any) => {
    const response = await axiosInstance.delete(`/wishlist/remove/${data}`);
    return response.data;
};

export const addToCartApi = (data: any) =>
    axiosInstance.post('/cart/add', data);

export const getCartApi = async () => {
    const response = await axiosInstance.get("/cart");
    return response?.data;
};

export const deleteCartApi = async (data: any) => {
    const response = await axiosInstance.delete(`/cart/remove/${data}`);
    return response.data;
};

export const updateCartApi = async (data: any) => {
    const value = {
        quantity: data?.quantity
    }
    const response = await axiosInstance.put(`/cart/update/${data?.id}`, value);
    return response.data;
};

export const addOrderApi = async (productIds: any) => {
    const response = await axiosInstance.post(`/orders/place`, {
        productIds
    });
    return response.data;
};

export const getOrderApi = async () => {
    const response = await axiosInstance.get(`orders/my-orders`);
    return response.data;
};

export const addReviewApi = (data: any) =>
    axiosInstance.post('/orders/createReview', data);

export const orderByUserApi = async () => {
    const response = await axiosInstance.get("/orders/vendor_orders");
    return response?.data;
};

export const updateStatusByVendorApi = async (data: any) => {
    const value = {
        status: data?.status
    }
    const response = await axiosInstance.patch(`/orders/vendor-orders/${data?.id}/status`, value);
    return response.data;
};