import React, { useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView, Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import { useTheme } from "@react-navigation/native";
import COLORS from "../constants/colors";

const { height } = Dimensions.get('window');

const wait = (timeout) => {
	return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function OrderCompleted({ navigation, route }) {
	const data = route.params;
	const { colors } = useTheme();
	
	useEffect(() => {
		wait(10000).then(() => navigation.navigate('HomeScreen'));
	}, []);
	
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
			<View
				style={{
					margin: 15,
					paddingTop: 200,
					alignItems: "center",
					height,
				}}
			>
				<LottieView
					style={{ height: 100, alignSelf: "center", marginBottom: 30 }}
					source={require("../assets/animations/check-mark.json")}
					autoPlay
					speed={0.5}
					loop={false}
				/>
				<Text style={{ fontSize: 20, fontWeight: "bold", textAlign: 'center', color: colors.text }}>
					Your order at <Text style={{ color: COLORS.primary }}>{data.restaurant_name}</Text> has been placed
				</Text>
				<ScrollView>
					<LottieView
						style={{ height: 200, alignSelf: "center" }}
						source={require("../assets/animations/cooking.json")}
						autoPlay
						speed={0.5}
					/>
				</ScrollView>
			</View>
		</SafeAreaView>
	);
}
