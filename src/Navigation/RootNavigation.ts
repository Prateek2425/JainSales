import {
    createNavigationContainerRef,
    StackActions,
} from '@react-navigation/native';

export type RootStackParamList = {
    Login: undefined;
    SignUp: undefined;
    Home: undefined;
    ForgotPassword: undefined;
    VerifyOtp: {
        email: string;
    };
    ResetPassword: {
        email: string;
        otp: string
    };
};

export const navigationRef =
    createNavigationContainerRef<RootStackParamList>();

export function navigate<
    T extends keyof RootStackParamList,
>(name: T, params?: RootStackParamList[T]) {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, params);
    }
}

export function replace<
    T extends keyof RootStackParamList,
>(name: T, params?: RootStackParamList[T]) {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(StackActions.replace(name, params));
    }
}

export function goBack() {
    if (navigationRef.canGoBack()) {
        navigationRef.goBack();
    }
}

export function reset(name: keyof RootStackParamList) {
    if (navigationRef.isReady()) {
        navigationRef.reset({
            index: 0,
            routes: [{ name }],
        });
    }
}