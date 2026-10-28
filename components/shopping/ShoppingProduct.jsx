import { router } from "expo-router"
import { useSQLiteContext } from "expo-sqlite"
import { useRef, useState } from "react"
import { Image, Pressable, StyleSheet, Text, View } from "react-native"
import { Animated } from "react-native"

export default function ShoppingProduct({item, setItems}) {

    const db = useSQLiteContext()

    const anim = useRef(new Animated.Value(0)).current

    const icon = require("../../assets/list_minus.png")

    async function add() {
        await db.runAsync(`UPDATE shopping SET amount=amount+1 WHERE id=${item.id}`)
        setItems(p => {
            const tmp = [...p]
            const el = tmp.find(n => n.id === item.id)
            el.amount++
            return tmp
        })
    }

    async function subtract() {
        if (item.amount <= 0) {
            return
        }
        await db.runAsync(`UPDATE shopping SET amount=amount-1 WHERE id=${item.id}`)
        setItems(p => {
            const tmp = [...p]
            const el = tmp.find(n => n.id === item.id)
            el.amount--
            return tmp
        })
    }


    // async function addToShopping() {
    //     await db.runAsync(`INSERT INTO shopping (id, amount) VALUES (${item.id}, 0)`)
    //     setShopping(p => [...p, {id: item.id, amount: 0}])
    // }

    async function removeFromShopping() {
        await db.runAsync(`DELETE FROM shopping WHERE id = ?`, [item.id])
        setItems(p => p.filter(n => n.id !== item.id))
    }


    return (
        <View style={styles.view}>
            <Pressable style={styles.holding} android_ripple={{
                color: "#999"
            }} onPress={() => router.push(`/edit/${item.id}`)}>
                <Text style={styles.text}>{item.name.length <= 25 ? item.name : `${item.name.substring(0,25)}...` }</Text>
                <Pressable onPress={removeFromShopping}><Image style={styles.icon} source={icon} /></Pressable>
                <View style={styles.amountView}>
                    <Pressable onPress={subtract} style={({pressed}) => [styles.button, pressed && styles.buttonPressed]}><Text>-</Text></Pressable>
                    <Text>{item.amount}</Text>
                    <Pressable onPress={add} style={({pressed}) => [styles.button, pressed && styles.buttonPressed]}><Text>+</Text></Pressable>
                </View>
            </Pressable>
        </View>
    )
}


const styles = StyleSheet.create({
    view: {
        borderTopColor: "#408100",
        backgroundColor: "white",
        borderRadius: 10,
        borderTopWidth: 1,
        margin: 1,
        padding: 10,
    },
    icon: {
        width: 40,
        height: 40
    },
    holding: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    text: {
        flex: 1
    },
    amountView: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    button: {
        marginLeft: 10,
        marginRight: 10,
        width: 50,
        height: 50,
        borderWidth: 2,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        
    },
    buttonPressed: {
        transform: [{scale: 1.1}]
    }
})