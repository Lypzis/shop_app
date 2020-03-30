import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AuthScreen from '../screens/user/AuthScreen';
import StackScreenGlobalSettings from '../constants/StackScreenGlobalSettings';

const Stack = createStackNavigator();

const LoginNavigator = props => (
	<Stack.Navigator screenOptions={StackScreenGlobalSettings}>
		<Stack.Screen
			name="AuthScreen"
			options={{ title: 'Sign In' }}
			component={AuthScreen}
		/>
	</Stack.Navigator>
);

export default LoginNavigator;
