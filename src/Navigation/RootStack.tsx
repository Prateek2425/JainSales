import React from 'react';
// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from './RootNavigation';
import { Platform } from 'react-native';
import AtomStatusBar from '../components/atoms/AtomStatusBar';
import Login from '../screen/auth/Login';
import SignUp from '../screen/auth/SignUp';
import ResetPassword from '../screen/auth/ResetPassword';
import { useAppSelector } from '../hooks';
import DrawerNavigator from './DrawerNavigator';
import AddProductScreen from '../screen/dashboard/Products/AddProductScreen';
import ProductDetailScreen from '../screen/dashboard/Home/ProductDetailsScreen';
import ProductByCategories from '../screen/dashboard/Categories/ProductByCategories';
import WishListScreen from '../screen/dashboard/WishListScreen';
import CartScreen from '../screen/dashboard/Cart';
import OrderSuccessReview from '../screen/dashboard/Cart/OrderSuccessReview';
import MyOrdersScreen from '../screen/dashboard/OrderScreen';
import OrderByUser from '../screen/dashboard/Products/OrderByUser';

const Stack = createNativeStackNavigator();

const RootStack = () => {
    const { token, success } = useAppSelector(state => state.auth);
    const initialRouteName = success ? "DrawerNavigator" : "Login"

    return (
        <NavigationContainer ref={navigationRef}>
            {Platform.OS === "android" && (
                <AtomStatusBar />
            )}

            <Stack.Navigator
                initialRouteName={initialRouteName}
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen
                    name="Login"
                    component={Login}
                />
                <Stack.Screen
                    name="SignUp"
                    component={SignUp}
                />
                <Stack.Screen
                    name="DrawerNavigator"
                    component={DrawerNavigator}
                />
                <Stack.Screen
                    name="ResetPassword"
                    component={ResetPassword}
                />
                <Stack.Screen
                    name="AddProductScreen"
                    component={AddProductScreen}
                />
                <Stack.Screen
                    name="ProductDetailScreen"
                    component={ProductDetailScreen}
                />
                <Stack.Screen
                    name="ProductByCategories"
                    component={ProductByCategories}
                />
                <Stack.Screen
                    name="WishListScreen"
                    component={WishListScreen}
                />
                <Stack.Screen
                    name="CartScreen"
                    component={CartScreen}
                />
                <Stack.Screen
                    name="OrderSuccessReview"
                    component={OrderSuccessReview}
                />
                 <Stack.Screen
                    name="MyOrdersScreen"
                    component={MyOrdersScreen}
                />
                  <Stack.Screen
                    name="OrderByUser"
                    component={OrderByUser}
                />
            </Stack.Navigator>

        </NavigationContainer>
    );
}

export default RootStack;
