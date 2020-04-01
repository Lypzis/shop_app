import React, { useEffect, useState, useCallback } from 'react';
//import AsyncStorage from '@react-native-community/async-storage'; // Needs Ejection :D
import { useSelector, useDispatch } from 'react-redux';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';

import ProductsNavigator from './ProductsNavigator';
import OrdersNavigator from './OrdersNavigator';
import ShopNavigator from './ShopNavigator';

// REMEMBER: only this screen must appear if user is not authenticated
import LoginNavigator from './LoginNavigator';

import Colors from '../constants/Colors';

const Drawer = createDrawerNavigator();

const DrawerNavigatorShop = props => {
	// get token from reducer
	let authenticated = useSelector(
		state => state.auth.idToken,
		() => false
	);

	// // will only work after ejection, AsyncStorage needs linking
	// const [isLoading, setIsLoading] = useState(false);
	// const [authenticated, setAuthenticated] = useState(false);

	// useEffect(() => {
	// 	tryLogin();
	// }, [tryLogin]);

	// const tryLogin = useCallback(async () => {
	// 	setIsLoading(true);
	// 	try {
	// 		const userData = await AsyncStorage.getItem('userData');

	// 		// if userData does not exist
	// 		if (!userData) {
	// 			setIsLoading(false);
	// 			setAuthenticated(false);
	// 			return;
	// 		}

	// 		//else
	// 		const transformedData = JSON.parse(userData);

	// 		const { token, userId, expiryDate } = transformedData;

	// 		const expirationDate = new Date(expiryDate);

	// 		// verify if token is still valid
	// 		if (expirationDate <= new Date() || !token || !userId) {
	// 			setIsLoading(false);
	// 			setAuthenticated(false);
	// 			return;
	// 		}

	// 		setIsLoading(false);
	// 		setAuthenticated(true);
	// 		and log the user in with useDispatch authenticate in auth.js
	// 	} catch (err) {
	// 		setIsLoading(false);
	// 		throw err;
	// 	}
	// }, [setAuthenticated]);

	// if (isLoading) return <Loading size="large" color={Colors.primary} />;

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
