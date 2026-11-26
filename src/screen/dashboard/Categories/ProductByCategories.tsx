import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AtomView from "../../../components/atoms/AtomView";
import { useDispatch } from "react-redux";
import SearchBar from "../../../components/CustomComponents/SearchBar";
import ProductCard from "../../../components/CustomComponents/CardComponents";
import { productByCategory } from "../dashboardThunk";
import EmptyScreen from "../../../components/CustomComponents/EmptyScreen";
import LoadingScreen from "../../../components/CustomComponents/LoadingScreen";
import Header from "../../../components/CustomComponents/Header";

const ProductCategories = ({ route }: any) => {
    const { Category } = route?.params
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [productData, setProductData] = useState([])

    useEffect(() => {
        _getProductByCategory()
        return () => { }
    }, [])

    const _getProductByCategory = async () => {
        try {
            setLoading(true)
            let response = await dispatch(productByCategory(Category?.name)).unwrap()
            if (response?.status === 200) {
                setProductData(response?.data?.products)
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
            <Header back />
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
                        productData?.length === 0 ?
                            <EmptyScreen title="No Product" />
                            :
                            <FlatList
                                numColumns={2}
                                showsHorizontalScrollIndicator={false}
                                data={productData}
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
export default ProductCategories;                      