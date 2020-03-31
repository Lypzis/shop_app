import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import ReduxThunk from 'redux-thunk';

import Navigator from './navigation/Navigator';
import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import orderReducer from './store/reducers/orders';
import authReducer from './store/reducers/auth';

enableScreens();

const rootReducer = combineReducers({
	products: productsReducer,
	cart: cartReducer,
	orders: orderReducer,
	auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk)); // redux-thunk enables asynchronous code in the redux store

const fetchFonts = () => {
	return Font.loadAsync({
		'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
		'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
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
