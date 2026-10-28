import { router } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { Pressable, StyleSheet, Text, View } from "react-native";


export default function Footer({items, setItems}) {

    const db = useSQLiteContext()

    function finalize() {
        items.forEach(n => {
            db.runSync(`UPDATE products SET amount=amount+${n.amount} WHERE id=${n.id}`)
            db.runSync(`DELETE FROM shopping WHERE id = ?`, [n.id])
        })
        router.back()
    }

    function remove() {
        db.runSync("DELETE FROM shopping")
        setItems([])
    }

    return (
        <View style={styles.view}>
            <Pressable style={({pressed}) => [styles.button, styles.clear, pressed && styles.pressed]} onPress={remove}><Text style={styles.whiteText}>Wyczyść</Text></Pressable>
            <Pressable style={({pressed}) => [styles.button, pressed && styles.pressed]} onPress={finalize}><Text style={styles.whiteText}>Zrealizuj</Text></Pressable>
        </View>
    )
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
    clear: {
        backgroundColor: "#7a0000"
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
    },
    whiteText: {
        color: "white",
        fontWeight: "bold"
    }
})