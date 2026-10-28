import { Text, View, StyleSheet, Pressable, Switch } from "react-native";
import * as Notifications from "expo-notifications"
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NotifList from "../components/settings/NotifList";


export default function Settings() {

    const [notifHours, setNotifHours] = useState([])

    const [confirmSave, setConfirmSave] = useState(false)

    async function changeConfirmSave() {
        await AsyncStorage.setItem("confirmSave", JSON.stringify(!confirmSave))
        setConfirmSave(p => !p)
    }


    async function setupHours() {
        const hours = await AsyncStorage.getItem("notifHours")
        if (hours) {
            setNotifHours(JSON.parse(hours))
        }
    }


    async function setupSettings() {
        const cS = await AsyncStorage.getItem("confirmSave")
        if (cS) {
            setConfirmSave(cS === "true")
        }
    }

    useEffect(() => {
        setupHours()
        setupSettings()
    }, [])

    useEffect(() => {
        setupNotifs()
    }, [notifHours])

    async function setupNotifs() {
        await Notifications.cancelAllScheduledNotificationsAsync()
        for (const hour of notifHours) {
            await Notifications.scheduleNotificationAsync({
                content: {
                title: "Culina",
                body: "Pamiętaj o uzupełnieniu produktów!",
                },
                trigger: {
                    type: Notifications.SchedulableTriggerInputTypes.DAILY,
                    hour: hour.hour,
                    minute: hour.minute
                }
            });
        }
        await AsyncStorage.setItem("notifHours", JSON.stringify(notifHours))
    }

    async function chooseNotif() {
        DateTimePickerAndroid.open({
            value: new Date(),
            mode: "time",
            is24Hour: true,
            onChange: async (event, date) => {
                if (event.type === "set") {
                    setNotifHours(p => [...p, {hour: date.getHours(), minute: date.getMinutes()}].sort((a, b) => (a.hour * 60 + a.minute) - (b.hour * 60 + b.minute)))
                }
            }
        })
    }


    return (
        <View style={styles.view}>
            <Text style={styles.h}>Ustawienia</Text>
            <Text style={styles.h2}>Powiadomienia</Text>
            <View style={styles.list}>
                {notifHours.length > 0 && <NotifList hours={notifHours} setHours={setNotifHours} />}
            </View>
            <Pressable style={({pressed}) => [styles.pressable, pressed && styles.pressed]} onPress={chooseNotif}><Text>Dodaj godzinę</Text></Pressable>
            
            <Text style={styles.h2}>Inne</Text>
            <View style={styles.horizontal}>
                <Text>Ręczne potwierdzenie zmian</Text>
                <Switch value={confirmSave} onValueChange={changeConfirmSave}></Switch>
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
        fontWeight: "bold",
        margin: 20
    },
    h2: {
        fontSize: 20,
        fontWeight: "bold",
        margin: 10
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
    },
    list: {
        backgroundColor: "#e4ffca",
        height: 200
    },
    horizontal: {
        flexDirection: "row",
        alignItems: "center"
    }
})