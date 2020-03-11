import React from 'react';
import { View, StyleSheet, Platform, FlatList, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
import ProductCard from '../../components/UI/ProductCard';
import { deleteProduct } from '../../store/actions/products';

const UserProductsScreen = props => {
	const userProducts = useSelector(
		state => state.products.userProducts,
		() => false
	);

	const dispatch = useDispatch();

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
					title="Edit"
					iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
					color={Platform.OS === 'android' ? '#fff' : Colors.primary}
					onPress={() => props.navigation.navigate('EditProductScreen')}
				/>
			</HeaderButtons>
		)
	});

	const deleteMyProduct = id => {
		// A simple alert, for deletetion confirmation
		Alert.alert(
			'Are you sure?',
			'This will permanently remove the item and there will be no coming back...',
			[
				{ text: 'No', style: 'cancel' },
				{
					text: 'Yes',
					style: 'destructive',
					onPress: () => dispatch(deleteProduct(id))
				}
			]
		);
	};

	return (
		<View style={styles.screen}>
			<FlatList
				style={{ width: '100%' }}
				data={userProducts}
				renderItem={itemData => (
					<ProductCard
						title={itemData.item.title}
						source={itemData.item.imageUrl}
						price={itemData.item.price}
						leftButtonTitle="Edit"
						rightButtonTitle="Delete"
						leftButtonFunction={() =>
							props.navigation.navigate('EditProductScreen', itemData.item)
						}
						rightButtonFunction={() => deleteMyProduct(itemData.item.id)}
					/>
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default UserProductsScreen;
