import React, { useEffect, useState, useCallback } from 'react';
import {
	View,
	StyleSheet,
	FlatList,
	Platform,
	ActivityIndicator,
	Text,
	Button
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductCard from '../../components/UI/ProductCard';
import HeaderButton from '../../components/UI/HeaderButton';
import { addProductToCart } from '../../store/actions/cart';
import { fetchProducts } from '../../store/actions/products';
import Colors from '../../constants/Colors';
import Loading from '../../components/UI/Loading';

const ShopScreen = props => {
	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [error, setError] = useState(null);

	const shopProducts = useSelector(
		state => state.products.availableProducts
		//() => false  NOTE: not necessary anymore, now with navigation listener
	);

	const dispatch = useDispatch();

	useEffect(() => {
		// If user is coming back to this screen(focus), run 'loadProducts'
		const unsubscribe = props.navigation.addListener('focus', loadProducts);

		return unsubscribe; // cleanup function, remember to ALWAYS use this after adding a listener
	}, [loadProducts]);

	useEffect(() => {
		setIsLoading(true);
		loadProducts().then(() => setIsLoading(false));
	}, [loadProducts]);

	props.navigation.setOptions({
		headerLeft: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="Menu"
					iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
					color={Platform.OS === 'android' ? '#fff' : Colors.primary}
					onPress={() => props.navigation.toggleDrawer()}
				/>
			</HeaderButtons>
		),
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="Checkout"
					iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
					color={Platform.OS === 'android' ? '#fff' : Colors.primary}
					onPress={() => props.navigation.navigate('CheckoutScreen')}
				/>
			</HeaderButtons>
		)
	});

	const addProduct = product => {
		dispatch(addProductToCart(product));
	};

	const loadProducts = useCallback(async () => {
		setError(null);
		setIsRefreshing(true);
		try {
			await dispatch(fetchProducts());
		} catch (err) {
			setError(err.message);
		}
		setIsRefreshing(false);
	}, [dispatch, setIsLoading, setError]); // remember, it will only rerun if on of these array's argument changes
	// just like in useEffect

	if (isLoading) return <Loading size="large" color={Colors.primary} />;

	if (!isLoading && shopProducts.length === 0)
		return (
			<View style={styles.loading}>
				<Text>No products found. Maybe start adding some! D:</Text>
			</View>
		);

	if (error)
		return (
			<View style={styles.loading}>
				<Text>{error}</Text>
				<Button title="Reload" onPress={loadProducts} color={Colors.primary} />
			</View>
		);

	return (
		<View style={styles.screen}>
			<FlatList
				// onRefresh and refreshing are required for the "pull to refresh :D"
				onRefresh={loadProducts}
				refreshing={isRefreshing}
				style={{ width: '100%' }}
				data={shopProducts}
				renderItem={itemData => (
					<ProductCard
						title={itemData.item.title}
						source={itemData.item.imageUrl}
						price={itemData.item.price}
						leftButtonTitle="Details"
						rightButtonTitle="Cart"
						rightButtonFunction={() => addProduct(itemData.item)}
						leftButtonFunction={() =>
							props.navigation.navigate('ProductDetailsScreen', itemData.item)
						}
					/>
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		width: '100%'
	}
});

export default ShopScreen;
