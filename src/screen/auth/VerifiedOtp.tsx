import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    Modal,
    Pressable,
    StyleSheet,
} from 'react-native';
import AtomText from '../../components/atoms/AtomText';
import CustomTextInput from '../../components/CustomComponents/CustomTextInput';
import Icon from 'react-native-vector-icons/AntDesign';
import AtomButton from '../../components/atoms/AtomButton';

interface VarifiedOtpProps {
    visible: boolean;
    onClose: () => void;
    varifiedOtps: string;
    onOtpChange: (text: string) => void;
    onOtpSendPress: () => void;
    emailError?: string;
    loading?: boolean
}
const VarifiedOtp: React.FC<VarifiedOtpProps> = ({
    visible,
    onClose,
    varifiedOtps,
    onOtpChange,
    onOtpSendPress,
    emailError,
    loading
}) => {
    const scaleAnim = useRef(new Animated.Value(0.8)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 280,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 1,
                    duration: 280,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            scaleAnim.setValue(0.8);
            opacityAnim.setValue(0);
        }
    }, [visible]);

    return (
        <Modal
            visible={visible}
            transparent
            animationType="none"
            onRequestClose={onClose}
        >
            <Animated.View
                style={[
                    styles.overlay,
                    {
                        opacity: opacityAnim,
                    },
                ]}
            >
                <Animated.View
                    style={[
                        styles.modal,
                        {
                            transform: [{ scale: scaleAnim }],
                            opacity: opacityAnim,
                        },
                    ]}
                >
                    <AtomText title={"Enter Otp"} style={{ marginBottom: 28 }} fontSize={16} fontWeight="700" />
                    <Pressable style={{ position: "absolute", right: 20, top: 20 }} onPress={onClose}>
                        <Icon
                            name={"close"}
                            size={22}
                            color="#000"
                        />
                    </Pressable>
                    <CustomTextInput maxLength={6} keyboardType="numeric" error={emailError} icon="mail" value={varifiedOtps} onChangeText={onOtpChange} placeholder="Enter OTP" />
                    <AtomButton loading={loading} style={{ width: "100%" }} fontWeight="700" color="#FF5E76" title="Send" onPress={() => onOtpSendPress()} />
                </Animated.View>
            </Animated.View>
        </Modal>
    );
};

export default VarifiedOtp;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.45)',
        justifyContent: "flex-end",
    },
    modal: {
        backgroundColor: '#fff',
        borderRadius: 30,
        padding: 20,
        alignItems: 'center',
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: 5,
        },
    },
});