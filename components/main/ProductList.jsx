import { FlatList, StyleSheet } from "react-native";
import Product from "./Product";

export default function ProductList({items, setItems, shopping, setShopping, isConfirmSave, changedItems, setChangedItems}) {
    return <FlatList style={styles.flatlist} data={items} renderItem={({item}) => (<Product item={item} setItems={setItems} isShopping={shopping.some(n => item.id === n.id)} setShopping={setShopping} isConfirmSave={isConfirmSave} amount={changedItems[item.id] ? changedItems[item.id] : 0 } setChangedItems={setChangedItems} />)} />
}

const styles = StyleSheet.create({
    flatlist: {
        backgroundColor: "#408100",
        padding: 5,
        borderRadius: 10
    }
})