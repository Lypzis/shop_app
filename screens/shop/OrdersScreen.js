import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../../components/UI/HeaderButton';
import Order from '../../components/shop/Order';
import Colors from '../../constants/Colors';
import { fetchOrders } from '../../store/actions/orders';
import Loading from '../../components/UI/Loading';

const OrdersScreen = props => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();

	useEffect(() => {
		const unsubscribe = props.navigation.addListener('focus', loadOrders);

		return unsubscribe;
	}, [loadOrders]);

	const orders = useSelector(state => state.orders.orders);

	const dispatch = useDispatch();

	orders.showDetails = true;

	props.navigation.setOptions({
		headerLeft: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="Favorite"
					iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
					color={Platform.OS === 'android' ? '#fff' : Colors.primary}
					onPress={() => props.navigation.toggleDrawer()}
				/>
			</HeaderButtons>
		)
	});

	const loadOrders = useCallback(async () => {
		setError(null);
		setIsLoading(true);
		try {
			await dispatch(fetchOrders());
		} catch (err) {
			setError(err.message);
		}
		setIsLoading(false);
	}, [dispatch, setError, setIsLoading]);

	if (isLoading) return <Loading size="large" color={Colors.primary} />;

	if (error)
		return (
			<View style={styles.loading}>
				<Text>No orders found. Maybe start placing some! D:</Text>
			</View>
		);

	return (
		<View style={styles.screen}>
			{orders.length > 0 ? (
				<FlatList
					data={orders}
					renderItem={ItemData => <Order orderData={ItemData.item} />}
				/>
			) : (
				<View style={styles.fallbackText}>
					<Text>-- You Haven't ordered anything yet... --</Text>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		margin: 30
	},
	fallbackText: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		fontFamily: 'open-sans'
	}
});

export default OrdersScreen;
