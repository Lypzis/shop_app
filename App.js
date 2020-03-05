import React from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from "react-native-screens";

import Navigator from "./navigation/Navigator";
import productsReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";

enableScreens();

const rootReducer = combineReducers({
	products: productsReducer,
	cart: cartReducer
});

const store = createStore(rootReducer);

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<Navigator />
			</NavigationContainer>
		</Provider>
	);
}
