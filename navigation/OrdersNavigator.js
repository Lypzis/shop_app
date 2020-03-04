import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import OrdersScreen from "../screens/shop/OrdersScreen";
import CheckoutScreen from "../screens/shop/CheckoutScreen";
import StackScreenGlobalSettings from "../constants/StackScreenGlobalSettings";

const Stack = createStackNavigator();

const OrdersNavigator = props => (
	<Stack.Navigator screenOptions={StackScreenGlobalSettings}>
		<Stack.Screen
			name="OrdersScreen"
			options={{ title: "My Orders" }}
			component={OrdersScreen}
		/>
		<Stack.Screen
			name="CheckoutScreen"
			options={{ title: "Checkout" }}
			component={CheckoutScreen}
		/>
	</Stack.Navigator>
);

export default OrdersNavigator;
