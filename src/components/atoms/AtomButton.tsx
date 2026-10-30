import React from 'react';
import {
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
    ViewStyle,
} from 'react-native';
import { Theme } from '../../theme/constants';
import TextAtom from './AtomText';

type FontWeightType =
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';

type Props = {
    title: string;
    loading?: boolean;
    disabled?: boolean;
    onPress: () => void;
    style?: ViewStyle;
    color?: string;
    fontFamily?: string,
    fontWeight?: FontWeightType,
    fontSize?: number,
    textColor?: string
};

const AtomButton: React.FC<Props> = ({
    title,
    loading = false,
    disabled = false,
    onPress,
    fontFamily = "Lato-Regular",
    fontWeight = "400",
    fontSize = 16,
    style,
    textColor = Theme.colors.background.secondary,
    color = Theme.colors.background.lightOrange,
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                { backgroundColor: color },
                (loading || disabled) && styles.disabled,
                style,
            ]}
            onPress={onPress}
            disabled={loading || disabled}
            activeOpacity={0.7}
        >
            {loading ? (
                <ActivityIndicator color="#fff" />
            ) : (
                <TextAtom
                    title={title}
                    fontSize={fontSize}
                    fontWeight={fontWeight}
                    fontFamily={fontFamily}
                    color={textColor}
                />
            )}
        </TouchableOpacity>
    );
};

export default AtomButton;

const styles = StyleSheet.create({
    button: {
        height: 48,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    disabled: {
        opacity: 0.6,
    },
});
