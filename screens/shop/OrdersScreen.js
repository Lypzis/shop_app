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
					<View>
						<View style={styles.orderHeader}>
							<Text>${ItemData.item.total.toFixed(2)}</Text>
							<Text>{ItemData.item.date.toISOString()}</Text>
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
		justifyContent: "center"
	},
	orderHeader: {
		flexDirection: "row",
		justifyContent: "space-between"
	}
});

export default OrdersScreen;
