import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import OrdersScreen from "../screens/shop/OrdersScreen";
import CheckoutScreen from "../screens/shop/CheckoutScreen";

const Stack = createStackNavigator();

const OrdersNavigator = props => (
	<Stack.Navigator>
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
