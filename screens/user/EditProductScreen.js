import React from "react";
import { View, Text, StyleSheet } from "react-native";

const EditProductScreen = props => {
	return (
		<View style={styles.screen}>
			<Text>The Edit Product Screen!</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	}
});

export default EditProductScreen;
