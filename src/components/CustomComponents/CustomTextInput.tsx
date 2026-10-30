import React from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TextInputProps,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AtomText from '../atoms/AtomText';

interface CustomTextInputProps extends TextInputProps {
    icon?: string;
    rightIcon?: boolean;
    rightIconName?: string;
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    onPress?: () => void;
    secureTextEntry?: boolean;
    error?: string;
    maxLength?: number;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad';

}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
    icon,
    placeholder,
    value,
    onChangeText,
    secureTextEntry,
    rightIcon,
    rightIconName,
    onPress,
    error,
    maxLength,
    keyboardType
}) => {
    return (
        <View style={{ width: "100%", marginBottom: 16 }}>
            <View style={styles.container}>
                <Icon
                    name={icon}
                    size={20}
                    color="#8E8E93"
                    style={styles.icon}
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#8E8E93"
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry}
                    maxLength={maxLength ?? 100}
                    keyboardType={keyboardType ?? 'default'}
                />
                {rightIcon && (
                    <TouchableOpacity onPress={onPress}>
                        <Icon
                            name={rightIconName}
                            size={20}
                            color="#8E8E93"
                        />
                    </TouchableOpacity>

                )}
            </View>
            {error?.length === 0 || !error ? null : <AtomText title={error} style={{ marginTop: 8 }} fontSize={14} color="red" />}
        </View>
    );
};

export default CustomTextInput;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 12,
        height: 48,
    },
    icon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#1C1C1E',
        height: "100%"
    },
});