import React from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { RectButton } from "react-native-gesture-handler";

import COLORS from "../constants/colors";

const WelcomeScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<StatusBar backgroundColor={COLORS.primary} style="light" />
			<View style={{ paddingTop: 35, paddingHorizontal: 20 }}>
				<RectButton
					style={{
						height: 55,
						backgroundColor: COLORS.primary,
						borderRadius: 3,
						alignItems: 'center',
						justifyContent: 'center',
						borderWidth: 1,
						borderColor: COLORS.primary
					}}
					onPress={() => navigation.navigate('LoginScreen')}
				>
					<Text style={{ fontSize: 16, color: COLORS.white }}>Sign in</Text>
				</RectButton>
				
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<View style={{ flex: 1, height: 1, backgroundColor: COLORS.lightGrey }} />
					<View style={{ marginVertical: 25 }}>
						<Text style={{ width: 50, textAlign: 'center', color: COLORS.grey }}>OR</Text>
					</View>
					<View style={{flex: 1, height: 1, backgroundColor: COLORS.lightGrey}} />
				</View>
				
				<View
					style={{
						overflow: 'hidden',
						borderRadius: 5,
						borderWidth: 1,
						borderColor: COLORS.lightGrey,
					}}
				>
					<RectButton
						style={{
							alignItems: 'center',
							justifyContent: 'center',
							height: 55,
							backgroundColor: COLORS.white,
						}}
						onPress={() => navigation.navigate('RegisterScreen')}
					>
						<Text style={{ fontSize: 16 }}>Create an account</Text>
					</RectButton>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default WelcomeScreen;
