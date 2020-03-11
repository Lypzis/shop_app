import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

import HeaderButton from '../../components/UI/HeaderButton';
import Order from '../../components/shop/Order';
import Colors from '../../constants/Colors';

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
					iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
					color={Platform.OS === 'android' ? '#fff' : Colors.primary}
					onPress={() => props.navigation.toggleDrawer()}
				/>
			</HeaderButtons>
		)
	});
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
