import React from "react";
import {
	Platform,
	TouchableOpacity,
	TouchableNativeFeedback,
	StyleSheet,
	View
} from "react-native";

const CustomButton = props => (
	<View>
		{Platform.OS === "android" && Platform.Version >= 21 ? (
			<TouchableNativeFeedback onPress={props.pressed}>
				{props.children}
			</TouchableNativeFeedback>
		) : (
			<TouchableOpacity onPress={props.pressed}>{props.children}</TouchableOpacity>
		)}
	</View>
);

const styles = StyleSheet.create({});

export default CustomButton;
