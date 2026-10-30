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
import { useAppDispatch } from "../../hooks";
import { signupUser } from "./authThunk";
const SignUp = () => {
    const dispatch = useAppDispatch();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cnfPassword, setCnfPassword] = useState("");
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [cnFSecureTextEntry, setCnfSecureTextEntry] = useState(true);
    const [loginError, setLoginError] = useState("");
    const [loading, setLoading] = useState(false);


    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const onSignUpHandler = async () => {
        if (username?.length === 0) {
            setLoginError("All Fields Required")
        } else if (validateEmail(email)) {
            if (password?.length <= 5) {
                setLoginError("Password atleast 6 digits")
            } else if (password !== cnfPassword) {
                setLoginError("Password must be match")
            } else {
                setLoading(true)
                const response = await dispatch(
                    signupUser({ name: username, email, password, role: "User" }),
                ).unwrap();
                if (response?.status === 201) {
                    setLoading(false)
                    navigate('Home');
                } else {
                    setLoading(false)
                    setLoginError("Email already exists");
                }
            }
        }
        else {
            setLoginError("Invalid Email")
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
                    <AtomView style={styles.SignUpContainer}>
                        <AtomText title={"Create Account"} fontSize={16} fontWeight="700" />
                        <AtomView style={styles.line} />
                        <AtomText style={{ marginBottom: 16 }} title={"Sign up to explore amazing gift's 🎁"} fontSize={14} color={Theme.colors.text.darkGray} />
                        <CustomTextInput icon="user" value={username} onChangeText={setUsername} placeholder="Full Name" />
                        <CustomTextInput icon="mail" rightIcon={true} value={email} onChangeText={setEmail} placeholder="Email Address" />
                        <CustomTextInput onPress={() => setSecureTextEntry(!secureTextEntry)} icon="lock" rightIcon={true} rightIconName={secureTextEntry ? "eye-off" : "eye"} secureTextEntry={secureTextEntry} value={password} onChangeText={setPassword} placeholder="Password" />
                        <CustomTextInput error={loginError} onPress={() => setCnfSecureTextEntry(!cnFSecureTextEntry)} icon="lock" rightIcon={true} rightIconName={cnFSecureTextEntry ? "eye-off" : "eye"} secureTextEntry={cnFSecureTextEntry} value={cnfPassword} onChangeText={setCnfPassword} placeholder="Confirm Password" />
                        <AtomButton loading={loading} style={{ width: "100%", marginVertical: 16 }} fontWeight="700" color="#FF5E76" title="SignUp" onPress={onSignUpHandler} />
                        <Pressable onPress={() => navigate("Login")} style={{ flexDirection: "row", gap: 3, justifyContent: "center", alignItems: "center" }}>
                            <AtomText title={`Already have an account?`} fontSize={16} />
                            <AtomText title={"Login"} fontSize={16} fontWeight="700" color="#FF5E76" />
                        </Pressable>
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
    SignUpContainer: {
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
export default SignUp;                      