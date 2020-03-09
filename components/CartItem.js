import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import CustomButton from "./CustomButton";
import Colors from "../constants/Colors";

const CartItem = props => {
	let CustomIcon = (
		<Ionicons name="ios-remove" size={32} color={Colors.primary} />
	);

	if (Platform.OS === "android" && Platform.Version >= 21)
		CustomIcon = <Ionicons name="md-remove" size={32} color="#fff" />;

	const product = props.item;

	return (
		<View style={styles.cartItem}>
			<Text style={styles.quatity}>{product.qty}</Text>
			<Text style={styles.title}>{product.item.title}</Text>
			<Text style={styles.price}>
				${(product.item.price * product.qty).toFixed(2)}
			</Text>
			{props.hasButton && (
				<CustomButton pressed={props.onRemoveItem}>{CustomIcon}</CustomButton>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	cartItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginHorizontal: 20,
		marginVertical: 8,
		borderBottomColor: "#ccc",
		borderBottomWidth: 3,
		paddingBottom: 9
	},
	quatity: {
		fontSize: 18,
		fontFamily: "open-sans"
	},
	title: {
		fontSize: 18,
		textAlign: "center",
		fontFamily: "open-sans-bold"
	},
	price: {
		fontSize: 14,
		fontFamily: "open-sans-bold"
	}
});

export default CartItem;
