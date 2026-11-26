import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AtomView from "../../../components/atoms/AtomView";
import { Theme } from "../../../theme/constants";
import { useDispatch } from "react-redux";
import SearchBar from "../../../components/CustomComponents/SearchBar";
import { addCategory, getCategory } from "../dashboardThunk";
import EmptyScreen from "../../../components/CustomComponents/EmptyScreen";
import LoadingScreen from "../../../components/CustomComponents/LoadingScreen";
import { navigate } from "../../../Navigation/RootNavigation";
import AtomText from "../../../components/atoms/AtomText";

const Categories = () => {
    const dispatch = useDispatch()
    const [CategoryData, setCategoryData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getCategoryHandler()
        return () => { }
    }, [])

    const randomHexColor = () => {
        return "#" + Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, "0");
    };

    const getCategoryHandler = async () => {
        try {
            setLoading(true)
            const response = await dispatch(getCategory()).unwrap();
            if (response?.status === 200) {
                setCategoryData(response?.data?.data)
            }
        } catch (error) {
            console.log("error", error)

        } finally {
            setLoading(false)
        }
    }

    const categoryHandler = (value: any) => {
        navigate("ProductByCategories", { Category: value })
    }

    const addCategoryHandler = async () => {
        // try {
        //     const response = await dispatch(addCategory({
        //         name: "Toys",
        //         color: `${randomHexColor()}90`
        //     }),
        //     ).unwrap();
        //     if (response?.status === 201) {
        //         getCategoryHandler()
        //     }
        // } catch (error) {

        // }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <AtomView style={styles.container}>
                <SearchBar
                    value={""}
                    onChangeText={() => { }}
                    placeholder={"Search"}
                    onFilterPress={() => { }}
                    onVoicePress={() => { }}
                />
                <AtomView style={{ marginTop: 16, flex: 1 }}>
                    <AtomView style={styles.header}>
                        <Text style={styles.title}>Shop by Categories</Text>

                        <TouchableOpacity onPress={addCategoryHandler}>
                            <Text style={styles.viewAll}>View all</Text>
                        </TouchableOpacity>
                    </AtomView>
                    {loading ? <LoadingScreen />
                        :
                        CategoryData?.length === 0 ?
                            <EmptyScreen title="No Category" />
                            :
                            <FlatList
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                data={CategoryData}
                                keyExtractor={(item: any) => item._id?.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => categoryHandler(item)} style={styles.item}>
                                        <AtomView
                                            style={[
                                                styles.circle,
                                                { backgroundColor: item?.color }
                                            ]}>
                                            <AtomText title={item?.name?.trim()?.[0]} color={Theme.colors.background.secondary} fontSize={18} fontWeight="700" />
                                        </AtomView>
                                        <AtomText title={item?.name} color="#000" fontSize={16} fontWeight="500" style={{ marginTop: 8 }} />
                                    </TouchableOpacity>
                                )}
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
})
export default Categories;                      