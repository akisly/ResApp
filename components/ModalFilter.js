import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	FlatList,
} from "react-native";
import COLORS from "../constants/colors";
import { Button, Checkbox, Dialog, Portal } from 'react-native-paper';
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import * as Localization from 'expo-localization';

const { width, height } = Dimensions.get("window");

const ModalFilter = () => {
	const [priceVisible, setPriceVisible] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedCuisines, setSelectedCuisines] = useState(['allCuisines']);
	const [selectedPrice, setSelectedPrice] = useState(['all']);
	const { colors } = useTheme();
	const currency = Localization.currency;
	
	const currencySign = [
		{
			currency: 'RUB',
			sign: '₽'
		},
		{
			currency: 'USD',
			sign: '$'
		},
		{
			currency: 'UAH',
			sign: '₴'
		},
	];
	
	const cuisines = [
		'allCuisines', 'fusion', 'vegan', 'vegetarian', 'brazilian', 'british', 'german', 'italian', 'ukrainian', 'european', 'asian',
		'oceanian', 'french', 'bistro', 'american'
	];
	
	const generatePriceRange = () => {
		const { sign } = currencySign.find((item) => item.currency === currency);
		
		return ['all', `${sign}${sign}`, `${sign}${sign}${sign}`, `${sign}${sign}${sign}${sign}`];
	};
	
	return (
		<View>
			<RectButton
				style={{
					flexDirection: "row",
					alignItems: "center",
					paddingHorizontal: 15,
					paddingVertical: 10
				}}
				onPress={() => setPriceVisible(true)}
			>
				<FontAwesome5 name="money-bill-alt" size={18} color={COLORS.primary} />
				<Text style={{ color: colors.text, marginLeft: 10, fontSize: 16 }}>
					Price
				</Text>
				<Text style={{ color: COLORS.grey, marginLeft: 5, fontSize: 16 }}>
					({selectedCuisines.includes('allCuisines') ? 'All' : selectedCuisines.length})
				</Text>
			</RectButton>
			<Portal>
				<Dialog
					style={{ padding: 0, maxHeight: height - 40 }}
					visible={priceVisible}
					onDismiss={() => setPriceVisible(false)}
				>
					<Dialog.Title style={{ padding: 0 }}>
						Price
					</Dialog.Title>
					<Dialog.ScrollArea style={{ paddingHorizontal: 0 }}>
						<FlatList
							data={generatePriceRange()}
							keyExtractor={(item) => item}
							renderItem={({ item, index}) => (
								<Checkbox.Item
									label={item}
									mode="ios"
									status={selectedCuisines.includes(item) ? 'checked' : 'unchecked'}
									onPress={() => {
										let tempCuisines = [...selectedCuisines];
										
										if (item === 'allCuisines' || tempCuisines.length === 0) {
											tempCuisines = ['allCuisines'];
										} else if (tempCuisines.includes(item)) {
											tempCuisines = tempCuisines.filter((cuisine) => item !== cuisine)
										} else {
											tempCuisines = tempCuisines.filter((cuisine) => cuisine !== 'allCuisines')
											tempCuisines.push(item);
										}
										
										setSelectedCuisines(tempCuisines);
									}}
								/>
							)}
						/>
					</Dialog.ScrollArea>
					<Dialog.Actions>
						<Button
							onPress={() => setSelectedCuisines(['allCuisines'])}
							disabled={selectedCuisines.includes('allCuisines')}
						>
							clear all
						</Button>
						<Button onPress={() => setPriceVisible(false)}>
							apply
						</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
			<RectButton
				style={{
					flexDirection: "row",
					alignItems: "center",
					paddingHorizontal: 15,
					paddingVertical: 10
				}}
				onPress={() => setModalVisible(true)}
			>
				<MaterialCommunityIcons name="food-variant" size={22} color={COLORS.primary} />
				<Text style={{ color: colors.text, marginLeft: 10, fontSize: 16 }}>
					Cuisines
				</Text>
				<Text style={{ color: COLORS.grey, marginLeft: 5, fontSize: 16 }}>
					({selectedCuisines.includes('allCuisines') ? 'All' : selectedCuisines.length})
				</Text>
			</RectButton>
			<Portal>
				<Dialog
					style={{ padding: 0, maxHeight: height - 40 }}
					visible={modalVisible}
					onDismiss={() => setModalVisible(false)}
				>
					<Dialog.Title style={{ padding: 0 }}>
						Cuisines
					</Dialog.Title>
					<Dialog.ScrollArea style={{ paddingHorizontal: 0 }}>
						<FlatList
							data={cuisines}
							keyExtractor={(item) => item}
							renderItem={({ item, index}) => (
								<Checkbox.Item
									label={item}
									mode="ios"
									status={selectedCuisines.includes(item) ? 'checked' : 'unchecked'}
									onPress={() => {
										let tempCuisines = [...selectedCuisines];
										
										if (item === 'allCuisines' || tempCuisines.length === 0) {
											tempCuisines = ['allCuisines'];
										} else if (tempCuisines.includes(item)) {
											tempCuisines = tempCuisines.filter((cuisine) => item !== cuisine)
										} else {
											tempCuisines = tempCuisines.filter((cuisine) => cuisine !== 'allCuisines')
											tempCuisines.push(item);
										}
										
										setSelectedCuisines(tempCuisines);
									}}
								/>
							)}
						/>
					</Dialog.ScrollArea>
					<Dialog.Actions>
						<Button
							onPress={() => setSelectedCuisines(['allCuisines'])}
							disabled={selectedCuisines.includes('allCuisines')}
						>
							clear all
						</Button>
						<Button onPress={() => setModalVisible(false)}>
							apply
						</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
		</View>
	);
};

const styles = StyleSheet.create({
	modalOverlay: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: 'rgba(0,0,0,0.5)'
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: '#000000aa'
	},
	modalTitle: {
		padding: 25,
		textAlign: "left",
		borderBottomWidth: 1,
		borderBottomColor: COLORS.lightGrey
	},
	modalText: {
		fontSize: 20
	},
	modalBottom: {
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
		paddingVertical: 5,
		paddingHorizontal: 4,
		borderTopWidth: 1,
		borderTopColor: COLORS.lightGrey,
	},
	modalView: {
		margin: 20,
		marginTop: 50,
		backgroundColor: "#fff",
		borderRadius: 3,
		// padding: 35,
		// alignItems: "center",
		shadowColor: "#000",
		width: width - 50,
		maxHeight: height - 30,
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2
	},
	buttonOpen: {
		backgroundColor: "#F194FF",
	},
	buttonClose: {
		backgroundColor: "#2196F3",
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center"
	},
});

export default ModalFilter;
