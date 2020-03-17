import React, { useReducer, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
	switch (action.type) {
		case INPUT_CHANGE:
			return { ...state, value: action.value, isValid: action.isValid };
		case INPUT_BLUR:
			return { ...state, touched: true };
		default:
			return state;
	}
};

const Input = props => {
	const [inputState, dispatch] = useReducer(inputReducer, {
		value: props.initialValue ? props.initialValue : '',
		isValid: props.initiallyValid,
		touched: false
	});

	//const { onInputChange } = props;

	// useEffect(() => {
	// 	if (inputState.touched)
	// 		// only fire if touched is true, instead of in every keystroke
	// 		onInputChange(inputState.value, inputState.isValid); // forwards my input state, which contains the properties of this input
	// }, [inputState, onInputChange]);

	const lostFocusHandler = () => {
		dispatch({ type: INPUT_BLUR });
	};

	const textChangeHandler = text => {
		const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		let isValid = true;
		if (props.required && text.trim().length === 0) {
			isValid = false;
		}
		if (props.email && !emailRegex.test(text.toLowerCase())) {
			isValid = false;
		}
		if (props.min != null && +text < props.min) {
			isValid = false;
		}
		if (props.max != null && +text > props.max) {
			isValid = false;
		}
		if (props.minLength != null && text.length < props.minLength) {
			isValid = false;
		}

		dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
	};

	return (
		<View style={styles.inputBox}>
			<Text style={styles.label}>{props.label}:</Text>
			<TextInput
				{...props}
				style={styles.input}
				value={props.value}
				onChangeText={props.changeValue} // //textChangeHandler
				onBlur={lostFocusHandler}
			/>
		</View>

		// perhaps show an specific error here in case of invalidity and touched. props.errorTexts
	);
};

const styles = StyleSheet.create({
	inputBox: {
		marginBottom: 12
	},
	label: {
		fontFamily: 'open-sans',
		marginVertical: 8,
		marginRight: 5
	},
	input: {
		paddingHorizontal: 10,
		paddingVertical: 2,
		borderColor: '#ccc',
		borderBottomWidth: 2
	}
});

export default Input;
