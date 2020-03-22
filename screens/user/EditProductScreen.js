import React, { useReducer, useCallback } from 'react';
import { StyleSheet, ScrollView, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';

import HeaderButton from '../../components/UI/HeaderButton';
import { addUserProduct, editUserProduct } from '../../store/actions/products';
import Input from '../../components/UI/Input';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
	if (action.type === FORM_INPUT_UPDATE) {
		const updatedValues = {
			...state.inputValues,
			[action.input]: action.value
		};
		const updatedValidities = {
			...state.inputValidities,
			[action.input]: action.isValid
		};
		let updatedFormIsValid = true;

		// if at least one input is invalid, the entire form is invalid
		for (const key in updatedValidities) {
			updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
		}
		return {
			...state,
			inputValidities: updatedValidities,
			inputValues: updatedValues,
			formIsValid: updatedFormIsValid
		};
	}

	// in case of no action, which is unrealistic
	return state;
};

const EditProductScreen = props => {
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

	let prodId = '';

	if (props.route.params !== undefined) prodId = props.route.params.id;

	const editedProduct = useSelector(state =>
		state.products.userProducts.find(prod => prod.id === prodId)
	);

	const dispatch = useDispatch();

	const initialState = {
		id: editedProduct ? editedProduct.id : 'f' + Math.random() * 10,
		// the owner and item id are hardcorded just for the moment,
		// for science you know :D
		owner: 'u1',
		inputValues: {
			title: editedProduct ? editedProduct.title : '',
			imageUrl: editedProduct ? editedProduct.imageUrl : '',
			description: editedProduct ? editedProduct.description : '',
			price: editedProduct ? editedProduct.price : ''
		},
		inputValidities: {
			title: editedProduct ? true : false,
			imageUrl: editedProduct ? true : false,
			description: editedProduct ? true : false,
			price: editedProduct ? true : false
		},
		formIsValid: editedProduct ? true : false
	};

	const [formState, dispatchFormState] = useReducer(formReducer, initialState);

	const showAlert = () => {
		Alert.alert(
			'Something is Wrong',
			'It seems one or more inputs are empty, please fill all of them before submiting.',
			[{ text: 'Ok', style: 'default' }]
		);
	};

	// text is by default always received as last argument
	// by an onChangeText, wheter explicit or not
	const inputChangeHandler = useCallback(
		(inputIdentifier, inputValue, inputValidity) => {
			dispatchFormState({
				type: FORM_INPUT_UPDATE,
				value: inputValue,
				isValid: inputValidity,
				input: inputIdentifier
			});
		},
		[dispatchFormState]
	); // with use of useCallBack, this function will never rebuild, because it is unecessary anyway.

	const edit = () => {
		//if form is valid
		if (formState.formIsValid) {
			dispatch(
				editUserProduct({
					id: formState.id,
					owner: formState.owner,
					...formState.inputValues
				})
			);
			props.navigation.replace('MyProductsScreen');
		} else showAlert();
	};

	const save = () => {
		//if form is valid
		if (formState.formIsValid) {
			dispatch(
				addUserProduct({
					id: formState.id,
					owner: formState.owner,
					...formState.inputValues
				})
			);
			props.navigation.replace('MyProductsScreen');
		} else showAlert();
	};

	return (
		<ScrollView contentContainerStyle={styles.screen}>
			<Input
				id="title"
				editMode={editedProduct ? true : false}
				autoFocus={false}
				keyboardType="default"
				autoCapitalize="sentences"
				autoCorrect
				returnKeyType="next" // how the 'submit' button is presented
				label="Title"
				errorText="Please input a valid title."
				value={formState.inputValues.title}
				initiallyValid={!editedProduct}
				initialValue={editedProduct ? editedProduct.title : ''}
				initiallyValid={!!editedProduct}
				required
				onInputChange={inputChangeHandler} // binding was causing too much rerendering
			/>
			<Input
				id="imageUrl"
				editMode={editedProduct ? true : false}
				label="Image Url"
				errorText="Please input a valid image url."
				keyboardType="default"
				initialValue={editedProduct ? editedProduct.imageUrl : ''}
				returnKeyType="next"
				initiallyValid={!!editedProduct}
				required
				onInputChange={inputChangeHandler}
			/>
			{!editedProduct && (
				<Input
					id="price"
					label="Price"
					errorText="Please input a valid price"
					keyboardType="decimal-pad"
					returnKeyType="next"
					required
					min={0.05}
					onInputChange={inputChangeHandler}
				/>
			)}
			<Input
				id="description"
				editMode={editedProduct ? true : false}
				label="Description"
				errorText="Please input a valid description."
				keyboardType="default"
				autoCorrect
				multiline
				initialValue={editedProduct ? editedProduct.description : ''}
				numberOfLines={3}
				initiallyValid={!!editedProduct}
				required
				minLength={5}
				onInputChange={inputChangeHandler}
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
