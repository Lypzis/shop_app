import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';

import ProductsNavigator from './ProductsNavigator';
import OrdersNavigator from './OrdersNavigator';
import ShopNavigator from './ShopNavigator';

// REMEMBER: only this screen must appear if user is not authenticated
import LoginNavigator from './LoginNavigator';

import Colors from '../constants/Colors';

let authenticated = false;

const Drawer = createDrawerNavigator();

const DrawerNavigatorShop = props => {
	return (
		<Drawer.Navigator drawerContentOptions={{ activeTintColor: Colors.primary }}>
			{!authenticated ? (
				<Drawer.Screen
					name="Sign In"
					component={LoginNavigator}
					options={{
						drawerIcon: drawerConfig => (
							<Ionicons
								name={Platform.OS === 'android' ? 'md-unlock' : 'ios-unlock'}
								size={22}
								color={drawerConfig.color}
							/>
						)
					}}
				/>
			) : (
				<>
					<Drawer.Screen
						name="Shop"
						component={ShopNavigator}
						options={{
							drawerIcon: drawerConfig => (
								<Ionicons
									name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
									size={22}
									color={drawerConfig.color}
								/>
							)
						}}
					/>
					<Drawer.Screen
						name="Orders"
						component={OrdersNavigator}
						options={{
							drawerIcon: drawerConfig => (
								<Ionicons
									name={Platform.OS === 'android' ? 'md-list-box' : 'ios-list-box'}
									size={22}
									color={drawerConfig.color}
								/>
							)
						}}
					/>
					<Drawer.Screen
						name="MyProducts"
						component={ProductsNavigator}
						options={{
							title: 'My Products',
							drawerIcon: drawerConfig => (
								<Ionicons
									name={Platform.OS === 'android' ? 'md-pricetags' : 'ios-pricetags'}
									size={22}
									color={drawerConfig.color}
								/>
							)
						}}
					/>
				</>
			)}
		</Drawer.Navigator>
	);
};

export default DrawerNavigatorShop;
