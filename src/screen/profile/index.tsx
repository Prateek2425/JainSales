import React, { useState } from "react";
import { StyleSheet, ImageBackground, Pressable, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ImgAssets from "../../assets/img-assets";
import AtomView from "../../components/atoms/AtomView";
import AtomText from "../../components/atoms/AtomText";
import { Theme } from "../../theme/constants";
import Feather from 'react-native-vector-icons/Feather';

import { useDispatch } from "react-redux";
import { logout } from "../auth/authSlice";
import { navigate, reset } from "../../Navigation/RootNavigation";
import ImagePicker from "react-native-image-crop-picker";
import { useAppSelector } from "../../hooks";
import AtomButton from "../../components/atoms/AtomButton";

const profileData = [
    { id: 1, screenName: "My Order", routes: "Order", icon: "package" },
    { id: 1, screenName: "Wishlist", routes: "Order", icon: "heart" },
    { id: 2, screenName: "My Coupons", routes: "Order", icon: "command" },
    { id: 3, screenName: "Refer & Earn", routes: "Order", icon: "gift" },
    { id: 4, screenName: "Customer Support", routes: "Order", icon: "headphones" },
]

const Profile = () => {
    // const { token } = useAppSelector(state => state.auth);
    // const dispatch = useDispatch()
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFDBE050" }}>
            <ScrollView style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
                <AtomView style={styles.profile}>
                    <AtomView style={styles.profileimg}>
                        <Image style={{ width: "100%", height: "100%", borderRadius: 40 }} resizeMode="cover" source={{ uri: "https://img.magnific.com/free-vector/user-circles-set_78370-4704.jpg?semt=ais_hybrid&w=740&q=80" }} />
                    </AtomView>
                    <AtomView style={styles.profileName}>
                        <AtomText title="Prateek Jain" fontSize={16} fontWeight="700" />
                        <AtomText title="Prateekk2425@gmail.com" style={{ marginVertical: 3 }} color={Theme.colors.text.darkGray} />
                        <AtomText title="+91-7000450001" color={Theme.colors.text.darkGray} />
                    </AtomView>
                    <AtomView style={styles.editbtn}>
                        <Feather name="edit" color="#111" size={22} />
                    </AtomView>
                </AtomView>
                <AtomView style={styles.subHead} >
                    {profileData?.map((item, index) => {
                        return (
                            <Pressable style={{ flexDirection: "row", borderBottomWidth: profileData?.length - 1 === index ? 0 : 1, paddingVertical: 16, borderBottomColor: Theme.colors.common.borderColor, justifyContent: "space-between" }} key={index}>
                                <AtomView style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                                    <Feather name={item?.icon} color="#111" size={18} />
                                    <AtomText title={item?.screenName} fontSize={14} />
                                </AtomView>

                                <Feather name="chevron-right" color="#111" size={22} />
                            </Pressable>
                        )
                    })}
                </AtomView>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    profile: {
        backgroundColor: "#F0E0F0",
        padding: 12,
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },
    profileimg: {
        width: 80,
        height: 80,
        borderRadius: 80 / 2,
        backgroundColor: "#fff",
    },
    profileName: {
        flex: 1,
        justifyContent: "center"
    },
    editbtn: {
        width: 25,
        height: 25,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        right: 10,
        top: 20
    },
    subHead: {
        paddingHorizontal: 20,
        paddingVertical: 6,
        backgroundColor: '#FFFFFF',
        elevation: 10,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.12,
        shadowRadius: 10,
        marginTop: 16,
    }
})
export default Profile;                      