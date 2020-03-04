import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import ProductsNavigator from "./ProductsNavigator";
import OrdersNavigator from "./OrdersNavigator";
import ShopNavigator from "./ShopNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigatorShop = props => {
	return (
		<Drawer.Navigator>
			<Drawer.Screen name="Shop" component={ShopNavigator} />
			<Drawer.Screen name="Orders" component={OrdersNavigator} />
			<Drawer.Screen
				name="MyProducts"
				options={{ title: "My Products" }}
				component={ProductsNavigator}
			/>
		</Drawer.Navigator>
	);
};

export default DrawerNavigatorShop;
