import { FlatList } from "react-native";
import Notif from "./Notif";


export default function NotifList({hours, setHours}) {

    return (
        <FlatList data={hours} renderItem={({item}) => (<Notif hour={item} notifHours={hours} setHours={setHours} />)} />
    )
}