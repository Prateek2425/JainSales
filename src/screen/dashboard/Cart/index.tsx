
import React, { useEffect, useState } from 'react';
import {
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Pressable,
} from 'react-native';
import AtomView from '../../../components/atoms/AtomView';
import { SafeAreaView } from "react-native-safe-area-context";
import Header from '../../../components/CustomComponents/Header';
import { Theme } from '../../../theme/constants';
import { useDispatch } from 'react-redux';
import { getCartProduct, removeFromCart, updateFromCart } from '../WishListScreen/wishListThunk';
import LoadingScreen from '../../../components/CustomComponents/LoadingScreen';
import EmptyScreen from '../../../components/CustomComponents/EmptyScreen';
import AtomText from '../../../components/atoms/AtomText';
import { showAlert } from '../../../Helpers/Utils';
import { useAppSelector } from '../../../hooks';
import { navigate } from '../../../Navigation/RootNavigation';
import { addToOrder } from '../OrderScreen/orderThunk';
import AtomButton from '../../../components/atoms/AtomButton';
import FontAwesome6 from "react-native-vector-icons/FontAwesome6"
import CustomImage from '../../../components/atoms/AtomImages';
type CartProduct = {
    _id: string,
    quantity: number,
    productId: {
        _id: string;
        name: string;
        price: number;
        description: string;
        category: {
            name: string
        }
        image: string;
        quantity: number;
    },
    availableStock: number;
};

