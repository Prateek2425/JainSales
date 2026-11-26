import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNavigator from './BottomTabs';
import CustomDrawer from '../components/CustomComponents/CustomDrawer';


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
            })}
            drawerContent={() => <CustomDrawer />}
        >
            <Drawer.Screen
                name="MainTabs"
                component={BottomTabNavigator}
            />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;