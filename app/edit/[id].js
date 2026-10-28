import { router, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { TextInput, View, StyleSheet, Text, Pressable, Alert } from "react-native";

export default function Edit() {
    const { id } = useLocalSearchParams()
    const db = useSQLiteContext()

    const [name, setName] = useState("")

    useEffect(() => {
        async function getItem() {
            const product = await db.getAllAsync(`SELECT * FROM products WHERE id=${id}`)
            setName(product[0].name)
        }

        getItem()

    }, [])


    async function saveChanges() {
        await db.runAsync(`UPDATE products SET name = ? WHERE id = ?`, [name, id])
        router.back()
    }

    function deleteMoment() {
        Alert.alert("Usunięcie produktu", "Czy jesteś pewien?", [
            {text: "OK", onPress: () => deleteProduct()},
            {text: "Anuluj", style: "cancel"}
        ])
    }

    async function deleteProduct() {
        await db.runAsync(`DELETE FROM products WHERE id = ?`, [id])
        router.back()
    }

    return (
        <View style={styles.view}>
            <Text style={styles.h}>Edytuj produkt</Text>
            <TextInput style={styles.textinput} placeholder="Nazwa produktu" value={name} onChangeText={setName}>

            </TextInput>
            
            <Pressable style={({pressed}) => [styles.button, styles.danger, pressed && styles.dangerHeld]} onPress={() => deleteMoment()}><Text style={styles.redText}>Usuń produkt</Text></Pressable>

            <View style={styles.decisionButtons}>
                <Pressable style={({pressed}) => [styles.button, styles.danger, pressed && styles.dangerHeld]} onPress={router.back}><Text style={styles.redText}>Anuluj</Text></Pressable>
                <Pressable style={({pressed}) => [styles.button, pressed && styles.buttonHeld]} onPress={saveChanges}><Text>Zapisz</Text></Pressable>
            </View>
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
    button: {
        borderColor: "#75a575",
        backgroundColor: "#ccf4a4",
        borderWidth: 2,
        margin: 10,
        width: 150,
        padding: 10,
        borderRadius: 20,
        alignItems: "center"
    },
    danger: {
        borderColor: "red",
        backgroundColor: "#ffebeb"
    },
    redText: {
        color: "red"
    },

    decisionButtons: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    buttonHeld: {
        backgroundColor: "#d3fea8"
    },
    dangerHeld: {
        backgroundColor: "#fdcbcb"
    }
})