const CartScreen = () => {
    const { cartData } = useAppSelector((state) => state?.wishList)
    const [loading, setLoading] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [updateLoading, setupdateLoading] = useState(false)
    const [orderLoading, setOrderLoading] = useState(false)
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
    const dispatch = useDispatch()

    useEffect(() => {
        if (cartData?.length > 0) {
            const allProductIds = cartData.map(
                (item: any) => item.productId._id
            );

            setSelectedProducts(allProductIds);
        }
    }, [cartData]);


    useEffect(() => {
        _getCartData()
        return () => { }
    }, [])

    const toggleProduct = (productId: string) => {
        setSelectedProducts(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    const _getCartData = async () => {
        try {
            setLoading(true)
            await dispatch(getCartProduct()).unwrap()
        } catch (error) {
            console.log("error", error)
        } finally {
            setLoading(false)
        }
    }

    const updateQuantity = async (
        id: string,
        quantityVal: number,
        type: string
    ) => {
        if (Number(quantityVal) > 1 || type === "Increment") {
            const quantity = type === "Increment" ? Number(quantityVal) + 1 : type === "Decrement" ? Number(quantityVal) - 1 : quantityVal
            try {
                setupdateLoading(true)
                let response = await dispatch(updateFromCart({ id, quantity }))
                if (response?.payload?.success) {
                    _getCartData()
                }
            } catch (error) {
                console.log("error", error)
            } finally {
                setupdateLoading(false)
            }
        } else {
            showAlert("Alert", "Quantity must be at least 1")
        }

    };

    const removeProduct = async (id: string) => {
        try {
            setDeleteLoading(true)
            let response = await dispatch(removeFromCart(id)).unwrap()
            if (response?.success) {
                _getCartData()
            }
        } catch (error) {
            console.log("error", error)
        } finally {
            setDeleteLoading(false)
        }
    };

    const selectedCartItems = cartData?.filter((item: any) =>
        selectedProducts.includes(item?.productId?._id)
    ) || [];

    const totalItems = selectedCartItems?.reduce(
        (total: any, item: any) => total + item?.quantity,
        0
    );

    const totalPrice = selectedCartItems?.reduce(
        (total: any, item: any) => total + item?.productId?.price * item?.quantity,
        0
    );

    const renderItem = ({ item }: { item: CartProduct }) => {
        return (

            <AtomView style={styles.productCard}>
                <AtomView style={styles.productImage} >
                    <CustomImage
                        uri={item?.productId?.image}
                        style={{ width: "100%", height: "100%", borderRadius: 12 }}
                    />
                    <Pressable style={{ width: 28, height: 28, borderTopStartRadius: 12, backgroundColor: selectedProducts.includes(item.productId._id) ? "#e65353ff" : "#fff", position: "absolute", top: 0, left: 0, borderWidth: 1, justifyContent: "center", alignItems: "center" }} onPress={() => toggleProduct(item.productId._id)}>
                        {selectedProducts.includes(item.productId._id) && (
                            <FontAwesome6 name="check" size={14} color="#fff" />
                        )}
                    </Pressable>

                </AtomView>

                <AtomView style={styles.productInfo}>
                    <AtomView style={styles.topRow}>
                        <Text style={styles.productName}>{item?.productId?.name}</Text>
                        {/* <Text style={styles.category}>{item?.productId?.category?.name}</Text> */}
                        <TouchableOpacity onPress={() => deleteLoading ? {} : removeProduct(item?.productId?._id)}>
                            <AtomText title="Remove" fontSize={14} color='red' fontWeight='500' />
                        </TouchableOpacity>
                    </AtomView>



                    <Text style={styles.description} numberOfLines={2}>
                        {item?.productId?.description}
                    </Text>

                    <Text style={styles.price}>
                        ₹{item?.productId?.price.toLocaleString('en-IN')}
                    </Text>

                    <AtomView style={styles.bottomRow}>
                        <AtomView style={styles.quantityContainer}>
                            <TouchableOpacity
                                style={styles.quantityButton}
                                onPress={() => updateLoading ? {} : updateQuantity(item?.productId?._id, item?.quantity, "Decrement")}
                            >
                                <Text style={styles.quantityButtonText}>−</Text>
                            </TouchableOpacity>
                            <AtomText title={String(item?.quantity)} fontSize={14} fontWeight='500' color='#000' />

                            <TouchableOpacity
                                style={[
                                    styles.quantityButton,
                                    item?.quantity >= item?.availableStock && styles.disabledButton,
                                ]}
                                disabled={item.quantity >= item?.availableStock}
                                onPress={() => updateLoading ? {} : updateQuantity(item?.productId?._id, item?.quantity, "Increment")}
                            >
                                <Text style={styles.quantityButtonText}>+</Text>
                            </TouchableOpacity>
                        </AtomView>

                        <Text style={styles.itemTotal}>
                            ₹{(item?.productId?.price * item?.quantity).toLocaleString('en-IN')}
                        </Text>
                    </AtomView>

                    <Text style={styles.stockText}>
                        {item?.productId?.quantity === 0
                            ? 'Out of Stock'
                            : `${item?.productId?.quantity - item?.quantity} available`}
                    </Text>
                </AtomView>
            </AtomView >
        )
    }

    const orderPlaceHandler = async () => {
        try {
            setOrderLoading(true)
            const response = await dispatch(addToOrder(selectedProducts)).unwrap();
            if (response?.success) {
                await dispatch(getCartProduct()).unwrap()
                navigate("OrderSuccessReview", {
                    orderData: response?.order
                })
            }
        } catch (error: any) {
            Alert.alert(
                "Order Failed",
                error || "Something went wrong"
            );
        } finally {
            setOrderLoading(false)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header back title='Cart' />
            <AtomView style={{ flex: 1, paddingHorizontal: 16 }}>
                {loading ? <LoadingScreen />
                    :
                    cartData?.length === 0 ? (
                        <EmptyScreen title="Your Cart is Empty" />
                    ) : (
                        <>
                            <FlatList
                                data={cartData}
                                keyExtractor={item => item._id}
                                renderItem={renderItem}
                                showsVerticalScrollIndicator={false}
                            />
                            <AtomView style={styles.summary}>
                                <Text style={styles.summaryTitle}>Order Summary</Text>

                                <AtomView style={styles.summaryRow}>
                                    <Text style={styles.summaryLabel}>Total Items</Text>
                                    <Text style={styles.summaryValue}>{totalItems}</Text>
                                </AtomView>

                                <AtomView style={styles.summaryRow}>
                                    <Text style={styles.summaryLabel}>Subtotal</Text>
                                    <Text style={styles.summaryValue}>
                                        ₹{totalPrice.toLocaleString('en-IN')}
                                    </Text>
                                </AtomView>

                                <AtomView style={styles.summaryRow}>
                                    <Text style={styles.summaryLabel}>Delivery</Text>
                                    <Text style={styles.freeText}>FREE</Text>
                                </AtomView>

                                <AtomView style={styles.separator} />

                                <AtomView style={styles.summaryRow}>
                                    <Text style={styles.totalLabel}>Total Amount</Text>
                                    <Text style={styles.totalPrice}>
                                        ₹{totalPrice.toLocaleString('en-IN')}
                                    </Text>
                                </AtomView>
                                <AtomButton
                                    title='Proceed to Checkout →'
                                    onPress={orderPlaceHandler}
                                    disabled={orderLoading}
                                    loading={orderLoading}
                                    color='#000'
                                />
                            </AtomView>
                        </>
                    )}
            </AtomView>
        </SafeAreaView>
    );
};

export default CartScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.background.secondary,
    },
    productCard: {
        flexDirection: 'row',
        backgroundColor: Theme.colors.background.secondary,
        borderRadius: 16,
        padding: 12,
        marginBottom: 14,
        elevation: 2,
        borderWidth: 1,
        borderColor: Theme.colors.common.borderColor
    },
    productImage: {
        width: 105,
        height: 125,
        borderRadius: 12,
        backgroundColor: '#F0F0F0',
    },
    productInfo: {
        flex: 1,
        marginLeft: 12,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    category: {
        color: '#777',
        fontSize: 11,
        backgroundColor: '#F0F2F5',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 5,
    },
    removeText: {
        color: '#de1111ff',
        fontSize: 12,
    },
    productName: {
        fontSize: 15,
        fontWeight: '700',
        color: '#222',
    },
    description: {
        fontSize: 11,
        color: '#888',
        marginTop: 4,
    },
    price: {
        fontSize: 16,
        fontWeight: '700',
        color: '#222',
        marginTop: 7,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 8,
    },
    quantityButton: {
        width: 29,
        height: 29,
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantityButtonText: {
        fontSize: 19,
        color: '#222',
    },
    disabledButton: {
        opacity: 0.3,
    },
    quantity: {
        fontSize: 14,
        fontWeight: '600',
        paddingHorizontal: 10,
    },
    itemTotal: {
        fontSize: 14,
        fontWeight: '700',
        color: '#222',
    },
    stockText: {
        fontSize: 10,
        color: '#15965A',
        marginTop: 5,
    },
    summary: {
        padding: 20,
        borderTopLeftRadius: 22,
        borderTopRightRadius: 22,
        borderWidth: 1,
        borderColor: Theme.colors.common.borderColor
    },
    summaryTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 15,
        color: '#222',
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    summaryLabel: {
        fontSize: 14,
        color: '#777',
    },
    summaryValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#222',
    },
    freeText: {
        color: '#15965A',
        fontWeight: '700',
    },
    separator: {
        height: 1,
        backgroundColor: '#EEEEEE',
        marginVertical: 8,
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: '700',
        color: '#222',
    },
    totalPrice: {
        fontSize: 19,
        fontWeight: '700',
        color: '#222',
    },
    checkoutButton: {
        backgroundColor: '#171717',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 12,
    },
    checkoutText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
    },
    heavyTick: {
        fontSize: 12,
        color: 'red',
    },
});
