import React from "react";
import { View, StyleSheet } from "react-native";
import { useSharedValue } from "react-native-reanimated";

import { Card } from "./Test";

const cards = [
	{
		uri: 'https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/master/playground/src/Tarot/assets/chariot.png',
	},
	{
		uri: 'https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/master/playground/src/Tarot/assets/chariot.png',
	},
	{
		uri: 'https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/master/playground/src/Tarot/assets/chariot.png',
	},
	{
		uri: 'https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/master/playground/src/Tarot/assets/chariot.png',
	},
	{
		uri: 'https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/master/playground/src/Tarot/assets/chariot.png',
	},
	{
		uri: 'https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/master/playground/src/Tarot/assets/chariot.png',
	},
	{
		uri: 'https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/master/playground/src/Tarot/assets/chariot.png',
	},
	{
		uri: 'https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/master/playground/src/Tarot/assets/chariot.png',
	},
];

export const assets = cards.map((card) => card.source);

export const Tarot = () => {
	const shuffleBack = useSharedValue(false);
	return (
		<View style={styles.container}>
			{cards.map((card, index) => (
				<Card card={card} key={index} index={index} shuffleBack={shuffleBack} />
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "lightblue",
	},
});
