import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Loading = props => (
	<View style={styles.loading}>
		<ActivityIndicator size={props.size} color={props.color} />
	</View>
);

const styles = StyleSheet.create({
	loading: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});

export default Loading;
