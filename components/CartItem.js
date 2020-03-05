import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import CustomButton from "./CustomButton";

const CartItem = props => {
	let CustomIcon = (
		<Ionicons name="ios-remove-circle-outline" size={32} color="#000" />
	);

	if (Platform.OS === "android" && Platform.Version >= 21)
		CustomIcon = (
			<Ionicons name="md-remove-circle-outline" size={32} color="#000" />
		);

	const product = props.item;

	return (
		<View style={styles.cartItem}>
			<Text>{product.qty}</Text>
			<Text>{product.item.title}</Text>
			<Text>${(product.item.price * product.qty).toFixed(2)}</Text>
			<CustomButton pressed={props.onRemoveItem}>{CustomIcon}</CustomButton>
		</View>
	);
};

const styles = StyleSheet.create({
	cartItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginHorizontal: 20,
		marginVertical: 10
	}
});

export default CartItem;
