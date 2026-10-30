import React, { useState } from "react";
import { StyleSheet, ImageBackground, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ImgAssets from "../../assets/img-assets";
import AtomView from "../../components/atoms/AtomView";
import AtomText from "../../components/atoms/AtomText";
import { Theme } from "../../theme/constants";
import CustomTextInput from "../../components/CustomComponents/CustomTextInput";
import AtomButton from "../../components/atoms/AtomButton";
import { navigate } from "../../Navigation/RootNavigation";
import { resetPassword } from "./authThunk";
import { useAppDispatch } from "../../hooks";
const ResetPassword = ({ route }: any) => {

    const dispatch = useAppDispatch();
    const { email, otp } = route?.params
    const [password, setPassword] = useState("");
    const [cnfPassword, setCnfPassword] = useState("");
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [cnFSecureTextEntry, setCnfSecureTextEntry] = useState(true);
    const [resetError, setResetError] = useState('');
    const [loading, setLoading] = useState(false);

    const onResetHandler = async () => {
        if (password?.length <= 5) {
            setResetError("Password atleast 6 digits")
        } else if (password !== cnfPassword) {
            setResetError("Password must be match")
        } else {
            setLoading(true)
            const response = await dispatch(
                resetPassword({ email: email, otp: otp, password }),
            ).unwrap();
            if (response?.status === 200) {
                setLoading(false)
                navigate('Login');
            } else {
                setLoading(false)
            }
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFDBE050" }}>
            <AtomView style={styles.container}>
                <ImageBackground
                    source={ImgAssets.bg_auth}
                    style={{ flex: 1, padding: 20 }}
                    resizeMode="cover"
                >
                    <AtomView style={styles.ResetPasswordContainer}>
                        <AtomText title={"Reset Password"} fontSize={16} fontWeight="700" />
                        <AtomView style={styles.line} />
                        <AtomText style={{ marginBottom: 16 }} title={"Reset your password to continue"} fontSize={14} color={Theme.colors.text.darkGray} />
                        <CustomTextInput onPress={() => setSecureTextEntry(!secureTextEntry)} icon="lock" rightIcon={true} rightIconName={secureTextEntry ? "eye-off" : "eye"} secureTextEntry={secureTextEntry} value={password} onChangeText={setPassword} placeholder="Password" />
                        <CustomTextInput error={resetError} onPress={() => setCnfSecureTextEntry(!cnFSecureTextEntry)} icon="lock" rightIcon={true} rightIconName={cnFSecureTextEntry ? "eye-off" : "eye"} secureTextEntry={cnFSecureTextEntry} value={cnfPassword} onChangeText={setCnfPassword} placeholder="Confirm Password" />
                        <AtomButton loading={loading} style={{ width: "100%", marginTop: 16 }} fontWeight="700" color="#FF5E76" title="Reset Password" onPress={onResetHandler} />
                    </AtomView>
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
    ResetPasswordContainer: {
        justifyContent: "flex-end",
        alignItems: "center",
        padding: 20,
        paddingHorizontal: 20,
        backgroundColor: Theme.colors.background.secondary,
        borderRadius: 16,
        position: "absolute",
        bottom: 20,
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
export default ResetPassword;                      