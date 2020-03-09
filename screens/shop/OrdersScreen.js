import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";

import HeaderButton from "../../components/HeaderButton";
import Colors from "../../constants/Colors";
import Order from "../../components/Order";

const OrdersScreen = props => {
	const orders = useSelector(
		state => state.orders.orders,
		() => false
	);

	orders.showDetails = true;

	props.navigation.setOptions({
		headerLeft: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="Favorite"
					iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
					color={Platform.OS === "android" ? "#fff" : Colors.primary}
					onPress={() => props.navigation.toggleDrawer()}
				/>
			</HeaderButtons>
		)
	});
	return (
		<View style={styles.screen}>
			<FlatList
				data={orders}
				renderItem={ItemData => <Order orderData={ItemData.item} />}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		margin: 30
	}
});

export default OrdersScreen;
