import React from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import AtomText from '../atoms/AtomText';
import { useAppSelector } from '../../hooks';


const CustomDrawer = () => {
    const { user } = useAppSelector(state => state.auth);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.profile}>
                    <AtomText title={user?.name?.trim()?.[0]} fontSize={24} fontWeight='700' color='#fff' />
                </View>
                <View>
                    <AtomText title={`${user?.name}`} fontSize={16} fontWeight='700' />
                    <AtomText style={{ marginTop: 2 }} title={user?.email} fontSize={14} />
                </View>
            </View>



        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50,
    },

    header: {
        padding: 20,
        backgroundColor: '#f5f5f5',
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
    },

    profile: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
    },

    profileText: {
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold',
    },

    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    email: {
        marginTop: 5,
        color: 'gray',
    },

    menu: {
        padding: 20,
    },

    menuItem: {
        marginBottom: 2,
        paddingVertical: 10
    },

    menuText: {
        fontSize: 16,

    },

    logout: {
        marginTop: 'auto',
        padding: 20,
    },

    logoutText: {
        color: 'red',
        fontSize: 16,
    },
});

export default CustomDrawer;