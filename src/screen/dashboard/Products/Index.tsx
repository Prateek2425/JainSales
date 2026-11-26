import React, { useCallback, useState } from "react";
import { StyleSheet, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AtomView from "../../../components/atoms/AtomView";
import { Theme } from "../../../theme/constants";
import { useDispatch } from "react-redux";
import SearchBar from "../../../components/CustomComponents/SearchBar";
import ProductCard from "../../../components/CustomComponents/CardComponents";
import { productByVendor } from "../dashboardThunk";
import EmptyScreen from "../../../components/CustomComponents/EmptyScreen";
import LoadingScreen from "../../../components/CustomComponents/LoadingScreen";
import { navigate } from "../../../Navigation/RootNavigation";
import { useFocusEffect } from "@react-navigation/native";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6"
import { useAppSelector } from "../../../hooks";
const Products = () => {
    const { productByVendorData } = useAppSelector((state) => state?.dashboard)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    useFocusEffect(
        useCallback(() => {
            _getProductData()
        }, [])
    )

    const _getProductData = async () => {
        try {
            setLoading(true)
            await dispatch(productByVendor()).unwrap()
        } catch (error) {
            console.log("error", error)
        } finally {
            setLoading(false)
        }
    }

    const addProductHandler = () => {
        navigate("AddProductScreen")
    }

    const renderProductItem = useCallback(({ item }: any) => {
        return (
            <ProductCard ownProduct={true} item={item} showWishList={false} />
        )
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <AtomView style={styles.container}>
                <AtomView style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <AtomView style={{ width: "84%" }}>
                        <SearchBar
                            value={""}
                            onChangeText={() => { }}
                            placeholder={"Search"}
                            onFilterPress={() => { }}
                            onVoicePress={() => { }}
                        />
                    </AtomView>
                    <Pressable onPress={addProductHandler} style={styles.addProduct}>
                        <FontAwesome6 name='plus' size={18} color={Theme.colors.background.secondary} />
                    </Pressable>
                </AtomView>
                <AtomView style={{ marginTop: 16, flex: 1 }}>
                    {loading ? <LoadingScreen />
                        :
                        productByVendorData?.length === 0 ?
                            <EmptyScreen title="No Product" />
                            :
                            <FlatList
                                numColumns={2}
                                showsVerticalScrollIndicator={false}
                                data={productByVendorData}
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
    addProduct: {
        width: 48,
        height: 48,
        borderRadius: 48 / 2,
        backgroundColor: "#ca90caff",
        justifyContent: "center",
        alignItems: "center"
    }
})
export default Products;                      