import React from 'react';
import {
    StatusBar,
    StatusBarProps,
} from 'react-native';

const AtomStatusBar = (
    props: StatusBarProps,
) => {
    return (
        <StatusBar
            translucent={false}
            backgroundColor="#FFFFFF"
            barStyle="dark-content"
            {...props}
        />
    );
};

export default AtomStatusBar;