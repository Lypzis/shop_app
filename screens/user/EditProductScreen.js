import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch } from "react-redux";

import Product from "../../models/product";
import HeaderButton from "../../components/HeaderButton";
import { addUserProduct, editUserProduct } from "../../store/actions/products";

const EditProductScreen = props => {
	// the owner and item id are hardcorded just for the moment,
	// for science you know :D
	const [productInfo, setProductInfo] = useState(
		new Product("f" + Math.random() * 10, "u1", "", "", "", "")
	);

	const dispatch = useDispatch();

	props.navigation.setOptions({
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="Confirm"
					iconName={
						Platform.OS === "android"
							? "md-checkmark-circle-outline"
							: "ios-checkmark-circle-outline"
					}
					color={Platform.OS === "android" ? "#fff" : Colors.primary}
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
			case "title":
				stateCopy.title = text;
				break;
			case "price":
				stateCopy.price = text;
				break;
			case "description":
				stateCopy.description = text;
				break;
			case "imageUrl":
				stateCopy.imageUrl = text;
				break;
			default:
				return;
		}

		return setProductInfo(stateCopy);
	};

	const edit = () => {
		dispatch(editUserProduct(productInfo));

		props.navigation.replace("MyProductsScreen");
	};

	const save = () => {
		//check formats

		// add user item
		dispatch(addUserProduct(productInfo));

		// go back
		props.navigation.replace("MyProductsScreen");
	};

	return (
		<View style={styles.screen}>
			<View style={styles.inputBoxShort}>
				<Text>Title:</Text>
				<TextInput
					autoFocus={false}
					value={productInfo.title}
					onChangeText={text => changeFieldValue(text, "title")}
				/>
			</View>
			<View style={styles.inputBoxShort}>
				<Text>Price:</Text>
				<TextInput
					autoFocus={false}
					keyboardType="numeric"
					value={productInfo.price.toString()}
					onChangeText={text => changeFieldValue(text, "price")}
				/>
			</View>
			<View>
				<Text>Description:</Text>
				<TextInput
					autoFocus={false}
					numberOfLines={3}
					multiline={true}
					value={productInfo.description}
					onChangeText={text => changeFieldValue(text, "description")}
				/>
			</View>
			<View>
				<Text>Image Url:</Text>
				<TextInput
					autoFocus={false}
					numberOfLines={3}
					multiline={true}
					value={productInfo.imageUrl}
					onChangeText={text => changeFieldValue(text, "imageUrl")}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "flex-start"
	},
	inputBoxShort: {
		flexDirection: "row",
		alignItems: "center",
		width: "100%"
	}
});

export default EditProductScreen;
