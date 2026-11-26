
import React from 'react';
import FastImage from 'react-native-fast-image';
import { StyleProp, ImageStyle } from 'react-native';

interface CustomImageProps {
    uri: string;
    style?: StyleProp<ImageStyle>;
}

const CustomImage: React.FC<CustomImageProps> = ({
    uri,
    style,
}) => {
    return (
        <FastImage
            style={style}
            source={{
                uri,
                priority: FastImage.priority.normal,
                cache: FastImage.cacheControl.immutable,
            }}
            objectFit="cover"
        />
    );
};

export default CustomImage;
