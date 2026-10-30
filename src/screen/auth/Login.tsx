import React, { useState } from "react";
import { StyleSheet, ImageBackground, Pressable, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ImgAssets from "../../assets/img-assets";
import AtomView from "../../components/atoms/AtomView";
import AtomText from "../../components/atoms/AtomText";
import { Theme } from "../../theme/constants";
import CustomTextInput from "../../components/CustomComponents/CustomTextInput";
import AtomButton from "../../components/atoms/AtomButton";
import { navigate } from "../../Navigation/RootNavigation";
import ForgotPassword from "./ForgotPassword";
import VarifiedOtp from "./VerifiedOtp";
import { forgotPassword, loginUser, verifyOtp } from "./authThunk";
import { useAppDispatch } from "../../hooks";

const Login = () => {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState("");
    const [forgotEmail, setForgotEmail] = useState("");
    const [otpNumber, setOtpNumber] = useState("");
    const [password, setPassword] = useState("");
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [forgotOpen, setForgotOpen] = useState(false);
    const [otpOpen, setOtpOpen] = useState(false);
    const [loginError, setLoginError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [loading, setLoading] = useState(false);

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const onLoginHandler = async () => {
        Linking.openURL("https://demo.mindscroll.com/password/reset/fd48be7da3e1800392887f160fb6acf782d9eedf625671c4914eec9879b4763e")
        // Linking.openURL("https://stanleylifestyles.mindscroll.com/stanleylifestyles/sso/logon?token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Im1pY2hlYWxtYWtpNTVAZ21haWwuY29tIiwiZG9tYWluQ29kZSI6InN0YW5sZXkiLCJjb21wYW55RG9tYWluQ29kZSI6InN0YW5sZXkiLCJMb2dpblR5cGUiOiIxIiwiSW9UIjoiTSIsIkVtcGxveWVlSWQiOiIwIiwiVXNlckxvZ09uSWQiOiIiLCJQYXNzd29yZCI6IiIsIklzRmlyc3RUaW1lTG9nT24iOiIiLCJJc1RlbXBQYXNzd29yZCI6IkZhbHNlIiwiVXNlckxhbmd1YWdlIjoiMSIsIlVzZXJUaW1lWm9uZSI6IiIsIkxvZ09uSWQiOiI1MDIiLCJVc2VyTmFtZSI6Ik0gTWljaGVhbCBSYWoiLCJDbGllbnRCYXNlUGF0aCI6Imh0dHBzOi8vYXBwLmhyb25lLmNsb3VkIiwiQ2hhdEFwcElkIjoiIiwiR2F0ZXdheUN1c3RvbWVyQ29kZSI6IiIsIlVpZCI6IjI3MDUzMTMiLCJSZWZyZXNoRXhwaXJ5IjoiMTAwODAiLCJFbWFpbElkIjoiIiwiTW9iaWxlTm8iOiIiLCJJc01mYUFjdGl2ZSI6Ik4iLCJCcm93c2VySWQiOiIiLCJEZXZpY2VUeXBlIjoiTSIsImxvZ2luVXNlciI6IjEwMDQ3NCIsIkxvZ09uVHlwZSI6IjEiLCJJc0F1dGhlbnRpY2F0ZSI6IlRydWUiLCJNZXNzYWdlIjoiIiwiRG9tYWluQ29kZSI6InN0YW5sZXkiLCJDb21wYW55RG9tYWluQ29kZSI6IiIsIlNpbmdsZVNpZ25PbklkIjoiIiwiSW5zdGFuY2VJZCI6IjMwMTQ5Njg4IiwibmJmIjoxNzg3MTMzOTM0LCJleHAiOjE3ODczNDk5MzQsImlzcyI6Imh0dHBzOi8vaHJvbmVhdXRoYXBpLmhyb25lLmNsb3VkLyIsImF1ZCI6IjA5OTE1M2MyNjI1OTQ5YmM4ZWNiM2U4NWUwM2Y1NjIzIn0.IjFpij4nwC8If0o3WawNc85DdkHgsh654VcBcZJRtDEhuY6wxv3aysJBKfZvwR0qEB4UYxuf_S7EBuzFJ5xH18VI-nTqcmK7enBMVL9TBkLOShCsg8oW09YqiOuRT2tTlLmeYYPX0m0B1A391CExPzfMxmz7lUUftAcBFO2lWs1qVD-2h6TND17nwawBm1RoZKjycWHxRkQUv7rAIzYAqfyLbNQuHPu4IinR-LicSdkC5UVDlaeUIVGhfkUpx7OmHKDaw2QX1a5LK18BqKN8XOG_HcZT3EUB3SdZ8EEY3_LI3lircHvqgDA96x_k6LnyrBe_cuQ6XHtyCKmkX64YbA");

        // Linking.openURL("https://stanleylifestyles.mindscroll.com/login?token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Im1pY2hlYWxtYWtpNTVAZ21haWwuY29tIiwiZG9tYWluQ29kZSI6InN0YW5sZXkiLCJjb21wYW55RG9tYWluQ29kZSI6InN0YW5sZXkiLCJMb2dpblR5cGUiOiIxIiwiSW9UIjoiTSIsIkVtcGxveWVlSWQiOiIwIiwiVXNlckxvZ09uSWQiOiIiLCJQYXNzd29yZCI6IiIsIklzRmlyc3RUaW1lTG9nT24iOiIiLCJJc1RlbXBQYXNzd29yZCI6IkZhbHNlIiwiVXNlckxhbmd1YWdlIjoiMSIsIlVzZXJUaW1lWm9uZSI6IiIsIkxvZ09uSWQiOiI1MDIiLCJVc2VyTmFtZSI6Ik0gTWljaGVhbCBSYWoiLCJDbGllbnRCYXNlUGF0aCI6Imh0dHBzOi8vYXBwLmhyb25lLmNsb3VkIiwiQ2hhdEFwcElkIjoiIiwiR2F0ZXdheUN1c3RvbWVyQ29kZSI6IiIsIlVpZCI6IjI3MDUzMTMiLCJSZWZyZXNoRXhwaXJ5IjoiMTAwODAiLCJFbWFpbElkIjoiIiwiTW9iaWxlTm8iOiIiLCJJc01mYUFjdGl2ZSI6Ik4iLCJCcm93c2VySWQiOiIiLCJEZXZpY2VUeXBlIjoiTSIsImxvZ2luVXNlciI6IjEwMDQ3NCIsIkxvZ09uVHlwZSI6IjEiLCJJc0F1dGhlbnRpY2F0ZSI6IlRydWUiLCJNZXNzYWdlIjoiIiwiRG9tYWluQ29kZSI6InN0YW5sZXkiLCJDb21wYW55RG9tYWluQ29kZSI6IiIsIlNpbmdsZVNpZ25PbklkIjoiIiwiSW5zdGFuY2VJZCI6IjMwMTQ5Njg4IiwibmJmIjoxNzg3MTMzOTM0LCJleHAiOjE3ODczNDk5MzQsImlzcyI6Imh0dHBzOi8vaHJvbmVhdXRoYXBpLmhyb25lLmNsb3VkLyIsImF1ZCI6IjA5OTE1M2MyNjI1OTQ5YmM4ZWNiM2U4NWUwM2Y1NjIzIn0.IjFpij4nwC8If0o3WawNc85DdkHgsh654VcBcZJRtDEhuY6wxv3aysJBKfZvwR0qEB4UYxuf_S7EBuzFJ5xH18VI-nTqcmK7enBMVL9TBkLOShCsg8oW09YqiOuRT2tTlLmeYYPX0m0B1A391CExPzfMxmz7lUUftAcBFO2lWs1qVD-2h6TND17nwawBm1RoZKjycWHxRkQUv7rAIzYAqfyLbNQuHPu4IinR-LicSdkC5UVDlaeUIVGhfkUpx7OmHKDaw2QX1a5LK18BqKN8XOG_HcZT3EUB3SdZ8EEY3_LI3lircHvqgDA96x_k6LnyrBe_cuQ6XHtyCKmkX64YbA");

        // const url = "https://stanleylifestyles.mindscroll.com/stanleylifestyles/sso/logon?token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Im1pY2hlYWxtYWtpNTVAZ21haWwuY29tIiwiZG9tYWluQ29kZSI6InN0YW5sZXkiLCJjb21wYW55RG9tYWluQ29kZSI6InN0YW5sZXkiLCJMb2dpblR5cGUiOiIxIiwiSW9UIjoiTSIsIkVtcGxveWVlSWQiOiIwIiwiVXNlckxvZ09uSWQiOiIiLCJQYXNzd29yZCI6IiIsIklzRmlyc3RUaW1lTG9nT24iOiIiLCJJc1RlbXBQYXNzd29yZCI6IkZhbHNlIiwiVXNlckxhbmd1YWdlIjoiMSIsIlVzZXJUaW1lWm9uZSI6IiIsIkxvZ09uSWQiOiI1MDIiLCJVc2VyTmFtZSI6Ik0gTWljaGVhbCBSYWoiLCJDbGllbnRCYXNlUGF0aCI6Imh0dHBzOi8vYXBwLmhyb25lLmNsb3VkIiwiQ2hhdEFwcElkIjoiIiwiR2F0ZXdheUN1c3RvbWVyQ29kZSI6IiIsIlVpZCI6IjI3MDUzMTMiLCJSZWZyZXNoRXhwaXJ5IjoiMTAwODAiLCJFbWFpbElkIjoiIiwiTW9iaWxlTm8iOiIiLCJJc01mYUFjdGl2ZSI6Ik4iLCJCcm93c2VySWQiOiIiLCJEZXZpY2VUeXBlIjoiTSIsImxvZ2luVXNlciI6IjEwMDQ3NCIsIkxvZ09uVHlwZSI6IjEiLCJJc0F1dGhlbnRpY2F0ZSI6IlRydWUiLCJNZXNzYWdlIjoiIiwiRG9tYWluQ29kZSI6InN0YW5sZXkiLCJDb21wYW55RG9tYWluQ29kZSI6IiIsIlNpbmdsZVNpZ25PbklkIjoiIiwiSW5zdGFuY2VJZCI6IjMwMTQ5Njg4IiwibmJmIjoxNzg3MTMzOTM0LCJleHAiOjE3ODczNDk5MzQsImlzcyI6Imh0dHBzOi8vaHJvbmVhdXRoYXBpLmhyb25lLmNsb3VkLyIsImF1ZCI6IjA5OTE1M2MyNjI1OTQ5YmM4ZWNiM2U4NWUwM2Y1NjIzIn0.IjFpij4nwC8If0o3WawNc85DdkHgsh654VcBcZJRtDEhuY6wxv3aysJBKfZvwR0qEB4UYxuf_S7EBuzFJ5xH18VI-nTqcmK7enBMVL9TBkLOShCsg8oW09YqiOuRT2tTlLmeYYPX0m0B1A391CExPzfMxmz7lUUftAcBFO2lWs1qVD-2h6TND17nwawBm1RoZKjycWHxRkQUv7rAIzYAqfyLbNQuHPu4IinR-LicSdkC5UVDlaeUIVGhfkUpx7OmHKDaw2QX1a5LK18BqKN8XOG_HcZT3EUB3SdZ8EEY3_LI3lircHvqgDA96x_k6LnyrBe_cuQ6XHtyCKmkX64YbA";

        // try {
        //     const canOpen = await Linking.canOpenURL(url);

        //     console.log("canOpenURL:", canOpen);

        //     if (canOpen) {
        //         const result = await Linking.openURL(url);
        //         console.log("openURL result:", result);
        //     }
        // } catch (error) {
        //     console.log("Linking Error:", error);
        // }


        // if (validateEmail(email) && password.length > 0) {
        //     setLoginError("");
        //     setLoading(true)
        //     try {
        //         const response = await dispatch(
        //             loginUser({ email, password }),
        //         ).unwrap();
        //         if (response?.status === 200) {
        //             setLoading(false)
        //             navigate('Home');
        //         }
        //     } catch (error) {
        //         setLoginError(String(error))
        //         setLoading(false)
        //     }
        // } else {
        //     setLoading(false)
        //     setLoginError("Invalid Email or Password");
        // }
    };

    const onForgotPassword = async () => {
        if (validateEmail(forgotEmail)) {
            setLoading(true)
            try {
                const response = await dispatch(
                    forgotPassword({ email: forgotEmail }),
                ).unwrap();
                if (response?.status === 200) {
                    setLoading(false)
                    setForgotOpen(false)
                    setTimeout(() => {
                        setOtpOpen(true)
                    }, 500)
                }
            } catch (error) {
                setEmailError(String(error))
                setLoading(false)
            }
        } else {
            setEmailError("Invalid Email");
        }
    }

    const onOtpHandle = async () => {
        if (otpNumber.length === 6) {
            setLoading(true)
            try {
                const response = await dispatch(
                    verifyOtp({ email: forgotEmail, otp: otpNumber }),
                ).unwrap();
                if (response?.status === 200) {
                    setLoading(false)
                    setOtpOpen(false)
                    setTimeout(() => {
                        navigate('ResetPassword', { email: forgotEmail, otp: otpNumber });
                    }, 500)
                }
            } catch (error) {
                setEmailError(String(error))
                setLoading(false)
            }
        } else {
            setEmailError("Invalid OTP");
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFDBE050" }}>
            <AtomView style={styles.container}>
                <ImageBackground
                    source={ImgAssets.bg_auth}
                    style={{ flex: 1, padding: 20 }}
                    resizeMode="cover"
                >
                    <AtomView style={styles.loginContainer}>
                        <AtomText title={"Login Account"} fontSize={16} fontWeight="700" />
                        <AtomView style={styles.line} />
                        <AtomText style={{ marginBottom: 16 }} title={"Login to explore amazing gift's 🎁"} fontSize={14} color={Theme.colors.text.darkGray} />
                        <CustomTextInput icon="mail" rightIcon={true} value={email} onChangeText={setEmail} placeholder="Email Address" />
                        <CustomTextInput error={loginError} onPress={() => setSecureTextEntry(!secureTextEntry)} icon="lock" rightIcon={true} rightIconName={secureTextEntry ? "eye-off" : "eye"} secureTextEntry={secureTextEntry} value={password} onChangeText={setPassword} placeholder="Password" />
                        <Pressable onPress={() => setForgotOpen(true)} style={{ width: "100%", alignItems: "flex-end" }}>
                            <AtomText title={"Forgot Password"} fontSize={16} fontWeight="700" />
                        </Pressable>
                        <AtomButton loading={loading} style={{ width: "100%", marginVertical: 16 }} fontWeight="700" color="#FF5E76" title="Login" onPress={onLoginHandler} />
                        <Pressable onPress={() => navigate('SignUp')} style={{ flexDirection: "row", gap: 5, justifyContent: "center", alignItems: "center" }}>
                            <AtomText title={`Do you have an account?`} fontSize={16} />
                            <AtomText title={"SignUp"} fontSize={16} fontWeight="700" color="#FF5E76" />
                        </Pressable>
                    </AtomView>
                </ImageBackground>
            </AtomView>
            <ForgotPassword
                visible={forgotOpen}
                emailError={emailError}
                forgotEmail={forgotEmail}
                onForgotEmailChange={setForgotEmail}
                onClose={() => {
                    setForgotOpen(false)
                    setEmailError("")
                    setForgotEmail("")
                }}
                onSendPress={onForgotPassword}
                loading={loading}
            />
            <VarifiedOtp
                visible={otpOpen}
                emailError={emailError}
                varifiedOtps={otpNumber}
                onOtpChange={setOtpNumber}
                onClose={() => {
                    setOtpOpen(false)
                    setEmailError("")
                    setOtpNumber("")
                }}
                onOtpSendPress={onOtpHandle}
                loading={loading}
            />
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFDBE050",
        justifyContent: "flex-end",
    },
    loginContainer: {
        justifyContent: "flex-end",
        alignItems: "center",
        padding: 20,
        paddingHorizontal: 16,
        backgroundColor: Theme.colors.background.secondary,
        borderRadius: 20,
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
export default Login;                      