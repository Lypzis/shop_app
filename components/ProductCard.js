import React from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";

const ProductCart = props => {
	return (
		// image
		// detailbutton price cart

		<View style={styles.container}>
			<Text>{props.title}</Text>
			<Image source={{ uri: props.source }} style={styles.image} />
			<View style={styles.footerContainer}>
				<View style={styles.buttonContainer}>
					<Button title={props.leftButtonTitle} onPress={props.leftButtonFunction} />
				</View>
				<Text>${props.price}</Text>
				<View style={styles.buttonContainer}>
					<Button
						title={props.rightButtonTitle}
						onPress={props.rightButtonFunction}
					/>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "90%",
		height: 300,
		borderColor: "#ccc",
		justifyContent: "space-between",
		padding: 20,
		margin: 20,
		borderRadius: 4,

		elevation: 3 // remember to make this ios compatible as well
	},
	image: {
		width: "100%",
		height: "80%",
		borderRadius: 4
	},
	buttonContainer: {
		width: "35%"
	},
	footerContainer: {
		width: "100%",
		height: "20%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	}
});

export default ProductCart;
