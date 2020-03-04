import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/HeaderButton";

const OrdersScreen = props => {
	props.navigation.setOptions({
		headerLeft: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="Favorite"
					iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
					onPress={() => props.navigation.toggleDrawer()}
				/>
			</HeaderButtons>
		)
	});

	return (
		<View style={styles.screen}>
			<Text>The Orders Screen!</Text>
			<Button
				title="Go to Checkout"
				onPress={() => props.navigation.navigate("CheckoutScreen")}
			/>
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

export default OrdersScreen;
