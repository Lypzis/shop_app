import React from 'react';
import {
	View,
	StyleSheet,
	ScrollView,
	KeyboardAvoidingView,
	Button
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';

const AuthScreen = props => {
	props.navigation.setOptions({
		title: 'Authenticate'
	});

	return (
		<KeyboardAvoidingView
			behavior="padding"
			keyboardVerticalOffset={50}
			style={styles.screen}
		>
			<LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
				<View style={styles.container}>
					<ScrollView>
						<Input
							id="email"
							label="E-mail"
							keyboardType="email-address"
							required
							email
							autoCapitalize="none"
							errorMessage="Please enter a valid email address"
							onInputChange={() => {}}
							initialValue=""
						/>
						<Input
							id="password"
							label="Password"
							keyboardType="default"
							secureTextEntry
							required
							minLength={5}
							errorMessage="Please enter a valid password"
							onInputChange={() => {}}
							initialValue=""
						/>
						<View style={styles.buttonBox}>
							<Button title="Login" color={Colors.primary} onPress={() => {}} />
						</View>
						<View style={styles.buttonBox}>
							<Button
								title="Switch to Sign Up"
								color={Colors.secondary}
								onPress={() => {}}
							/>
						</View>
					</ScrollView>
				</View>
			</LinearGradient>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1
	},
	buttonBox: {
		marginTop: 10
	},
	gradient: {
		// background color, provided to the expo-linear-gradient component
		flex: 1, // height and width to 100%
		justifyContent: 'center'
	},
	container: {
		width: '80%',
		maxWidth: 400,
		maxHeight: 400,
		alignSelf: 'center',
		borderColor: '#ccc',
		padding: 20,
		marginHorizontal: 20,
		marginVertical: 15,
		borderRadius: 5,
		backgroundColor: '#fff',

		elevation: 3 // remember to make this ios compatible as well
	}
});

export default AuthScreen;
