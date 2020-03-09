import { Platform } from "react-native";
import Colors from "./Colors";

export default {
	headerStyle: {
		backgroundColor: Platform.OS === "android" ? Colors.primary : "#fff"
	},
	headerTintColor: Platform.OS === "android" ? "#fff" : Colors.primary,
	headerTitleStyle: {
		fontFamily: "open-sans-bold"
	},
	// ios only
	headerBackTitleStyle: {
		fontFamily: "open-sans-bold"
	}
};
