import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import EditProductScreen from "../screens/user/EditProductScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";

const Stack = createStackNavigator();

const ProductsNavigator = props => (
	<Stack.Navigator>
		<Stack.Screen
			name="MyProductsScreen"
			options={{ title: "My Products" }}
			component={UserProductsScreen}
		/>
		<Stack.Screen
			name="EditProductScreen"
			options={{ title: "Edit Product" }}
			component={EditProductScreen}
		/>
	</Stack.Navigator>
);
export default ProductsNavigator;
