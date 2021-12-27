import React from 'react';
import {
	View,
	Image,
	Text,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import {
	HomeScreen,
	UserScreen,
	MapScreen,
	SavedRestaurantsScreen
} from '../screens';

import { icons } from '../constants';
import COLORS from '../constants/colors';
import HistoryScreen from "../screens/HistoryScreen";

const inactiveTabColor = COLORS.grey;
const Tab = createBottomTabNavigator();

const Tabs = () => {
	const { t } = useTranslation();
	
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarStyle: {
					height: 55,
					alignItems: 'center',
					paddingVertical: 5
				}
			}}
		>
			<Tab.Screen
				name="HomeScreen"
				component={HomeScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<View style={{ alignItems: 'center', justifyContent: 'center' }}>
							<Image
								source={icons.cutlery}
								resizeMode="contain"
								style={{
									width: 16,
									height: 16,
									tintColor: focused ? COLORS.primary : inactiveTabColor
								}}
							/>
							<Text style={{
								color: focused ? COLORS.primary : inactiveTabColor,
								fontSize: 12,
								marginTop: 4
							}}>
								{t('home')}
							</Text>
						</View>
					),
				}}
			/>
   
			<Tab.Screen
				name="Map"
				component={MapScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<View style={{ alignItems: 'center', justifyContent: 'center' }}>
							<FontAwesome5 name="map" size={16} color={focused ? COLORS.primary : inactiveTabColor} />
							<Text style={{ color: focused ? COLORS.primary : inactiveTabColor, fontSize: 12, marginTop: 4 }}>
								{t('map')}
							</Text>
						</View>
					),
				}}
			/>
   
			<Tab.Screen
				name={t('saved')}
				component={SavedRestaurantsScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<View style={{ alignItems: 'center', justifyContent: 'center' }}>
							<FontAwesome5 name="bookmark" size={16} color={focused ? COLORS.primary : inactiveTabColor} />
							<Text style={{ color: focused ? COLORS.primary : inactiveTabColor, fontSize: 12, marginTop: 4 }}>
								{t('saved')}
							</Text>
						</View>
					),
					headerShown: true
				}}
			/>
			
			<Tab.Screen
				name={t('history')}
				component={HistoryScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<View style={{ alignItems: 'center', justifyContent: 'center' }}>
							<FontAwesome name="history" size={16} color={focused ? COLORS.primary : inactiveTabColor} />
							<Text style={{ color: focused ? COLORS.primary : inactiveTabColor, fontSize: 12, marginTop: 4 }}>
								{t('history')}
							</Text>
						</View>
					),
					headerShown: true
				}}
			/>

			<Tab.Screen
				name="User"
				component={UserScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<View style={{ alignItems: 'center', justifyContent: 'center' }}>
							<FontAwesome name="user-o" size={16} color={focused ? COLORS.primary : inactiveTabColor} />
							<Text style={{ color: focused ? COLORS.primary : inactiveTabColor, fontSize: 12, marginTop: 4 }}>
								{t('user')}
							</Text>
						</View>
					),
				}}
			/>
		</Tab.Navigator>
	);
};

export default Tabs;
