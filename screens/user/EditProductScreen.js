import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';

import Product from '../../models/product';
import HeaderButton from '../../components/HeaderButton';
import { addUserProduct, editUserProduct } from '../../store/actions/products';

const EditProductScreen = props => {
	// the owner and item id are hardcorded just for the moment,
	// for science you know :D
	const [productInfo, setProductInfo] = useState(
		new Product('f' + Math.random() * 10, 'u1', '', '', '', '')
	);

	const dispatch = useDispatch();

	props.navigation.setOptions({
		title: props.route.params !== undefined ? 'Edit Product' : 'Create Product',
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="Confirm"
					iconName={
						Platform.OS === 'android'
							? 'md-checkmark-circle-outline'
							: 'ios-checkmark-circle-outline'
					}
					color={Platform.OS === 'android' ? '#fff' : Colors.primary}
					onPress={props.route.params !== undefined ? edit : save}
				/>
			</HeaderButtons>
		)
	});

	useEffect(() => {
		if (props.route.params !== undefined) {
			const prodParams = props.route.params;

			setProductInfo(
				new Product(
					prodParams.id,
					prodParams.ownerId,
					prodParams.title,
					prodParams.imageUrl,
					prodParams.description,
					prodParams.price
				)
			);
		}
	}, []);

	const changeFieldValue = (text, field) => {
		const stateCopy = { ...productInfo };

		switch (field) {
			case 'title':
				stateCopy.title = text;
				break;
			case 'price':
				stateCopy.price = text;
				break;
			case 'description':
				stateCopy.description = text;
				break;
			case 'imageUrl':
				stateCopy.imageUrl = text;
				break;
			default:
				return;
		}

		return setProductInfo(stateCopy);
	};

	const edit = useCallback(() => {
		if (checkProductInfo()) {
			dispatch(editUserProduct(productInfo));
			props.navigation.replace('MyProductsScreen');
		} else console.log('Something is missing!');
	}, []);

	const save = useCallback(() => {
		if (checkProductInfo()) {
			dispatch(addUserProduct(productInfo));

			props.navigation.replace('MyProductsScreen');
		} else console.log('Something is missing!');
	}, []);

	const checkProductInfo = () => {
		if (productInfo.description.trim() === '') return false;
		if (productInfo.imageUrl.trim() === '') return false;
		if (productInfo.price.toString().trim() === '') return false;
		if (productInfo.title.trim() === '') return false;

		return true;
	};

	return (
		<ScrollView contentContainerStyle={styles.screen}>
			<View style={styles.inputBox}>
				<Text style={styles.label}>Title:</Text>
				<TextInput
					style={styles.input}
					autoFocus={false}
					value={productInfo.title}
					onChangeText={text => changeFieldValue(text, 'title')}
				/>
			</View>
			{props.route.params === undefined && (
				<View style={styles.inputBox}>
					<Text style={styles.label}>Price:</Text>
					<TextInput
						style={styles.input}
						autoFocus={false}
						keyboardType="numeric"
						value={productInfo.price.toString()}
						onChangeText={text => changeFieldValue(text, 'price')}
					/>
				</View>
			)}

			<View style={styles.inputBox}>
				<Text style={styles.label}>Description:</Text>
				<TextInput
					style={styles.input}
					autoFocus={false}
					numberOfLines={3}
					multiline={true}
					value={productInfo.description}
					onChangeText={text => changeFieldValue(text, 'description')}
				/>
			</View>
			<View style={styles.inputBox}>
				<Text style={styles.label}>Image Url:</Text>
				<TextInput
					style={styles.input}
					autoFocus={false}
					numberOfLines={3}
					multiline={true}
					value={productInfo.imageUrl}
					onChangeText={text => changeFieldValue(text, 'imageUrl')}
				/>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		margin: 20,
		justifyContent: 'flex-start'
	},
	inputBox: {
		marginBottom: 12
	},
	label: {
		fontFamily: 'open-sans',
		marginVertical: 8,
		marginRight: 5
	},
	input: {
		paddingHorizontal: 10,
		paddingVertical: 2,
		borderColor: '#ccc',
		borderBottomWidth: 2
	}
});

export default EditProductScreen;
