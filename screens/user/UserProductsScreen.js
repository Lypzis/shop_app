import React from "react";
import { View, StyleSheet, Platform, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";

import HeaderButton from "../../components/HeaderButton";
import Colors from "../../constants/Colors";
import ProductCard from "../../components/ProductCard";

const UserProductsScreen = props => {
	const userProducts = useSelector(state => state.products.userProducts);

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

	return (
		<View style={styles.screen}>
			<FlatList
				style={{ width: "100%" }}
				data={userProducts}
				renderItem={itemData => (
					<ProductCard
						title={itemData.item.title}
						source={itemData.item.imageUrl}
						price={itemData.item.price}
						leftButtonTitle="Edit"
						rightButtonTitle="Delete"
						leftButtonFunction={() =>
							props.navigation.navigate("EditProductScreen", itemData.item)
						}
						rightButtonFunction={() => console.log(`${itemData.item.title} Deleted!`)}
					/>
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	}
});

export default UserProductsScreen;
