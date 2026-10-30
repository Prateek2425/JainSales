import axios from './axios';

export const loginApi = (data: any) =>
    axios.post('/auth/login', data);

export const signupApi = (data: any) =>
    axios.post('/auth/signup', data);

export const forgotPasswordApi = (data: any) =>
    axios.post('/auth/forgot-password', data);

export const verifyOtpApi = (data: any) =>
    axios.post('/auth/verify-otp', data);

export const resetPasswordApi = (data: any) =>
    axios.post('/auth/reset-password', data);

export const addProductApi = (data: any) =>
    axios.post('/products', data);

export const getProductApi = async () => {
    const response = await axios.get("/products");
    return response;
};