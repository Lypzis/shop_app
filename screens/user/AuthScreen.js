import React, { useState, useReducer, useCallback } from 'react';
import {
	View,
	StyleSheet,
	ScrollView,
	KeyboardAvoidingView,
	Button
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import { signup, signin } from '../../store/actions/auth';

import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
	if (action.type === FORM_INPUT_UPDATE) {
		const updatedValues = {
			...state.inputValues,
			[action.input]: action.value
		};
		const updatedValidities = {
			...state.inputValidities,
			[action.input]: action.isValid
		};
		let updatedFormIsValid = true;

		// if at least one input is invalid, the entire form is invalid
		for (const key in updatedValidities) {
			updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
		}
		return {
			...state,
			inputValidities: updatedValidities,
			inputValues: updatedValues,
			formIsValid: updatedFormIsValid
		};
	}

	// in case of no action, which is unrealistic
	return state;
};

const AuthScreen = props => {
	const [isSignup, setIsSignup] = useState(false);

	props.navigation.setOptions({
		title: 'Authenticate'
	});

	const dispatch = useDispatch();

	const initialState = {
		inputValues: {
			email: '',
			password: ''
		},
		inputValidities: {
			email: false,
			password: false
		},
		formIsValid: false
	};

	const [formState, dispatchFormState] = useReducer(formReducer, initialState);

	const authHandler = async () => {
		try {
			let action;
			if (isSignup)
				action = signup(
					formState.inputValues.email,
					formState.inputValues.password
				);
			else
				action = signin(
					formState.inputValues.email,
					formState.inputValues.password
				);

			await dispatch(action);
		} catch (err) {
			throw err;
		}
	};

	const inputChangeHandler = useCallback(
		(inputIdentifier, inputValue, inputValidity) => {
			dispatchFormState({
				type: FORM_INPUT_UPDATE,
				value: inputValue,
				isValid: inputValidity,
				input: inputIdentifier
			});
		},
		[dispatchFormState]
	);

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
							errorText="Please enter a valid email address"
							onInputChange={inputChangeHandler}
							initialValue=""
						/>
						<Input
							id="password"
							label="Password"
							keyboardType="default"
							secureTextEntry
							required
							minLength={5}
							errorText="Please enter a valid password"
							onInputChange={inputChangeHandler}
							initialValue=""
						/>
						<View style={styles.buttonBox}>
							<Button
								title={isSignup ? 'Sign Up' : 'Sign In'}
								color={Colors.primary}
								onPress={authHandler}
							/>
						</View>
						<View style={styles.buttonBox}>
							<Button
								title={`Switch to ${isSignup ? 'Sign In' : 'Sign Up'}`}
								color={Colors.secondary}
								onPress={() => setIsSignup(prevState => !prevState)}
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
