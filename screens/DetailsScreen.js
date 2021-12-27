import React from 'react';
import {
	ImageBackground, SafeAreaView, StyleSheet, View,
} from 'react-native';
import COLORS from '../constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Overview from "../components/Shared/Overview";
import Menu from "../components/Shared/Menu";
import Reviews from "../components/Shared/Reviews";
import NoImage from "../assets/images/placeholder-image.png";
import { useTranslation } from "react-i18next";

const Tab = createMaterialTopTabNavigator();

const DetailsScreen = ({ navigation, route }) => {
	const restaurant = route.params;
	const { t } = useTranslation();
	const { colors } = useTheme();

	return (
		<SafeAreaView style={style.container}>
			<View style={style.header}>
				<MaterialIcons name="arrow-back" size={28} color={COLORS.white} onPress={navigation.goBack} />
				<MaterialIcons name="bookmark-border" size={28} color={COLORS.primary} />
			</View>
			<ImageBackground style={style.headerImage} source={restaurant.image ? { uri: restaurant.image} : NoImage} />
			<Tab.Navigator
				initialRouteName={t('overview')}
				screenOptions={{
					tabBarStyle: {
						backgroundColor: colors.background
					}
				}}
			>
				<Tab.Screen name={t('overview')}>
					{(props) => <Overview {...props} data={restaurant} />}
				</Tab.Screen>
				<Tab.Screen name={t('menu')}>
					{(props) => <Menu {...props} />}
				</Tab.Screen>
				<Tab.Screen name={t('Reviews')}>
					{(props) => <Reviews {...props} />}
				</Tab.Screen>
			</Tab.Navigator>
		</SafeAreaView>
	);
};

const style = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.white,
	},
	btn: {
		height: 55,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 40,
		backgroundColor: COLORS.primary,
		marginHorizontal: 20,
		borderRadius: 10,
	},
	priceTag: {
		height: 40,
		alignItems: 'center',
		marginLeft: 40,
		paddingLeft: 20,
		flex: 1,
		backgroundColor: COLORS.secondary,
		borderTopLeftRadius: 20,
		borderBottomLeftRadius: 20,
		flexDirection: 'row',
	},
	iconContainer: {
		position: 'absolute',
		height: 60,
		width: 60,
		backgroundColor: COLORS.primary,
		top: -30,
		right: 20,
		borderRadius: 30,
		justifyContent: 'center',
		alignItems: 'center',
	},
	headerImage: {
		height: 210,
		overflow: 'hidden',
	},
	header: {
		position: 'absolute',
		top: 50,
		left: 0,
		right: 0,
		zIndex: 9,
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: 20,
		justifyContent: 'space-between',
	},
});

export default DetailsScreen;
