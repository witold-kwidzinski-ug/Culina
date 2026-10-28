import { FlatList, StyleSheet } from "react-native";
import ShoppingProduct from "./ShoppingProduct";

export default function ShoppingList({items, setItems,}) {
    return <FlatList style={styles.flatlist} data={items} renderItem={({item}) => (<ShoppingProduct item={item} setItems={setItems}/>)} />
}

const styles = StyleSheet.create({
    flatlist: {
        backgroundColor: "#408100",
        padding: 5,
        borderRadius: 10
    }
})