import React, { useEffect, useState } from 'react';
import {
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Theme } from '../../../theme/constants';
import AtomText from '../../../components/atoms/AtomText';
import AtomView from '../../../components/atoms/AtomView';
import { SafeAreaView } from 'react-native-safe-area-context';
import AtomStatusBar from '../../../components/atoms/AtomStatusBar';
import Header from '../../../components/CustomComponents/Header';
import { useAppSelector } from '../../../hooks';
import AtomButton from '../../../components/atoms/AtomButton';
import { showAlert, showDeleteAlert } from '../../../Helpers/Utils';
import { useDispatch } from 'react-redux';
import { deleteProduct, getProducts, productByID, productByVendor } from '../dashboardThunk';
import { goBack } from '../../../Navigation/RootNavigation';
import { addToCart, addToWishlist, getCartProduct, removeFromWishlist } from '../WishListScreen/wishListThunk';
import CustomImage from '../../../components/atoms/AtomImages';

const ProductDetailScreen = ({ route }: any) => {
    const { productItem, showWishList, ownProduct } = route?.params
    const { user } = useAppSelector(state => state.auth);
    const [loading, setLoading] = useState(false)
    const [wishloading, setWishLoading] = useState(false)
    const [productValuse, setProductValuse] = useState<any>()

    const dispatch = useDispatch()

    const deleteHandler = async (ProductEle: any) => {
        showDeleteAlert(() => {
            productDelete(ProductEle?._id)
        });
    }

    useEffect(() => {
        _getProductById()
        return () => { }
    }, [])

    const _getProductById = async () => {
        try {
            setLoading(true)
            let response = await dispatch(productByID(productItem?._id)).unwrap()
            if (response?.success) {
                setProductValuse(response?.data)
            }
        } catch (error) {
            console.log("error", error)
        } finally {
            setLoading(false)
        }
    }

    const productDelete = async (_id: string) => {
        try {
            setLoading(true)
            const response = dispatch(deleteProduct(_id)).unwrap()
            if (response) {
                await dispatch(productByVendor()).unwrap()
                await dispatch(getProducts()).unwrap()
                goBack()
            }
        } catch (error) {
            console.log("err", error)
        } finally {
            setLoading(false)
        }
    }

    const wishlistHandler = async (productValuse: any,) => {
        try {
            setWishLoading(true)
            if (productValuse?.isWishlisted) {
                let response = await dispatch(
                    removeFromWishlist(productValuse?._id)
                ).unwrap();
                if (response?.success) {
                    _getProductById()
                }
            }
            else {
                let response = await dispatch(addToWishlist({
                    "productId": productValuse?._id
                })).unwrap()
                if (response?.data?.success) {
                    _getProductById()
                }
            }
        } catch (error) {
            console.log("error", error)
        } finally {
            setWishLoading(false)
        }
    }

    const addTocartHandler = async (ProductEle: any) => {
        const data = {
            "productId": ProductEle?._id,
            "quantity": 1
        }
        try {
            setLoading(true)
            let response = await dispatch(addToCart(data))
            console.log("responseresponse", response)
            if (response?.payload?.status === 200) {
                await dispatch(getCartProduct())
                showAlert("Success", "Product added successfully!");
            } else {
                showAlert("Product", response?.payload)
            }
        } catch (error: any) {
            console.log("error", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <AtomStatusBar />
            <Header back />
            <AtomView style={styles.card}>
                <CustomImage
                    uri={productItem?.image}
                    style={styles.image}
                />
                {showWishList && (
                    <TouchableOpacity onPress={() => wishloading ? {} : wishlistHandler(productValuse)} style={styles.heart}>
                        <Ionicons
                            name={productValuse?.isWishlisted ? "heart" : "heart-outline"}
                            color={productValuse?.isWishlisted ? "red" : "#000"}
                            size={22}
                        />
                    </TouchableOpacity>
                )}
                <AtomView style={{ padding: 12 }}>
                    <AtomText title={productItem?.name} style={styles.name} />
                    <AtomText title={productItem?.description} style={styles.category} />
                    <AtomView style={styles.priceRow}>
                        <AtomText title={`₹${productItem?.price}`} style={styles.price} />
                    </AtomView>
                </AtomView>
            </AtomView>
            <AtomView style={{ position: "absolute", bottom: 25, width: "100%" }}>
                <AtomButton disabled={loading} style={{ width: "90%", alignSelf: "center" }} color="#524498ff" title="Add to cart" onPress={() => addTocartHandler(productValuse)} />
                {(user?._id === productValuse?.vendor?._id) && ownProduct && (
                    <AtomButton disabled={loading} style={{ marginTop: 12, width: "90%", alignSelf: "center" }} color="#ca3732ff" title="Delete Product" onPress={() => deleteHandler(productValuse)} />
                )}
            </AtomView>
        </SafeAreaView>
    )
}

export default ProductDetailScreen;

const styles = StyleSheet.create({
    card: {
        borderColor: Theme.colors.common.borderColor
    },
    image: {
        width: '100%',
        height: 240,
        resizeMode: 'cover',
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