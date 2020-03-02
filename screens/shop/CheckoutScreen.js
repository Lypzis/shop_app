import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CheckoutScreen = props => {
	return (
		<View style={styles.screen}>
			<Text>The Checkout Screen!</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	}
});

export default CheckoutScreen;
