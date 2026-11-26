import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, FlatList, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AtomView from "../../../components/atoms/AtomView";
import { Theme } from "../../../theme/constants";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../hooks";
import Header from "../../../components/CustomComponents/Header";
import SearchBar from "../../../components/CustomComponents/SearchBar";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getProducts } from "../dashboardThunk";
import LoadingScreen from "../../../components/CustomComponents/LoadingScreen";
import ProductCard from "../../../components/CustomComponents/CardComponents";


export const categories = [
    {
        id: '1',
        name: 'Fashion',
        icon: 'shirt-outline',
        color: '#EEE7FF',
        iconColor: '#6D4AFF',
    },
    {
        id: '2',
        name: 'Electronics',
        icon: 'phone-portrait-outline',
        color: '#FFEFE5',
        iconColor: '#FF6B00',
    },
    {
        id: '3',
        name: 'Home',
        icon: 'home-outline',
        color: '#E7FFF1',
        iconColor: '#22C55E',
    },
    {
        id: '4',
        name: 'Beauty',
        icon: 'flower-outline',
        color: '#FFE7F7',
        iconColor: '#E91E63',
    },
    {
        id: '5',
        name: 'Sports',
        icon: 'barbell-outline',
        color: '#FFF8DD',
        iconColor: '#F59E0B',
    },
];


const data = [
    {
        icon: 'shield-checkmark-outline',
        title: 'Secure',
        sub: 'Payment',
    },
    {
        icon: 'car-outline',
        title: 'Fast',
        sub: 'Delivery',
    },
    {
        icon: 'refresh-outline',
        title: 'Easy',
        sub: 'Returns',
    },
    {
        icon: 'ribbon-outline',
        title: 'Best Price',
        sub: 'Guaranteed',
    },
];


const Home = () => {
    const { productData } = useAppSelector(state => state?.dashboard);
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        _getProductData()
        return () => { }
    }, [])

    const _getProductData = async () => {
        try {
            setLoading(true)
            await dispatch(getProducts()).unwrap()
        } catch (error) {
            console.log("error", error)
        } finally {
            setLoading(false)
        }
    }

    const renderProductItem = useCallback(({ item }: any) => {
        return (
            <ProductCard showWishList={true} item={item} />
        )
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <Header />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                <SearchBar
                    value={""}
                    onChangeText={() => { }}
                    placeholder={"Search"}
                    onFilterPress={() => { }}
                    onVoicePress={() => { }}
                />
                <View style={{ marginTop: 16 }}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Shop by Categories</Text>

                        <TouchableOpacity>
                            <Text style={styles.viewAll}>View all</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={categories}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.item}>
                                <View
                                    style={[
                                        styles.circle,
                                        { backgroundColor: item.color },
                                    ]}>
                                    <Ionicons
                                        name={item.icon}
                                        size={22}
                                        color={item.iconColor}
                                    />
                                </View>

                                <Text style={styles.name}>
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                    <View style={styles.container111}>
                        {
                            data.map((item, index) => (
                                <View style={styles.item111} key={index}>
                                    <Ionicons
                                        name={item.icon}
                                        size={22}
                                        color="#4F6EF7"
                                    />
                                    <View style={{ marginLeft: 5 }}>
                                        <Text style={styles.title111}>{item.title}</Text>
                                        <Text style={styles.sub}>{item.sub}</Text>
                                    </View>
                                </View>
                            ))
                        }
                    </View>
                </View>
                <AtomView style={{ marginTop: 16, flex: 1 }}>
                    {loading ? <LoadingScreen />
                        :
                        <FlatList
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            data={productData}
                            keyExtractor={(item: any) => item._id?.toString()}
                            renderItem={renderProductItem}
                            scrollEnabled={false}
                        />
                    }
                </AtomView>
            </ScrollView>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 15,
        paddingTop: 0,
        marginBottom: 50
    },
    HomeContainer: {
        justifyContent: "flex-end",
        alignItems: "center",
        padding: 20,
        paddingHorizontal: 16,
        backgroundColor: Theme.colors.background.secondary,
        borderRadius: 20,
        position: "absolute",
        bottom: 0,
        left: 20,
        right: 20,
    },
    line: {
        width: 60,
        height: 4,
        backgroundColor: "#fbcad0ff",
        borderRadius: 2,
        marginVertical: 12
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },

    title: {
        fontSize: 14,
        fontWeight: '700',
    },

    viewAll: {
        fontSize: 14,
        color: '#4F46E5',
        fontWeight: '600',
    },
    item: {
        alignItems: 'center',
        marginRight: 15,
    },
    circle: {
        width: 62,
        height: 62,
        borderRadius: 41,
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        marginTop: 10,
        fontSize: 12,
        fontWeight: '500',
    },
    container111: {
        marginTop: 16,
        paddingVertical: 20,
        backgroundColor: '#fff',
        borderRadius: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        borderWidth: 1,
        borderColor: Theme.colors.common.borderColor
    },

    item111: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    title111: {
        fontWeight: '700',
        fontSize: 10,
    },

    sub: {
        fontSize: 10,
        color: '#777',
        marginTop: 2,
    }
})
export default Home;                      