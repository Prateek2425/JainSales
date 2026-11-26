import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import { DrawerActions, useNavigation } from '@react-navigation/native';

import { Theme } from '../../theme/constants';
import { goBack, navigate } from '../../Navigation/RootNavigation';
import AtomText from '../atoms/AtomText';
import { useAppSelector } from '../../hooks';

interface HeaderProps {
    userName?: string;
    cartCount?: number;
    notificationCount?: number;
    onMenuPress?: () => void;
    onNotificationPress?: () => void;
    back?: boolean,
    title?: string
}

const Header = ({
    userName = 'Discover best deals today',
    cartCount = 2,
    notificationCount = 3,
    onMenuPress,
    onNotificationPress,
    back,
    title
}: HeaderProps) => {
    const { cartItem } = useAppSelector((state) => state?.wishList)
    const navigation = useNavigation();
    
    const onWishlistPress = () => {
        navigate("WishListScreen")
    }

    const onCartPress = () => {
        navigate("CartScreen")
    }

    return (
        <View style={styles.container}>
            {/* Left */}
            <View style={styles.leftContainer}>
                <TouchableOpacity
                    onPress={() => {
                        if (back) {
                            goBack()
                        } else {
                            navigation.dispatch(
                                DrawerActions.openDrawer()
                            )
                        }
                    }}
                >
                    <Octicons
                        name={back ? "arrow-left" : "three-bars"}
                        size={26}
                        color="#222"
                    />
                </TouchableOpacity>
                <View style={styles.userContainer}>
                    {title !== undefined ? (<AtomText fontSize={18} fontWeight='600' title={title} />)
                        :
                        <>
                            <Text style={styles.welcomeText}>Hello Prateek</Text>
                            <Text style={styles.userName}>
                                {userName}
                            </Text>
                        </>
                    }
                </View>
            </View>

            {back ? null :
                <View style={styles.rightContainer}>
                    <IconButton
                        icon="heart-outline"
                        onPress={onWishlistPress}
                    />

                    <IconButton
                        icon="cart-outline"
                        badge={cartItem}
                        onPress={onCartPress}
                    />
                </View>
            }

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