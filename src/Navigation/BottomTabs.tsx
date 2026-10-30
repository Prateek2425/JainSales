import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screen/dashboard/Home';
import CategoryScreen from '../screen/dashboard/Home';
import OrdersScreen from '../screen/dashboard/Home';
import WishlistScreen from '../screen/dashboard/Home';
import ProfileScreen from '../screen/profile';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: true,
                tabBarActiveTintColor: '#4F46E5',
                tabBarInactiveTintColor: '#999',
                tabBarStyle: styles.tabBarStyle,
                tabBarLabelStyle: {
                    marginTop: 6
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = '';

                    switch (route.name) {
                        case 'Home':
                            iconName = focused ? 'home' : 'home-outline';
                            break;

                        case 'Category':
                            iconName = focused ? 'grid' : 'grid-outline';
                            break;

                        case 'Orders':
                            iconName = focused ? 'cube' : 'cube-outline';
                            break;

                        case 'Wishlist':
                            iconName = focused ? 'heart' : 'heart-outline';
                            break;

                        case 'Profile':
                            iconName = focused ? 'person' : 'person-outline';
                            break;
                    }

                    return (
                        <View style={focused && styles.activeIcon}>
                            <Ionicons
                                name={iconName}
                                size={size}
                                color={color}
                            />
                        </View>
                    );
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />

            <Tab.Screen
                name="Category"
                component={CategoryScreen}
            />

            <Tab.Screen
                name="Orders"
                component={OrdersScreen}
            />

            <Tab.Screen
                name="Wishlist"
                component={WishlistScreen}
            />

            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
            />
        </Tab.Navigator>
    );
};

export default BottomTabs;

const styles = StyleSheet.create({
    tabBar: {
        height: 70,
        paddingBottom: 8,
        paddingTop: 8,
        borderTopWidth: 0,
        backgroundColor: '#fff',

        elevation: 15,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 6,
    },

    activeIcon: {
        width: 42,
        height: 42,
        borderRadius: 21,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEF2FF',
    },
    tabBarStyle: {
        position: 'absolute',
        left: 16,
        right: 16,
        height: 85,
        paddingTop: 10,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 0,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.12,
        shadowRadius: 10,
    },
});