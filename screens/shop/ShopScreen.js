import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";

import ProductCard from "../../components/ProductCard";

const ShopScreen = props => {
	const shopProducts = useSelector(state => state.products.products);

	console.log(shopProducts);

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
