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
					<Button
						title={props.leftButtonTitle}
						onPress={() => console.log("Left button clicked")}
					/>
				</View>
				<Text>{props.price}</Text>
				<View style={styles.buttonContainer}>
					<Button
						title={props.rightButtonTitle}
						onPress={() => console.log("Right button clicked")}
					/>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: 200,
		borderWidth: 3,
		borderColor: "#ccc"
	},
	image: {
		width: "100%",
		height: "80%"
	},
	buttonContainer: {
		width: "35%"
	},
	footerContainer: {
		width: "100%",
		height: "20%",
		flexDirection: "row",
		justifyContent: "space-between"
	}
});

export default ProductCart;
