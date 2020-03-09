import React, { useState } from "react";
import { View, Button, Text, StyleSheet } from "react-native";

import CartItem from "./CartItem";
import Colors from "../constants/Colors";

const Order = props => {
	const [showDetails, toggleShowDetails] = useState(false);

	return (
		<View style={styles.order}>
			<View style={styles.orderHeader}>
				<Text style={styles.headerText}>${props.orderData.total.toFixed(2)}</Text>
				<Text style={styles.headerText}>{props.orderData.date}</Text>
				{/*<Text>{props.orderData.cartItems[0].item.title}</Text>*/}
			</View>

			{showDetails ? (
				<View style={styles.orderBody}>
					{props.orderData.cartItems.map(cartItem => (
						<CartItem key={cartItem.id} item={cartItem} />
					))}
				</View>
			) : null}

			<Button
				color={Colors.secondary}
				title="Show Details"
				onPress={() => toggleShowDetails(prevState => !prevState)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	orderHeader: {
		padding: 15,
		flexDirection: "row",
		justifyContent: "space-between",
		borderColor: "transparent",
		borderBottomColor: "#ccc",
		borderBottomWidth: 3
	},
	orderBody: {
		padding: 5
	},
	headerText: {
		fontSize: 16,
		fontFamily: "open-sans-bold"
	},
	order: {
		marginBottom: 15,
		borderWidth: 3,
		borderColor: "#ccc",
		borderRadius: 4,

		elevation: 2
	}
});

export default Order;
