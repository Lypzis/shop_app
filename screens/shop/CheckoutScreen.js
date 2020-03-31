import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import CartItem from '../../components/shop/CartItem';
import {
	removeProductFromCart,
	getTotal,
	removeAllProducts
} from '../../store/actions/cart';
import { addOrder } from '../../store/actions/orders';
import Colors from '../../constants/Colors';
import Loading from '../../components/UI/Loading';

const CheckoutScreen = props => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();

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

	const makeOrder = async () => {
		const date = new Date();

		let hours = date.getHours();
		let minutes = date.getMinutes();
		let seconds = date.getSeconds();

		if (hours < 10) hours = '0' + hours;
		if (minutes < 10) minutes = '0' + minutes;
		if (seconds < 10) seconds = '0' + seconds;

		const order = {
			cartItems: cartItems,
			total: totalPrice,

			// this will have some issues on android (?)
			// try using momentjs
			// moment(date).format('MMMM Do YYYY, hh:mm');
			date: date.toLocaleString('en-EN', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				hour: '2-digit',
				minute: '2-digit'
			}),

			// `${date.getDate()}/${date.getMonth() +
			// 	1}/${date.getFullYear()}, ${hours}:${minutes}:${seconds}`,
			id: new Date().toISOString()
		};

		setIsLoading(true);
		setError(null);
		try {
			await dispatch(addOrder(order));
			eraseCartItems();
			props.navigation.navigate('ShopScreen');
		} catch (err) {
			setError(err.message);
		}
		setIsLoading(false);
	};

	useEffect(() => {
		if (error)
			Alert.alert('Error', error, [
				{ text: 'Ok', style: 'destructive', onPress: () => setError(null) }
			]);
	}, [error]);

	if (isLoading) return <Loading size="large" color={Colors.primary} />;

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

					<View style={styles.totalBox}>
						<Text style={styles.total}>
							Total:
							<Text style={styles.price}> ${totalPrice.toFixed(2)}</Text>
						</Text>

						<View style={styles.orderButton}>
							<Button color={Colors.secondary} title="Order" onPress={makeOrder} />
						</View>
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
		justifyContent: 'flex-start'
	},
	list: {
		alignItems: 'center'
	},
	fallbackText: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		fontFamily: 'open-sans'
	},
	totalBox: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginHorizontal: 20
	},
	total: {
		marginVertical: 15,
		textAlign: 'center',
		fontFamily: 'open-sans-bold',
		fontSize: 18
	},
	price: {
		color: Colors.primary
	},
	orderButton: {
		width: '50%',
		alignSelf: 'center',
		marginBottom: 10
	}
});

export default CheckoutScreen;
