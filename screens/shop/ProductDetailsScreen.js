import React from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	Button,
	ScrollView
} from "react-native";
import { useDispatch } from "react-redux";

import { addProductToCart } from "../../store/actions/cart";

const ProductDetailScreens = props => {
	const product = props.route.params;

	const dispatch = useDispatch();

	props.navigation.setOptions({
		title: product.title
	});

	const addProduct = product => {
		dispatch(addProductToCart(product));
	};

	return (
		<ScrollView contentContainerStyle={styles.screen}>
			<Image
				source={{ uri: product.imageUrl }}
				style={{ height: 300, width: "100%" }}
			/>
			<View>
				<Text style={styles.textPrice}>${product.price}</Text>
			</View>
			<View style={styles.innerContent}>
				<View style={styles.descriptionBox}>
					<Text>{product.description}</Text>
				</View>
				<View style={styles.bottomButton}>
					<Button title="Add to Cart" onPress={addProduct.bind(this, product)} />
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1
	},
	innerContent: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 20,
		paddingHorizontal: 30
	},
	descriptionBox: {
		marginTop: 10,
		borderWidth: 3,
		borderColor: "#ccc",
		borderRadius: 4,
		padding: 10
	},
	textPrice: {
		textAlign: "center",
		marginTop: 10,
		color: "green",
		fontSize: 22
	},
	bottomButton: {}
});

export default ProductDetailScreens;
