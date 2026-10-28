import { View, StyleSheet, Text, Pressable } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function Notif({hour, notifHours, setHours}) {


    async function removeNotif() {
        const newHours = notifHours.filter(n => hour.hour !== n.hour && hour.minute !== n.minute)
        setHours(newHours)
    }

    return (
        <View style={styles.view}>
            <Text style={styles.decentlyBig}>{hour.hour}:{hour.minute > 9 ? hour.minute : `0${hour.minute}`}</Text>
            <Pressable onPress={removeNotif}><Text style={[styles.red, styles.decentlyBig]}>x</Text></Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "white",
        width: 300,
        height: 60
    },
    red: {
        color: "red",
        fontWeight: "bold"
    },
    decentlyBig: {
        fontSize: 30
    }
})