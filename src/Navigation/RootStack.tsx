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
import Home from '../screen/dashboard/Home';
import { useAppSelector } from '../hooks';
import BottomTabs from './BottomTabs';
import Profile from '../screen/profile';

const Stack = createNativeStackNavigator();

const RootStack = () => {
    const { token } = useAppSelector(state => state.auth);

    return (
        <NavigationContainer ref={navigationRef}>
            {Platform.OS === "android" && (
                <AtomStatusBar />
            )}

            <Stack.Navigator
                initialRouteName={token !== null ? "BottomTabs" : "Login"}
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
                    name="ResetPassword"
                    component={ResetPassword}
                />
                <Stack.Screen
                    name="BottomTabs"
                    component={BottomTabs}
                />
                <Stack.Screen
                    name="Home"
                    component={Home}
                />
            </Stack.Navigator>

        </NavigationContainer>
    );
}

export default RootStack;
