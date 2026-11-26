import React from "react";
import AtomView from "../atoms/AtomView";
import { ActivityIndicator, StyleSheet } from "react-native";


const LoadingScreen = () => {

    return (
        <AtomView style={styles.container}>
            <ActivityIndicator size={"small"} color={"#000"} />
        </AtomView>
    )
}

export default LoadingScreen

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: "center",
        alignItems: "center"
    }
})