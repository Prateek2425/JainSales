import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { Theme } from '../../theme/constants';

const ProductCard = ({ item }: any) => {
    return (
        <View style={styles.card}>
            <Image
                source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQQUhEpSp3X5WtIfB-h_ctKLGqZ6FpKLj0rVjjgo2Cog&s" }}
                style={styles.image}
            />
            <TouchableOpacity style={styles.heart}>
                <Ionicons
                    name="heart-outline"
                    size={22}
                />
            </TouchableOpacity>
            {/* <View style={styles.discount}>
                <Text style={styles.discountText}>
                    {"2000"}
                </Text>
            </View> */}
            <View style={{ padding: 12 }}>
                <Text style={styles.name}>
                    {"qwerty"}
                </Text>

                <Text style={styles.category}>
                    {"Tshirt"}
                </Text>

                <View style={styles.priceRow}>

                    <Text style={styles.price}>
                        ₹{"200"}
                    </Text>

                    <Text style={styles.oldPrice}>
                        ₹{"400"}
                    </Text>

                </View>

                <Text style={styles.rating}>
                    ⭐ {"4.5"}
                </Text>
            </View>
        </View>

    )

}

export default ProductCard;

const styles = StyleSheet.create({
    card: {
        width: 150,
        borderRadius: 18,
        marginRight: 16,
        borderWidth: 1,
        borderColor: Theme.colors.common.borderColor
    },
    image: {
        width: '100%',
        height: 140,
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