export interface User {
    _id: string;
    name: string;
    email: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
    success: boolean;
}

export interface ProductState {
    productData: any;
    loading: boolean;
    error: string | null;
    success: boolean;
}