import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ShopScreen from "../screens/shop/ShopScreen";
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen";
import CheckoutScreen from "../screens/shop/CheckoutScreen";
import StackScreenGlobalSettings from "../constants/StackScreenGlobalSettings";

const Stack = createStackNavigator();

const ShopNavigator = props => (
	<Stack.Navigator screenOptions={StackScreenGlobalSettings}>
		<Stack.Screen
			name="ShopScreen"
			options={{ title: "Shop" }}
			component={ShopScreen}
		/>
		<Stack.Screen
			name="ProductDetailsScreen"
			options={{ title: "Product Details" }}
			component={ProductDetailsScreen}
		/>
		<Stack.Screen
			name="CheckoutScreen"
			options={{ title: "Checkout" }}
			component={CheckoutScreen}
		/>
	</Stack.Navigator>
);

export default ShopNavigator;
