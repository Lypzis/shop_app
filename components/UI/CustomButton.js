import React from 'react';
import {
	Platform,
	TouchableOpacity,
	TouchableNativeFeedback,
	StyleSheet,
	View
} from 'react-native';

import Colors from '../../constants/Colors';

const CustomButton = props => (
	<View>
		{Platform.OS === 'android' && Platform.Version >= 21 ? (
			<TouchableNativeFeedback onPress={props.pressed}>
				<View style={styles.button}>{props.children}</View>
			</TouchableNativeFeedback>
		) : (
			<TouchableOpacity onPress={props.pressed} activeOpacity={0.8}>
				<View style={styles.button}>{props.children}</View>
			</TouchableOpacity>
		)}
	</View>
);

const styles = StyleSheet.create({
	button: {
		backgroundColor: Colors.primary,
		paddingVertical: 3,
		paddingHorizontal: 14,
		borderRadius: 5,

		elevation: 5
	}
});

export default CustomButton;
