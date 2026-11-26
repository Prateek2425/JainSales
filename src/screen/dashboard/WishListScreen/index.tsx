import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AtomView from "../../../components/atoms/AtomView";
import { useDispatch } from "react-redux";
import SearchBar from "../../../components/CustomComponents/SearchBar";
import ProductCard from "../../../components/CustomComponents/CardComponents";
import EmptyScreen from "../../../components/CustomComponents/EmptyScreen";
import LoadingScreen from "../../../components/CustomComponents/LoadingScreen";
import Header from "../../../components/CustomComponents/Header";
import { getWishlistProduct } from "./wishListThunk";
import { useFocusEffect } from "@react-navigation/native";

const WishListScreen = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [wishProductData, setWishProductData] = useState([])

    useFocusEffect(
        useCallback(() => {
            _getWishListProduct()
        }, [])
    )

    const _getWishListProduct = async () => {
        try {
            setLoading(true)
            let response = await dispatch(getWishlistProduct()).unwrap()
            if (response?.success === true) {
                setWishProductData(response?.data)
            }
        } catch (error) {
            console.log("error", error)
        } finally {
            setLoading(false)
        }
    }

    const renderProductItem = useCallback(({ item }: any) => {
        return (
            <ProductCard item={item} showWishList={true} />
        )
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <Header back title={"WishList"} />
            <AtomView style={styles.container}>
                <SearchBar
                    value={""}
                    onChangeText={() => { }}
                    placeholder={"Search"}
                    onFilterPress={() => { }}
                    onVoicePress={() => { }}
                />
                <AtomView style={{ marginTop: 16, flex: 1 }}>
                    {loading ? <LoadingScreen />
                        :
                        wishProductData?.length === 0 ?
                            <EmptyScreen title="No WishList Product" />
                            :
                            <FlatList
                                numColumns={2}
                                showsHorizontalScrollIndicator={false}
                                data={wishProductData}
                                keyExtractor={(item: any) => item._id?.toString()}
                                renderItem={renderProductItem}
                            />
                    }
                </AtomView>
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
})
export default WishListScreen;                      