
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../components/CustomComponents/Header';
import AtomView from '../../../components/atoms/AtomView';
import { Theme } from '../../../theme/constants';
import { useDispatch } from 'react-redux';
import { getOrderProduct } from './orderThunk';
import { getOrderList } from './orderSlice';

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
    orderId: string;
    orderDate: string;
    status: OrderStatus;
    products: OrderProduct[];
    totalAmount: number;
}

const orders: Order[] = [
    {
        _id: '1',
        orderId: 'ORD-1001',
        orderDate: '22 Nov 2026',
        status: 'Delivered',
        totalAmount: 6498,
        products: [
            {
                _id: 'p1',
                name: 'Wireless Headphones',
                price: 2499,
                description: 'Premium sound with noise cancellation.',
                category: 'Electronics',
                image: 'https://picsum.photos/200',
                quantity: 1,
            },
            {
                _id: 'p2',
                name: 'Smart Watch',
                price: 3999,
                description: 'Smart fitness tracking and stylish design.',
                category: 'Accessories',
                image: 'https://picsum.photos/201',
                quantity: 1,
            },
        ],
    },
    {
        _id: '2',
        orderId: 'ORD-1002',
        orderDate: '21 Nov 2026',
        status: 'Shipped',
        totalAmount: 1499,
        products: [
            {
                _id: 'p3',
                name: 'Running Shoes',
                price: 1499,
                description: 'Comfortable shoes for everyday running.',
                category: 'Fashion',
                image: 'https://picsum.photos/202',
                quantity: 1,
            },
        ],
    },
    {
        _id: '3',
        orderId: 'ORD-1003',
        orderDate: '20 Nov 2026',
        status: 'Pending',
        totalAmount: 999,
        products: [
            {
                _id: 'p4',
                name: 'Backpack',
                price: 999,
                description: 'Lightweight backpack for daily use.',
                category: 'Accessories',
                image: 'https://picsum.photos/203',
                quantity: 1,
            },
        ],
    },
];

type Props = {
    navigation: any;
};

const MyOrdersScreen: React.FC<Props> = ({ navigation }) => {
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        _getAllOrderData()
        return () => { }
    }, [])

    const _getAllOrderData = async () => {
        try {
            setLoading(true)
            let response = await dispatch(getOrderProduct()).unwrap()
            if (response?.success) {
                getOrderList(response?.data)
            }
        } catch (error) {
            console.log("error", error)
        } finally {
            setLoading(false)
        }
    }

    const filters = ['All', 'Pending', 'Shipped', 'Delivered'];

    const filteredOrders =
        selectedFilter === 'All'
            ? orders
            : orders.filter(order => order.status === selectedFilter);

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

    const renderOrder = ({ item }: { item: Order }) => {
        const statusStyle = getStatusStyle(item.status);

        return (
            <View style={styles.orderCard}>
                {/* Order Header */}

                <View style={styles.orderHeader}>
                    <View>
                        <Text style={styles.orderId}>{item.orderId}</Text>
                        <Text style={styles.orderDate}>{item.orderDate}</Text>
                    </View>

                    <View
                        style={[
                            styles.statusBadge,
                            { backgroundColor: statusStyle.backgroundColor },
                        ]}
                    >
                        <Text style={[styles.statusText, { color: statusStyle.color }]}>
                            {item.status}
                        </Text>
                    </View>
                </View>

                <View style={styles.divider} />

                {/* Products */}

                {item.products.map(product => (
                    <View key={product._id} style={styles.productRow}>
                        <Image
                            source={{ uri: product.image }}
                            style={styles.productImage}
                        />

                        <View style={styles.productInfo}>
                            <Text style={styles.category}>{product.category}</Text>

                            <Text style={styles.productName}>{product.name}</Text>

                            <Text style={styles.description} numberOfLines={2}>
                                {product.description}
                            </Text>

                            <View style={styles.priceRow}>
                                <Text style={styles.productPrice}>
                                    ₹{product.price.toLocaleString('en-IN')}
                                </Text>

                                <Text style={styles.quantity}>
                                    Qty: {product.quantity}
                                </Text>
                            </View>
                        </View>
                    </View>
                ))}

                <View style={styles.divider} />

                {/* Order Footer */}

                <View style={styles.orderFooter}>
                    <View>
                        <Text style={styles.totalLabel}>Total Amount</Text>
                        <Text style={styles.totalAmount}>
                            ₹{item.totalAmount.toLocaleString('en-IN')}
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={styles.detailsButton}
                    // onPress={() =>
                    //     navigation.navigate('OrderDetails', {
                    //         orderId: item._id,
                    //     })
                    // }
                    >
                        <Text style={styles.detailsButtonText}>View Details</Text>
                    </TouchableOpacity>
                </View>

                {item.status === 'Delivered' && (
                    <TouchableOpacity
                        style={styles.reviewButton}
                    // onPress={() =>
                    //     navigation.navigate('WriteReview', {
                    //         orderId: item._id,
                    //         products: item.products,
                    //     })
                    // }
                    >
                        <Text style={styles.reviewButtonText}>
                            ★  Write a Review
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <Header back title='My Orders' />
            <AtomView style={{ padding: 16, paddingTop: 0, backgroundColor: Theme.colors.background.secondary }}>
                <View style={styles.filterContainer}>
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
                </View>
                <FlatList
                    data={filteredOrders}
                    keyExtractor={item => item._id}
                    renderItem={renderOrder}
                    showsVerticalScrollIndicator={false}
                />
            </AtomView>
        </SafeAreaView>
    );
};

export default MyOrdersScreen;

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
        marginTop: 4,
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
