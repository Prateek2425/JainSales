// components/atoms/TextAtom.tsx

import React from 'react';
import {
    Text,
    TextProps,
    StyleSheet,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';

// import Icon from 'react-native-vector-icons/MaterialIcons';

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

interface TextAtomProps extends TextProps {
    title: string | undefined;
    color?: string;
    fontSize?: number;
    fontWeight?: FontWeightType;
    fontFamily?: string;
    numberOfLines?: number
    // Right Icon
    rightIcon?: string;
    rightIconSize?: number;
    rightIconColor?: string;

    containerStyle?: ViewStyle;
    style?: TextStyle;
}

const AtomText: React.FC<TextAtomProps> = ({
    title,
    color = '#000',
    fontSize = 16,
    fontWeight = '400',
    fontFamily = 'Lato-Regular',
    rightIcon,
    numberOfLines = 0,
    rightIconSize = 20,
    rightIconColor = '#000',
    containerStyle,
    style,
    ...rest
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            <Text
                numberOfLines={numberOfLines}
                style={[
                    styles.text,
                    {
                        color,
                        fontSize,
                        fontWeight,
                        fontFamily,
                    },
                    style,
                ]}
                {...rest}
            >
                {title}
            </Text>

            {/* {rightIcon && (
        <Icon
          name={rightIcon}
          size={rightIconSize}
          color={rightIconColor}
          style={styles.icon}
        />
      )} */}
        </View>
    );
};

export default AtomText;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    text: {
        includeFontPadding: false,
    },

    icon: {
        marginLeft: 6,
    },
});