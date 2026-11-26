import React from 'react';
import {
    StyleSheet,
    Pressable,
} from 'react-native';
import { Theme } from '../../theme/constants';
import AtomText from '../atoms/AtomText';
import AtomView from '../atoms/AtomView';
import { navigate } from '../../Navigation/RootNavigation';
import CustomImage from '../atoms/AtomImages';
import { ProductCardProps } from '../../types';

const ProductCard = ({ item, showWishList, ownProduct = false }: ProductCardProps) => {

    const handler = () => {
        navigate("ProductDetailScreen", { productItem: item, showWishList, ownProduct })
    }
    return (
        <Pressable onPress={handler} style={styles.card}>
            <CustomImage
                uri={item?.image}
                style={styles.image}
            />
            {item?.quantity === 0 && (
                <AtomView style={{ borderTopLeftRadius: 15, padding: 8, backgroundColor: "#fff", justifyContent: "center", alignItems: "center", position: "absolute", top: 0, left: 0, borderBottomRightRadius: 12, paddingHorizontal: 16 }}>
                    <AtomText title='Out of stock' fontSize={12} color='red' fontWeight='700' />
                </AtomView>
            )}
            <AtomView style={{ padding: 12 }}>
                <AtomText title={item?.name} style={styles.name} />
                <AtomText title={item?.description} style={styles.category} />
                <AtomView style={styles.priceRow}>
                    <AtomText title={`₹${item?.price}`} style={styles.price} />
                </AtomView>
            </AtomView>
        </Pressable>
    )
}

export default ProductCard;

const styles = StyleSheet.create({
    card: {
        width: "48%",
        borderRadius: 18,
        marginRight: 10,
        borderWidth: 1,
        borderColor: Theme.colors.common.borderColor,
        marginBottom: 16
    },
    image: {
        width: '100%',
        height: 120,
        resizeMode: 'cover',
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18
    },
    heart: {
        position: 'absolute',
        right: 10,
        top: 8,
        backgroundColor: '#fff',
        padding: 5,
        borderRadius: 15,
        zIndex: 1
    },
    discount: {
        marginTop: 10,
        alignSelf: 'flex-start',
        backgroundColor: '#DFF7E4',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },
    discountText: {
        color: '#22A559',
        fontWeight: '700',
    },
    name: {
        fontSize: 12,
        fontWeight: '700',
    },
    category: {
        fontSize: 12,
        color: '#777',
        marginTop: 4,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    price: {
        fontWeight: '700',
        fontSize: 14,
    },
    oldPrice: {
        marginLeft: 10,
        textDecorationLine: 'line-through',
        color: '#999',
    },
    rating: {
        marginTop: 8,
        fontSize: 12,
    }

})