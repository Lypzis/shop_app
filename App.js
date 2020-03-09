import React, { useState } from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from "react-native-screens";
import { AppLoading } from "expo";
import * as Font from "expo-font";

import Navigator from "./navigation/Navigator";
import productsReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import orderReducer from "./store/reducers/orders";

enableScreens();

const rootReducer = combineReducers({
	products: productsReducer,
	cart: cartReducer,
	orders: orderReducer
});

const store = createStore(rootReducer);

const fetchFonts = () => {
	Font.loadAsync({
		"open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
		"open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
	});
};

export default function App() {
	const [fontLoaded, setFontLoaded] = useState(false);

	if (!fontLoaded)
		return (
			<AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} />
		);

	return (
		<Provider store={store}>
			<NavigationContainer>
				<Navigator />
			</NavigationContainer>
		</Provider>
	);
}
