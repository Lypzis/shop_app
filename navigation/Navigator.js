import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import ShopScreen from "../screens/shop/ShopScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen";
import CheckoutScreen from "../screens/shop/CheckoutScreen";

import EditProductScreen from "../screens/user/EditProductScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

const StackNavigatorOrders = props => (
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

const StackNavigatorEditProduct = props => (
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

const StackNavigatorShop = props => (
	<Stack.Navigator>
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

const DrawerNavigatorShop = props => (
	<Drawer.Navigator>
		<Drawer.Screen name="Shop" component={StackNavigatorShop} />
		<Drawer.Screen name="Orders" component={StackNavigatorOrders} />
		<Drawer.Screen
			name="MyProducts"
			options={{ title: "My Products" }}
			component={StackNavigatorEditProduct}
		/>
	</Drawer.Navigator>
);

export default DrawerNavigatorShop;
