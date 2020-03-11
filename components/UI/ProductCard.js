import React from 'react';
import {
	View,
	Text,
	Button,
	StyleSheet,
	Image,
	TouchableOpacity,
	TouchableNativeFeedback,
	Platform
} from 'react-native';

import Colors from '../../constants/Colors';

const ProductCart = props => {
	let TouchableComp = TouchableOpacity;

	if (Platform.OS === 'android' && Platform.Version >= 21)
		TouchableComp = TouchableNativeFeedback;

	return (
		// now when the item is clicked, it will
		// also trigger the "leftButtonFunction"

		<TouchableComp activeOpacity={0.8} onPress={props.leftButtonFunction}>
			<View style={styles.container}>
				<View style={styles.bodyContainer}></View>
				<Image source={{ uri: props.source }} style={styles.image} />
				<Text style={styles.title}>{props.title}</Text>
				<View style={styles.footerContainer}>
					<View style={styles.buttonContainer}>
						<Button
							title={props.leftButtonTitle}
							color={Colors.primary}
							onPress={props.leftButtonFunction}
						/>
					</View>
					<Text style={styles.price}>${props.price}</Text>
					<View style={styles.buttonContainer}>
						<Button
							color={Colors.primary}
							title={props.rightButtonTitle}
							onPress={props.rightButtonFunction}
						/>
					</View>
				</View>
			</View>
		</TouchableComp>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '90%',
		height: 300,
		borderColor: '#ccc',
		justifyContent: 'space-between',
		padding: 20,
		paddingBottom: 60,
		marginHorizontal: 20,
		marginVertical: 15,
		borderRadius: 5,
		backgroundColor: '#fff',

		elevation: 3 // remember to make this ios compatible as well
	},
	image: {
		width: '100%',
		height: '80%',
		borderRadius: 5
	},
	buttonContainer: {
		width: '35%'
	},
	footerContainer: {
		width: '100%',
		height: '20%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	title: {
		textAlign: 'center',
		fontSize: 18,
		marginVertical: 10,
		fontFamily: 'open-sans-bold'
	},
	price: {
		fontSize: 14,
		color: '#888',
		fontFamily: 'open-sans'
	}
});

export default ProductCart;
