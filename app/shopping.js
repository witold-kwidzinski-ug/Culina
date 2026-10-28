import { useSQLiteContext } from "expo-sqlite"
import { useEffect, useState } from "react"
import ShoppingList from "../components/shopping/ShoppingList"
import { View, StyleSheet, Dimensions, Text } from "react-native"
import Footer from "../components/shopping/Footer"
import { SafeAreaView } from "react-native-safe-area-context"


export default function Shopping() {

    const db = useSQLiteContext()

    const [items, setItems] = useState([])

    async function getItems() {
        const products = await db.getAllAsync("SELECT s.id, p.name, s.amount FROM shopping s JOIN products p ON p.id = s.id")
        setItems(products)
    }

    useEffect(() => {
        getItems()
    }, [])

    return (
        <SafeAreaView style={styles.view}>
            <View style={styles.header}><Text style={styles.h}>Zakupy</Text></View>
            <View style={styles.content}>
                <ShoppingList items={items} setItems={setItems} shopping={items} setShopping={setItems} />
            </View>
            <View style={styles.footer}><Footer items={items} setItems={setItems} /></View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    view: {
        backgroundColor: "#4C9900"
    },
    header: {
        height: 60,
        backgroundColor: "#4C9900",
        justifyContent: "center"
    },
    h: {
        fontSize: 32,
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        alignSelf: "center"
    },
    content: {
        height: Dimensions.get("window").height - 120,
        margin: 0,
        padding: 10,
        color: "#000000"
    },
    footer: {
        height: 60,
        backgroundColor: "#4C9900",
    },
})