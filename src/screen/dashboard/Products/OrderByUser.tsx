
import React, { useEffect, useState } from 'react';
import {
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../components/CustomComponents/Header';
import AtomView from '../../../components/atoms/AtomView';
import { Theme } from '../../../theme/constants';
import { useDispatch } from 'react-redux';
import { orderByUser, updateStatusByVendor } from '../dashboardThunk';
import CustomImage from '../../../components/atoms/AtomImages';
import AtomText from '../../../components/atoms/AtomText';
import { showConfirmAlert } from '../../../Helpers/Utils';
import EmptyScreen from '../../../components/CustomComponents/EmptyScreen';
import LoadingScreen from '../../../components/CustomComponents/LoadingScreen';
import { useAppSelector } from '../../../hooks';

type OrderStatus =
    | 'Pending'
    | 'Confirmed'
    | 'Shipped'
    | 'Delivered'
    | 'Cancelled';

interface OrderProduct {
    _id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    image: string;
    quantity: number;
}

interface Order {
    _id: string;
    orderId: {
        _id: string
    };
    orderDate: string;
    status: OrderStatus;
    products: OrderProduct[];
    totalAmount: number;
    createdAt: string
}

type Props = {
    navigation: any;
};

const OrderByUserScreen: React.FC<Props> = ({ navigation }) => {
    const { orderByUserData } = useAppSelector((state) => state?.dashboard)
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [loading, setLoading] = useState(false);
    const [statusLoading, setStatusLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        _getOrderByUserData()
        return () => { }
    }, [])

    const _getOrderByUserData = async () => {
        try {
            setLoading(true)
            await dispatch(orderByUser()).unwrap()
        } catch (error) {
            console.log("error", error)
        } finally {
            setLoading(false)
        }
    }

    const filters = ['All', 'Pending', 'Shipped', 'Delivered'];

    const filteredOrders =
        selectedFilter === 'All'
            ? orderByUserData
            : orderByUserData?.filter((order: any) => order?.status === selectedFilter);

    const getStatusStyle = (status: OrderStatus) => {
        switch (status) {
            case 'Delivered':
                return {
                    backgroundColor: '#E5F7EC',
                    color: '#15965A',
                };
            case 'Shipped':
                return {
                    backgroundColor: '#E7F0FF',
                    color: '#3478D4',
                };
            case 'Pending':
                return {
                    backgroundColor: '#FFF4DD',
                    color: '#D99519',
                };
            case 'Cancelled':
                return {
                    backgroundColor: '#FFE9E9',
                    color: '#D94B4B',
                };
            default:
                return {
                    backgroundColor: '#F0F0F0',
                    color: '#555555',
                };
        }
    };

    const updateTrackHandler = async (item: any) => {
        showConfirmAlert({
            title: item?.status === "Pending" ? "Confirm" : item?.status === "Confirmed" ? "Shipped" : item?.status === "Shipped" ? "Delivered" : item?.status === "Delivered" ? "Delivered" : item?.status,
            message: `Are you sure you want to ${item?.status === "Pending" ? "Confirm" : item?.status === "Confirmed" ? "Shipped" : item?.status === "Shipped" ? "Delivered" : item?.status === "Delivered" ? "Delivered" : item?.status} this product?`,
            onConfirm: async () => {
                const data = {
                    id: item?._id,
                    status: item?.status === "Pending" ? "Confirmed" : item?.status === "Confirmed" ? "Shipped" : item?.status === "Shipped" ? "Delivered" : item?.status === "Delivered" ? "Delivered" : item?.status
                }
                try {
                    setStatusLoading(true)
                    let response = await dispatch(updateStatusByVendor(data)).unwrap()
                    if (response?.success) {
                        await dispatch(orderByUser()).unwrap()
                    }
                } catch (error) {
                    console.log("error", error)
                } finally {
                    setStatusLoading(false)
                }

            },
            onCancel: () => {

            },
        });
    }

    const renderOrder = ({ item }: { item: Order }) => {
        const statusStyle = getStatusStyle(item?.status);

        return (
            <AtomView style={styles.orderCard}>
                {/* Order Header */}

                <AtomView style={styles.orderHeader}>
                    <AtomView>
                        <Text style={styles.orderId}>{item?.orderId?._id}</Text>
                        <Text style={styles.orderDate}>{item?.createdAt}</Text>
                    </AtomView>

                    <AtomView
                        style={[
                            styles.statusBadge,
                            { backgroundColor: statusStyle.backgroundColor },
                        ]}
                    >
                        <AtomText title={item.status} style={[styles.statusText, { color: statusStyle.color }]} />

                    </AtomView>
                </AtomView>
                <AtomView style={styles.divider} />
                {item?.products?.map(product => (
                    <AtomView key={product._id} style={styles.productRow}>
                        <CustomImage
                            uri={product.image}
                            style={styles.productImage}
                        />
                        <AtomView style={styles.productInfo}>
                            <AtomText title={product?.name} fontSize={16} fontWeight='700' />
                            <AtomView style={styles.priceRow}>
                                <AtomText title={`₹${product?.price?.toLocaleString('en-IN')}`} fontSize={14} fontWeight='700' />
                                <AtomText title={`Qty: ${product?.quantity}`} fontSize={14} color={Theme.colors.text.darkGray} />
                            </AtomView>
                        </AtomView>
                    </AtomView>
                ))}

                <AtomView style={styles.divider} />
                <AtomView style={styles.orderFooter}>
                    <AtomView>
                        <AtomText title='Total Amount' fontSize={12} color={Theme.colors.text.darkGray} />
                        <AtomText title={`₹${item?.totalAmount?.toLocaleString('en-IN')}`} fontSize={18} fontWeight='700' style={{ marginBottom: 5 }} />
                    </AtomView>
                    {item?.status === "Delivered" ?
                        <AtomText title={'Delivered'} fontSize={16} color={"green"} fontWeight='600' />
                        :
                        <TouchableOpacity
                            style={styles.detailsButton}
                            disabled={statusLoading}
                            onPress={() => updateTrackHandler(item)}
                        >
                            <AtomText title={'Update to'} fontSize={14} color={Theme.colors.background.secondary} fontWeight='600' />
                            <AtomText title={item.status === "Pending" ? "Confirm" : item?.status === "Confirmed" ? "Shipped" : item?.status === "Shipped" ? "Delivered" : item?.status === "Delivered" ? "Delivered" : item?.status} fontSize={14} color={Theme.colors.background.secondary} fontWeight='600' />
                        </TouchableOpacity>
                    }
                </AtomView>
            </AtomView>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header back title='My Orders' />
            <AtomView style={{ padding: 16, paddingTop: 0, backgroundColor: Theme.colors.background.secondary, flex: 1 }}>
                <AtomView style={styles.filterContainer}>
                    {filters.map(filter => (
                        <TouchableOpacity
                            key={filter}
                            onPress={() => setSelectedFilter(filter)}
                            style={[
                                styles.filterButton,
                                selectedFilter === filter && styles.activeFilter,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.filterText,
                                    selectedFilter === filter && styles.activeFilterText,
                                ]}
                            >
                                {filter}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </AtomView>
                {loading ? <LoadingScreen />
                    :
                    filteredOrders?.length === 0 ?
                        <EmptyScreen title="No Order" />
                        :
                        <FlatList
                            data={filteredOrders}
                            keyExtractor={item => item._id}
                            renderItem={renderOrder}
                            showsVerticalScrollIndicator={false}
                        />
                }

            </AtomView>
        </SafeAreaView>
    );
};

export default OrderByUserScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.background.secondary,
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16
    },
    filterButton: {
        padding: 12,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#EEEEEE',
        width: "23%",
        justifyContent: "center",
        alignItems: "center"
    },
    activeFilter: {
        backgroundColor: '#222222',
        borderColor: '#222222',
    },
    filterText: {
        color: '#777',
        fontSize: 12,
        fontWeight: '600',
    },
    activeFilterText: {
        color: '#FFFFFF',
    },
    orderCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 15,
        marginBottom: 15,
        elevation: 2,
        borderWidth: 1,
        borderColor: Theme.colors.common.borderColor
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    orderId: {
        fontSize: 15,
        fontWeight: '700',
        color: '#222',
    },
    orderDate: {
        fontSize: 12,
        color: '#888',
        marginTop: 5,
    },
    statusBadge: {
        paddingHorizontal: 11,
        paddingVertical: 6,
        borderRadius: 20,
    },
    statusText: {
        fontSize: 11,
        fontWeight: '700',
    },
    divider: {
        height: 1,
        backgroundColor: '#EEEEEE',
        marginVertical: 14,
    },
    productRow: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    productImage: {
        width: 90,
        height: 100,
        borderRadius: 10,
        backgroundColor: '#F0F0F0',
    },
    productInfo: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'center',
    },
    category: {
        fontSize: 10,
        color: '#777',
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
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 7,
    },
    productPrice: {
        fontSize: 14,
        fontWeight: '700',
        color: '#222',
    },
    quantity: {
        fontSize: 12,
        color: '#888',
    },
    orderFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    totalLabel: {
        fontSize: 12,
        color: '#888',
    },
    totalAmount: {
        fontSize: 19,
        fontWeight: '700',
        color: '#222',
        marginTop: 3,
    },
    detailsButton: {
        backgroundColor: '#222',
        paddingHorizontal: 17,
        paddingVertical: 11,
        borderRadius: 9,
        flexDirection: "row",
        gap: 5,
        alignItems: "center"
    },
    detailsButtonText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '600',
    },
    reviewButton: {
        borderWidth: 1,
        borderColor: '#E7A52A',
        padding: 12,
        borderRadius: 9,
        alignItems: 'center',
        marginTop: 14,
    },
    reviewButtonText: {
        color: '#C58A19',
        fontSize: 13,
        fontWeight: '700',
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 100,
    },
    emptyIcon: {
        fontSize: 60,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#222',
        marginTop: 15,
    },
    emptySubtitle: {
        fontSize: 13,
        color: '#888',
        marginTop: 7,
    },
});
