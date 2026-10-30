import React from 'react';
import {
    View,
    ViewProps,
    StyleSheet,
    ViewStyle,
} from 'react-native';

interface Props extends ViewProps {
    children?: React.ReactNode;
    style?: ViewStyle | ViewStyle[];
}

const AtomView = ({ children, style, ...rest }: Props) => {
    return (
        <View
            style={[styles.container, style]}
            {...rest}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
});

export default AtomView;