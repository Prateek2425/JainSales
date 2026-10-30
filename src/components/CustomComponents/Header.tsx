import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';

import { Theme } from '../../theme/constants';

interface HeaderProps {
    userName?: string;
    cartCount?: number;
    notificationCount?: number;
    onMenuPress?: () => void;
    onNotificationPress?: () => void;
    onWishlistPress?: () => void;
    onCartPress?: () => void;
}

const Header = ({
    userName = 'Discover best deals today',
    cartCount = 2,
    notificationCount = 3,
    onMenuPress,
    onNotificationPress,
    onWishlistPress,
    onCartPress,
}: HeaderProps) => {
    return (
        <View style={styles.container}>
            {/* Left */}
            <View style={styles.leftContainer}>
                <TouchableOpacity onPress={onMenuPress}>
                    <Octicons
                        name="three-bars"
                        size={26}
                        color="#222"
                    />
                </TouchableOpacity>

                <View style={styles.userContainer}>
                    <Text style={styles.welcomeText}>Hello Prateek</Text>

                    <Text style={styles.userName}>
                        {userName}
                    </Text>
                </View>
            </View>

            {/* Right */}
            <View style={styles.rightContainer}>
                {/* <IconButton
                    icon="notifications-outline"
                    badge={notificationCount}
                    onPress={onNotificationPress}
                /> */}

                <IconButton
                    icon="heart-outline"
                    onPress={onWishlistPress}
                />

                <IconButton
                    icon="cart-outline"
                    badge={cartCount}
                    onPress={onCartPress}
                />
            </View>
        </View>
    );
};

interface IconProps {
    icon: string;
    badge?: number;
    onPress?: () => void;
}

const IconButton = ({
    icon,
    badge,
    onPress,
}: IconProps) => (
    <TouchableOpacity
        style={styles.iconContainer}
        onPress={onPress}
    >
        <Ionicons
            name={icon}
            size={24}
            color="#222"
        />

        {badge ? (
            <View style={styles.badge}>
                <Text style={styles.badgeText}>
                    {badge}
                </Text>
            </View>
        ) : null}
    </TouchableOpacity>
);

export default Header;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
    },

    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    userContainer: {
        marginLeft: 15,
    },

    welcomeText: {
        fontSize: 14,
        color: '#111',
    },

    userName: {
        fontSize: 12,
        color: Theme.colors.text.darkGray,
    },

    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    iconContainer: {
        width: 34,
        height: 34,
        borderRadius: 21,
        justifyContent: 'center',
        alignItems: 'center',
    },

    badge: {
        position: 'absolute',
        top: 1,
        right: 1,
        minWidth: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#FF3B30',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 3,
    },

    badgeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '700',
    },
});