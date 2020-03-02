import React from "react";
import { StyleSheet, View } from "react-native";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import productsReducer from "./store/reducers/products";

import ShopScreen from "./screens/shop/ShopScreen";

const rootReducer = combineReducers({
	products: productsReducer
});

const store = createStore(rootReducer);

export default function App() {
	return (
		<Provider store={store}>
			<View style={styles.container}>
				<ShopScreen />
			</View>
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	}
});