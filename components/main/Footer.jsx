import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import ConfirmSave from "./ConfirmSave";


export default function Footer({confirmedSave, resetConfirmSave, saveChanges}) {

    if (!confirmedSave) {
        return (
            <View style={styles.view}>
                <Pressable style={({pressed}) => [styles.button, pressed && styles.pressed]} onPress={() => router.push("/additem")}><Image style={styles.image} source={require("../../assets/plus.png")} /></Pressable>
                <Pressable style={({pressed}) => [styles.button, pressed && styles.pressed]} onPress={() => router.push("/shopping")}><Image style={[styles.image && styles.list]} source={require("../../assets/list.png")} /></Pressable>
                <Pressable style={({pressed}) => [styles.button, pressed && styles.pressed]} onPress={() => router.push("/settings")}><Image style={styles.image} source={require("../../assets/setting.png")} /></Pressable>
            </View>
        )

    } else {
        return (
            <View style={styles.view}>
                <ConfirmSave resetConfirmSave={resetConfirmSave} saveChanges={saveChanges} />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    view: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    button: {
        backgroundColor: "#3d7a00",
        padding: 20,
        borderRadius: 20
    },
    image: {
        width: 20,
        height: 20
    },
    list: {
        width: 30,
        height: 30
    },
    pressed: {
        transform: [{scale: 1.1}]
    }
})