import { useCallback, useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, TextInput, View, Image, Alert, Pressable, Modal } from "react-native"
import ProductList from "../components/main/ProductList";
import { useSQLiteContext } from "expo-sqlite";
import Footer from "../components/main/Footer";
import { useFocusEffect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {

    const db = useSQLiteContext()

    const [changedItems, setChangedItems] = useState({})
    const [isConfirmSave, setConfirmSave] = useState(false)

    const [items, setItems] = useState([])
    const [searchItems, setSearchItems] = useState([])

    const [shopping, setShopping] = useState([])

    const [prompt, setPrompt] = useState("")

    const [showSort, setShowSort] = useState(false)

    const [sortType, setSortType] = useState("default")



    const sortObject = {
        default: () => {},
        name: (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
        reverseName: (a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()),
        amount: (a, b) => b.amount - a.amount,
        reverseAmount: (a, b) => a.amount - b.amount
    }

    function checkConfirmSaved() {
        return isConfirmSave && Object.values(changedItems).some(n => n !== 0)
    }

    async function saveChanges() {
        const tmp = Object.entries(changedItems)

        for (let i = 0; i < tmp.length; i++) {
            const item = tmp[i]
            if (item[1] === 0) {
                continue
            }
            await db.runAsync(`UPDATE products SET amount=amount+${item[1]} WHERE id=${item[0]}`)
        }

        setItems(p => {
            const newItems = [...p]

            for (let i = 0; i < newItems.length; i++) {
                const el = newItems[i]
                if (changedItems[el.id]) {
                    el.amount += changedItems[el.id]
                }

            }

            return newItems

        })
        setChangedItems({})

    }

    
    async function getProducts() {
        const products = await db.getAllAsync("SELECT * FROM products")
        const tmp = products.sort((a, b) => {return new Date(b.addedDate) - new Date(a.addedDate)})

        const shopping = await db.getAllAsync("SELECT * FROM shopping")
        setItems(tmp)
        setSearchItems(tmp)
        setShopping(shopping)
    }

    async function getSettings() {
        const cS = await AsyncStorage.getItem("confirmSave")
        if (cS) {
            setConfirmSave(cS === "true")
        }
    }

    function resetConfirmSave() {
        setChangedItems({})
    }

    useEffect(() => {
        getProducts()
        getSettings()
    }, [])

    useFocusEffect(
        useCallback(() => {
            getProducts()
            getSettings()
        }, [db])
    )


    useEffect(() => {
        const tmp = items.filter(n => n.name.toLowerCase().includes(prompt.toLowerCase())).sort(sortObject[sortType])

        setSearchItems(tmp)
    }, [prompt, sortType])


    return (
        <SafeAreaView style={styles.view}>
            <Modal visible={showSort} animationType="slide">
                <View style={styles.modal} >
                <Text style={styles.h}>Sortuj produkty</Text>
                <Pressable style={({pressed}) => [styles.sortChoice, sortType === "default" && styles.selectedSort, pressed && styles.sortHeld]} onPress={() => {
                    setSortType("default")
                    setShowSort(false)
                }}><Text>{"Data dodania (domyślne)"}</Text></Pressable>
                <Pressable style={({pressed}) => [styles.sortChoice, sortType === "name" && styles.selectedSort, pressed && styles.sortHeld]} onPress={() => {
                    setSortType("name")
                    setShowSort(false)
                }}><Text>{"Nazwa (A-Z)"}</Text></Pressable>
                <Pressable style={({pressed}) => [styles.sortChoice, sortType === "reverseName" && styles.selectedSort, pressed && styles.sortHeld]} onPress={() => {
                    setSortType("reverseName")
                    setShowSort(false)
                }}><Text>{"Nazwa (Z-A)"}</Text></Pressable>
                <Pressable style={({pressed}) => [styles.sortChoice, sortType === "amount" && styles.selectedSort, pressed && styles.sortHeld]} onPress={() => {
                    setSortType("amount")
                    setShowSort(false)
                }}><Text>{"Ilość (rosnąco)"}</Text></Pressable>
                <Pressable style={({pressed}) => [styles.sortChoice, sortType === "reverseAmount" && styles.selectedSort, pressed && styles.sortHeld]} onPress={() => {
                    setSortType("reverseAmount")
                    setShowSort(false)
                }}><Text>{"Ilość (malejąco)"}</Text></Pressable>

                </View>



            </Modal>
            <View style={styles.header}>
                <TextInput style={styles.textinput} value={prompt} onChangeText={setPrompt} placeholder="Wyszukaj produkt"></TextInput>
                <Pressable onPress={() => setShowSort(true)}><Image style={styles.filter} source={require("../assets/filter.png")} /></Pressable>
            </View>
            <View style={styles.content}>
                {items.length > 0 ? <ProductList items={searchItems} setItems={setItems} shopping={shopping} setShopping={setShopping} isConfirmSave={isConfirmSave} changedItems={changedItems} setChangedItems={setChangedItems} /> : <Text>Brak produktów!</Text>}
            </View>
            <View style={styles.footer}><Footer confirmedSave={checkConfirmSaved()} resetConfirmSave={resetConfirmSave} saveChanges={saveChanges} /></View>

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
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    filter: {
        height: 30,
        width: 30
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
    textinput: {
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        alignSelf: "center",
        width: 360
    },
    h: {
        fontSize: 32,
        fontWeight: "bold",
        textAlign: "center"
    },
    modal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    sortChoice: {
        backgroundColor: "#dfdfdf",
        padding: 10,
        width: 200,
        borderRadius: 20,
        margin: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    selectedSort: {
        backgroundColor: "#bbffa2"
    },
    sortHeld: {
        backgroundColor: "#97ff71"
    }
})