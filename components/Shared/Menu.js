import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import COLORS from "../../constants/colors";

import { MaterialIcons } from '@expo/vector-icons';
import { RectButton } from "react-native-gesture-handler";
import { useTheme } from "@react-navigation/native";
import { Divider } from "react-native-paper";

const menu = [
	{
		title: 'Diner',
		data: [
			{
				label: 'Sauces',
				data: [
					{
						name: 'STK',
						description: null,
						price: 16
					},
					{
						name: 'STK Bold',
						description: null,
						price: 16
					},
					{
						name: 'Au Poivre',
						description: null,
						price: 16
					},
				]
			},
			{
				label: 'Sides',
				data: [
					{
						name: 'Yukon Gold Mashed Potatoes',
						description: 'parmesan crust',
						price: 16
					},
					{
						name: 'Tater Tots',
						description: null,
						price: 16
					},
				]
			},
		]
	},
	{
		title: 'Whine by the Bottle',
		data: [
			{
				label: 'Bubbles',
				data: [
					{
						name: 'Cavaliere d`Oro, Prosecco, IT',
						description: null,
						price: 80
					},
					{
						name: 'Chandon, Brut Rose, CA',
						description: null,
						price: 85
					},
					{
						name: 'Chandon, Brut, CA, NV',
						description: null,
						price: 85
					},
				]
			},
			{
				label: 'Test',
				data: [
					{
						name: 'Cavaliere d`Oro, Prosecco, IT',
						description: null,
						price: 80
					},
					{
						name: 'Chandon, Brut Rose, CA',
						description: null,
						price: 85
					},
					{
						name: 'Chandon, Brut, CA, NV',
						description: null,
						price: 85
					},
				]
			}
		],
	},
];

const Menu = () => {
	const [activeSections, setActiveSections] = useState([]);
	const { colors } = useTheme();
	
	const _renderHeader = (section, index, isActive) => {
		return (
			<View>
				<View style={styles.header}>
					<Text style={styles.headerText}>{section.title}</Text>
					<MaterialIcons
						name="keyboard-arrow-down"
						size={24} color={COLORS.primary}
						style={isActive && { transform: [{ rotate: '180deg' }] }}
					/>
				</View>
				<Divider />
			</View>
		);
	};
	
	const _renderContent = ({ data }) => {
		return (
			<View style={styles.content}>
				{data.map((item) => (
					<View key={item.label}>
						<View style={[styles.label, { backgroundColor: colors.menuLabel }]}>
							<Text style={{ color: colors.text }}>{item.label}</Text>
						</View>
						{item.data.map(({ name, description, price }, index) => (
							<View key={[name, index].join()}>
								<View style={styles.menuItem}>
									<View>
										<Text style={{ color: colors.text }}>{name}</Text>
										{description && (
											<Text style={styles.description}>
												{description}
											</Text>
										)}
									</View>
									<Text style={{ color: colors.text }}>{`$${price}`}</Text>
								</View>
								<Divider />
							</View>
						))}
					</View>
				))}
			</View>
		);
	};
	
	const _updateSections = (activeSections) => {
		setActiveSections(activeSections);
	};
	
	return (
		<SafeAreaView>
			<Accordion
				sections={menu}
				keyExtractor={(item) => item.title}
				activeSections={activeSections}
				renderHeader={_renderHeader}
				renderContent={_renderContent}
				onChange={_updateSections}
				touchableComponent={RectButton}
				renderAsFlatList
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	description: {
		color: COLORS.grey
	},
	menuItem: {
		padding: 20,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	label: {
		height: 60,
		alignItems: "center",
		justifyContent: "center",
		borderColor: COLORS.grey,
		borderBottomWidth: 1,
		borderTopWidth: 1,
	},
	header: {
		flexDirection: "row",
		alignItems: 'center',
		justifyContent: "space-between",
		height: 50,
		paddingHorizontal: 20,
	},
	headerText: {
		color: COLORS.primary
	},
	item: {
		backgroundColor: 'white',
		flexDirection: 'row',
		alignItems: 'center',
		padding: 8,
	},
	avatar: {
		height: 36,
		width: 36,
		borderRadius: 18,
		backgroundColor: '#e91e63',
		alignItems: 'center',
		justifyContent: 'center',
	},
	letter: {
		color: 'white',
		fontWeight: 'bold',
	},
	details: {
		margin: 8,
	},
	name: {
		fontWeight: 'bold',
		fontSize: 14,
		color: 'black',
	},
	number: {
		fontSize: 12,
		color: '#999',
	},
	separator: {
		height: StyleSheet.hairlineWidth,
		backgroundColor: 'rgba(0, 0, 0, .08)',
	},
});

export default Menu;
