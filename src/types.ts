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
    orderByUserData: any
    productData: any;
    productByVendorData: any;
    loading: boolean;
    error: string | null;
    success: boolean;
}

export interface orderState {
    orderListData: any
}

export interface ProductCardProps {
    item: any,
    showWishList: boolean,
    ownProduct?: boolean
}
