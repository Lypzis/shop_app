import React, { useState, useEffect, useReducer } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	ScrollView,
	Alert
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';

import HeaderButton from '../../components/UI/HeaderButton';
import Product from '../../models/product';
import { addUserProduct, editUserProduct } from '../../store/actions/products';
import Input from '../../components/UI/Input';

/** MISSION: try to use useReducer here and apply the validations from the video */

const EditProductScreen = props => {
	// the owner and item id are hardcorded just for the moment,
	// for science you know :D
	const [productInfo, setProductInfo] = useState(
		new Product('f' + Math.random() * 10, 'u1', '', '', '', '')
	);

	const dispatch = useDispatch();

	// Example of 'useReducer'
	// const initialReducerState = {
	// 	inputValues: {
	// 		title: props.route.params ? props.route.params.title : '',
	// 		imageUrl: props.route.params ? props.route.params.imageUrl : '',
	// 		description: props.route.params ? props.route.params.description : '',
	// 		price: ''
	// 	},
	// 	inputValidities: {
	// 		title: props.route.params ? true : false,
	// 		imageUrl: props.route.params ? true : false,
	// 		description: props.route.params ? true : false,
	// 		price: props.route.params ? true : false
	// 	},
	// 	formIsValid: props.route.params ? true : false
	// };

	// // example of useReducer
	// // this is not related to react-redux
	// const formReducer = (state, action) => {
	// 	if (action.type === 'UPDATE') console.log('Update :DDD');
	// };

	// const [formState, dispatchFormState] = useReducer(
	// 	formReducer,
	// 	initialReducerState
	// );

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

	const showAlert = () => {
		Alert.alert(
			'Something is Wrong',
			'It seems one or more inputs are empty, please fill all of them before submiting.',
			[{ text: 'Ok', style: 'default' }]
		);
	};

	const edit = () => {
		// example purposes
		//dispatchFormState({ type: 'UPDATE', value: productInfo, ... });

		if (checkProductInfo()) {
			dispatch(editUserProduct(productInfo));
			props.navigation.replace('MyProductsScreen');
		} else showAlert();
	};

	const save = () => {
		if (checkProductInfo()) {
			dispatch(addUserProduct(productInfo));

			props.navigation.replace('MyProductsScreen');
		} else showAlert();
	};

	const checkProductInfo = () => {
		if (productInfo.description.trim() === '') return false;
		if (productInfo.imageUrl.trim() === '') return false;
		if (productInfo.price.toString().trim() === '') return false;
		if (productInfo.title.trim() === '') return false;

		return true;
	};

	return (
		<ScrollView contentContainerStyle={styles.screen}>
			<Input
				autoFocus={false}
				keyboardType="default"
				autoCapitalize="sentences"
				autoCorrect
				returnKeyType="next" // how the 'submit' button is presented
				onEndEditing={() => console.log('Finished')}
				onSubmitEditing={() => console.log('Submitted')}
				label="Title"
				value={productInfo.title}
				changeValue={text => changeFieldValue(text, 'title')}
			/>
			<Input
				label="Image Url"
				keyboardType="default"
				value={productInfo.imageUrl}
				changeValue={text => changeFieldValue(text, 'imageUrl')}
			/>
			{props.route.params === undefined && (
				<Input
					label="Price"
					keyboardType="decimal-pad"
					returnKeyType="next"
					value={productInfo.price.toString()}
					changeValue={text => changeFieldValue(text, 'price')}
				/>
			)}
			<Input
				label="Description"
				keyboardType="default"
				returnKeyType="next"
				multiline
				numberOfLines={3}
				value={productInfo.description}
				changeValue={text => changeFieldValue(text, 'description')}
			/>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		margin: 20,
		justifyContent: 'flex-start'
	}
});

export default EditProductScreen;
