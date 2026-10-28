import { router } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";



export default function addItem() {

    const [name, setName] = useState("")
    const db = useSQLiteContext()

    async function add() {
        if (name.length === 0) return
        await db.runAsync(`INSERT INTO products (name, amount, addedDate) VALUES ("${name}", 1, "${Date.now()}");`)
        router.back()
    }

    return (
        <View style={styles.view}>
            <Text style={styles.h}>Dodaj produkt</Text>
            <TextInput style={styles.textinput} value={name} onChangeText={setName} placeholder="Nazwa produktu" />
            <Pressable style={({pressed}) => [styles.pressable, pressed && styles.pressed]} onPress={() => add()}><Text>Dodaj</Text></Pressable>
        </View>
    )

}


const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0ffe2"
    },
    h: {
        fontSize: 32,
        fontWeight: "bold"
    },
    textinput: {
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        borderColor: "#75a575",
        borderWidth: 2,
        margin: 30,
        alignSelf: "center",
        width: 400
    },
    pressable: {
        borderWidth: 2,
        borderColor: "#75a575",
        backgroundColor: "#ccf4a4",
        margin: 10,
        width: 150,
        padding: 10,
        borderRadius: 20,
        alignItems: "center"
    },
    pressed: {
        backgroundColor: "#d3fea8"
    }
})