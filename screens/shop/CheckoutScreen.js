import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import CartItem from "../../components/CartItem";
import { removeProductFromCart, getTotal } from "../../store/actions/cart";

const CheckoutScreen = props => {
	useEffect(() => {
		calculateTotal();
	}, []);

	const cartItems = useSelector(
		state => state.cart.products,
		() => false // trigger rerender, it must, so we pass false to the equality function
	);

	const totalPrice = useSelector(state => state.cart.total);

	const dispatch = useDispatch();

	const removeItem = id => {
		dispatch(removeProductFromCart(id));
		calculateTotal();
	};

	const calculateTotal = () => {
		dispatch(getTotal());
	};

	return (
		// order button

		<View style={styles.screen}>
			{cartItems.length > 0 ? (
				<View>
					<FlatList
						data={cartItems}
						renderItem={itemData => (
							<CartItem
								key={itemData.item.id}
								item={itemData.item}
								onRemoveItem={removeItem.bind(this, itemData.item.id)}
							/>
						)}
					/>

					<View style={styles.total}>
						<Text>Total: ${totalPrice.toFixed(2)}</Text>
					</View>
					<View style={styles.orderButton}>
						<Button
							title="Order"
							onPress={() => {
								console.log("Ordered!");
								props.navigation.navigate("ShopScreen");
							}}
						/>
					</View>
				</View>
			) : (
				<View style={styles.fallbackText}>
					<Text>-- Your Cart is Empty --</Text>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "flex-start"
	},
	list: {
		alignItems: "center"
	},
	fallbackText: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	total: {
		marginBottom: 10,
		alignItems: "center"
	},
	orderButton: {
		width: "50%",
		alignSelf: "center",
		marginBottom: 10
	}
});

export default CheckoutScreen;
