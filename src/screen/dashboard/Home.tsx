import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, ImageBackground, Pressable, FlatList, Image, View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ImgAssets from "../../assets/img-assets";
import AtomView from "../../components/atoms/AtomView";
import AtomText from "../../components/atoms/AtomText";
import { Theme } from "../../theme/constants";
import { useDispatch } from "react-redux";
import { logout } from "../auth/authSlice";
import { navigate, reset } from "../../Navigation/RootNavigation";
import ImagePicker from "react-native-image-crop-picker";
import { useAppSelector } from "../../hooks";
import { getProducts } from "./dashboardThunk";
import Header from "../../components/CustomComponents/Header";
import SearchBar from "../../components/CustomComponents/SearchBar";
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProductCard from "../../components/CustomComponents/CardComponents";


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
    const { token } = useAppSelector(state => state.auth);
    const dispatch = useDispatch()
    const [uploadImage, setUploadImage] = useState({})
    const [productData, setProductData] = useState([])


    useEffect(() => {
        // _getProductList()
    }, [])

    const _getProductList = async () => {
        try {
            const response = await dispatch(getProducts()).unwrap();
            if (response?.status === 200) {
                setProductData(response?.data)
            }
        } catch (error) {
            console.log("errorerror", error)
        }
    }

    const logoutHandler = () => {
        dispatch(logout());
        reset("Login")
    }

    const uploadImageHandler = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        }).then((image) => {
            setUploadImage(image);
        });
    }

    const addImage = async () => {
        const formData = new FormData();
        formData.append("name", "Samsungg");
        formData.append("price", "10000");
        formData.append("description", "Gaming mobile");
        formData.append("image", {
            uri: uploadImage?.path,
            type: uploadImage?.mime,
            name: uploadImage?.filename,
        });
        const data = await fetch("http://localhost:3000/api/products", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                // Content-Type manually mat set karo
            },
            body: formData,
        });
        const response = await data.json();
        if (response?.product) {
            _getProductList()
        }
    }

    const renderProductItem = useCallback(({ item }: any) => {
        return (
            <AtomView style={{ height: 250, borderWidth: 1, marginBottom: 16, borderRadius: 12, padding: 12 }}>
                <Image source={{ uri: item?.image }} style={{ width: "100%", height: "80%", borderRadius: 12 }} resizeMode="cover" />
                <AtomText title={item?.name} />
            </AtomView>
        )
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <Header />
            <AtomView style={styles.container}>
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
                    <View style={{ marginTop: 16 }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginBottom: 12
                            }}>

                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: '700',
                                }}>
                                Best Picks for You
                            </Text>

                            <Text
                                style={{
                                    color: '#4F46E5',
                                    fontWeight: '600',
                                }}>
                                View all
                            </Text>
                        </View>
                        <FlatList
                            horizontal
                            data={[1, 2, 3, 4, 5, 6]}
                            renderItem={({ item }) => (
                                <ProductCard item={item} />
                            )}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </View>
                {/* <ImageBackground
                    source={ImgAssets.bg_auth}
                    style={{ flex: 1, padding: 20 }}
                    resizeMode="cover"
                > */}
                {/* <FlatList
                    data={productData ?? []}
                    renderItem={renderProductItem}
                /> */}
                {/* <AtomView style={styles.HomeContainer}>
                    <Pressable onPress={uploadImageHandler}>
                        <AtomText title={"Home"} fontSize={16} fontWeight="700" />
                    </Pressable>
                    <Pressable style={{ marginTop: 50 }} onPress={addImage}>
                        <AtomText title={"Add product"} fontSize={16} fontWeight="700" />
                    </Pressable>
                </AtomView> */}
                {/* </ImageBackground> */}
            </AtomView>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 15,
        paddingTop: 0
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