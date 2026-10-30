import React, { useState } from "react";
import { StyleSheet, ImageBackground, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ImgAssets from "../../assets/img-assets";
import AtomView from "../../components/atoms/AtomView";
import AtomText from "../../components/atoms/AtomText";
import { Theme } from "../../theme/constants";
import { useDispatch } from "react-redux";
import { logout } from "../auth/authSlice";
import { navigate, reset } from "../../Navigation/RootNavigation";
import ImagePicker from "react-native-image-crop-picker";
import { useAppSelector } from "../../hooks";
const AccountDetails = () => {
    const { token } = useAppSelector(state => state.auth);
    const dispatch = useDispatch()


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFDBE050" }}>
            <AtomView style={styles.container}>
                <ImageBackground
                    source={ImgAssets.bg_auth}
                    style={{ flex: 1, padding: 20 }}
                    resizeMode="cover"
                >

                </ImageBackground>
            </AtomView>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFDBE050",
        justifyContent: "flex-end",
    },
    AccountDetailsContainer: {
        justifyContent: "flex-end",
        alignItems: "center",
        padding: 20,
        paddingHorizontal: 16,
        backgroundColor: Theme.colors.background.secondary,
        borderRadius: 20,
        position: "absolute",
        bottom: 0,
        left: 20,
        right: 20,
    },
    line: {
        width: 60,
        height: 4,
        backgroundColor: "#fbcad0ff",
        borderRadius: 2,
        marginVertical: 12
    }
})
export default AccountDetails;                      