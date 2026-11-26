import React from "react";
import AtomView from "../atoms/AtomView";
import { StyleSheet } from "react-native";
import AtomText from "../atoms/AtomText";


const EmptyScreen = ({ title = "No Data Here" }: any) => {

    return (
        <AtomView style={styles.container}>
            <AtomText title={title} fontSize={18} fontWeight="700" />
        </AtomView>
    )
}

export default EmptyScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})