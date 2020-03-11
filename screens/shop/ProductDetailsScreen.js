import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	Button,
	ScrollView
} from 'react-native';
import { useDispatch } from 'react-redux';

import { addProductToCart } from '../../store/actions/cart';
import Colors from '../../constants/Colors';

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
				style={{ height: 300, width: '100%' }}
			/>
			<Text style={styles.textPrice}>${product.price}</Text>
			<View style={styles.innerContent}>
				<View style={styles.descriptionBox}>
					<Text style={styles.description}>{product.description}</Text>
				</View>
				<View style={styles.bottomButton}>
					<Button
						color={Colors.primary}
						title="Add to Cart"
						onPress={addProduct.bind(this, product)}
					/>
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flexGrow: 1
	},
	innerContent: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 20,
		paddingHorizontal: 30
	},
	descriptionBox: {
		marginBottom: 15,
		borderWidth: 3,
		borderColor: '#ccc',
		borderRadius: 4,
		padding: 10
	},
	description: {
		fontFamily: 'open-sans'
	},
	textPrice: {
		textAlign: 'center',
		marginTop: 20,
		color: '#888',
		fontSize: 22,
		fontFamily: 'open-sans-bold'
	},
	bottomButton: {}
});

export default ProductDetailScreens;
