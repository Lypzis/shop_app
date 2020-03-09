import React from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";

import HeaderButton from "../../components/HeaderButton";
import CartItem from "../../components/CartItem";

const OrdersScreen = props => {
	const orders = useSelector(
		state => state.orders.orders,
		() => false
	);

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

	//const renderListofOrders

	return (
		//list of orders
		// total,  date
		// list of items from the order

		<View style={styles.screen}>
			<FlatList
				data={orders}
				renderItem={ItemData => (
					<View style={styles.order}>
						<View style={styles.orderHeader}>
							<Text style={styles.headerText}>${ItemData.item.total.toFixed(2)}</Text>
							<Text style={styles.headerText}>{ItemData.item.date}h</Text>
							{/*<Text>{ItemData.item.cartItems[0].item.title}</Text>*/}
						</View>
						<View style={styles.orderBody}>
							{ItemData.item.cartItems.map(cartItem => {
								console.log(cartItem);

								return <CartItem key={cartItem.id} item={cartItem} />;
							})}
						</View>
					</View>
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		margin: 30
	},
	orderHeader: {
		padding: 5,
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
		fontSize: 20
	},
	order: {
		marginBottom: 15,
		borderWidth: 3,
		borderColor: "#ccc",
		borderRadius: 4,

		elevation: 2
	}
});

export default OrdersScreen;
