import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import CartItem from "../../components/CartItem";
import {
	removeProductFromCart,
	getTotal,
	removeAllProducts
} from "../../store/actions/cart";
import { addOrder } from "../../store/actions/orders";

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

	const eraseCartItems = () => {
		dispatch(removeAllProducts());
	};

	const makeOrder = () => {
		const date = new Date();

		let hours = date.getHours();
		let minutes = date.getMinutes();
		let seconds = date.getSeconds();

		if (hours < 10) hours = "0" + hours;
		if (minutes < 10) minutes = "0" + minutes;
		if (seconds < 10) seconds = "0" + seconds;

		const order = {
			cartItems: cartItems,
			total: totalPrice,
			date: `${date.getDay()}/${date.getMonth() +
				1}/${date.getFullYear()}, ${hours}:${minutes}:${seconds}`,
			id: new Date().toISOString()
		};

		dispatch(addOrder(order));
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
								hasButton={true}
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
								makeOrder();
								eraseCartItems();
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
