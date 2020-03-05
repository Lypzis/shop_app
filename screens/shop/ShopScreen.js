import React from "react";
import { View, Text, StyleSheet, FlatList, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductCard from "../../components/ProductCard";
import HeaderButton from "../../components/HeaderButton";

import { addProductToCart } from "../../store/actions/cart";

const ShopScreen = props => {
	const shopProducts = useSelector(state => state.products.availableProducts);

	const dispatch = useDispatch();

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
		),
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="Favorite"
					iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
					color={Platform.OS === "android" ? "#fff" : Colors.primary}
					onPress={() => props.navigation.navigate("CheckoutScreen")}
				/>
			</HeaderButtons>
		)
	});

	const addProduct = product => {
		dispatch(addProductToCart(product));
	};

	return (
		<View style={styles.screen}>
			<FlatList
				style={{ width: "100%" }}
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
							props.navigation.navigate("ProductDetailsScreen", itemData.item)
						}
					/>
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		width: "100%"
	}
});

export default ShopScreen;
