import { Pressable, StyleSheet, Text, View } from "react-native";



export default function ConfirmSave({resetConfirmSave, saveChanges}) {

    return (
        <View style={styles.view}>
            <Text>Zapisać zmiany?</Text>
            <Pressable style={({pressed}) => [styles.button, styles.danger, pressed && styles.dangerHeld]} onPress={() => resetConfirmSave()}><Text>Anuluj</Text></Pressable>
            <Pressable style={({pressed}) => [styles.button, pressed && styles.buttonHeld]} onPress={() => saveChanges()}><Text>Zapisz</Text></Pressable>
        </View>
    )

}

const styles = StyleSheet.create({
    view: {
        width: 350,
        height: 60,
        backgroundColor: "white",
        padding: 5,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",

    },
    button: {
        borderColor: "#75a575",
        backgroundColor: "#ccf4a4",
        borderWidth: 2,
        padding: 10,
        borderRadius: 20,
        alignItems: "center"
    }, 
    danger: {
        borderColor: "red",
        backgroundColor: "#ffebeb"
    },
    buttonHeld: {
        backgroundColor: "#d3fea8"
    },
    dangerHeld: {
        backgroundColor: "#fdcbcb"
    }
})