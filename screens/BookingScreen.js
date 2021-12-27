import React, { useEffect } from 'react';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View, } from 'react-native';
import { Divider, List, TextInput } from 'react-native-paper';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import NumericInput from 'react-native-numeric-input';
import COLORS from "../constants/colors";
import firebase from "firebase";
import DateTimePicker from "../components/DateTimePicker";
import { Picker } from "@react-native-picker/picker";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";
import Moment from 'moment';
import ProgressSteps from "../components/ProgressSteps";
import ProgressStep from "../components/ProgressStep";
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { Table } from "../components/Table";
import ViewCart from "../components/ViewCart";

const { height } = Dimensions.get('window');

const BookingScreen = ({ navigation, route }) => {
	const restaurant = route.params;
	const { t } = useTranslation();
	const { colors } = useTheme();
	const user = useSelector(({ user }) => user.currentUser);
	const date = new Date();
	
	const { setFieldValue, handleSubmit, values } = useFormik({
		initialValues: {
			date: date,
			time: Moment(date).format('hh:mm'),
			party_size: 2,
			wishes: '',
			restaurant_id: restaurant.id,
			restaurant_name: restaurant.name,
			restaurant_photo: restaurant.photos ? restaurant.photos[0] : null,
			user_id: user.id,
			user_first_name: user.firstName,
			user_last_name: user.lastName,
			user_phone: user.phone,
			user_email: user.email,
			table_id: null,
			menu: {},
		},
		onSubmit: (values) => {
			firebase
				.firestore()
				.collection('reservations')
				.add({
					...values,
					createdAt: firebase.firestore.FieldValue.serverTimestamp(),
				})
				.then((res) => {
					navigation.navigate('OrderCompleted', values);
				});
		},
	});

	useEffect(() => {
		navigation.setOptions({
			title: restaurant.name,
		});
	}, [navigation]);
	
	const SECTIONS = [
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
	
	const translateX = useSharedValue(-300);
	const translateY = useSharedValue(-300);
	const scale = useSharedValue(0.6);
	
	const panHandler = useAnimatedGestureHandler({
		onStart: (event, context) => {
			context.translateX = translateX.value;
			context.translateY = translateY.value;
		},
		onActive: (event, context) => {
			translateX.value = event.translationX + context.translateX;
			translateY.value = event.translationY + context.translateY;
		},
	});
	
	const tStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateX: translateX.value, },
				{ translateY: translateY.value, },
				{ scale: scale.value, },
			],
		};
	});
	
	const partySizeItems = () => {
		const items = [];
		
		for (let i = 1; i <= 20; i++) {
			items.push((
				<Picker.Item key={`partySizeItem_${i}`} label={i.toString()} value={i} />
			))
		}
		
	  return items;
	}
	
	const [expandedId, setExpandedId] = React.useState(undefined);
	
	const _onAccordionPress = (newExpandedId) => {
		setExpandedId(expandedId === newExpandedId ? undefined : newExpandedId);
	};
	
	return (
		<SafeAreaView style={styles.container}>
			<ProgressSteps>
				<ProgressStep label="First Step" scrollable={false}>
					<View style={{ paddingHorizontal: 15 }}>
						<View style={styles.action}>
							<View style={styles.icon}>
								<FontAwesome name="calendar" size={20} color={COLORS.primary} />
							</View>
							<DateTimePicker mode="date" onChange={(date) => setFieldValue('date', date)} />
						</View>
						<View style={styles.action}>
							<View style={styles.icon}>
								<Ionicons name="ios-time-outline" size={24} color={COLORS.primary} />
							</View>
							<DateTimePicker mode="time" onChange={(time) => setFieldValue('time', time)} />
						</View>
						<View style={styles.action}>
							<View style={styles.icon}>
								<FontAwesome name="users" size={20} color={COLORS.primary} />
							</View>
							<View style={styles.textInputWrap}>
								<Picker
									selectedValue={values.party_size}
									onValueChange={(value) => setFieldValue('party_size', value)}
									mode="dialog"
									style={styles.picker}
								>
									{partySizeItems()}
								</Picker>
							</View>
						</View>
						<View style={[styles.action, { alignItems: "flex-start" }]}>
							<View style={styles.icon}>
								<FontAwesome name="commenting-o" size={22} color={COLORS.primary} style={{ paddingTop: 18 }} />
							</View>
							<TextInput
								multiline
								numberOfLines={4}
								onChangeText={(text) => setFieldValue('wishes', text)}
								value={values.wishes}
								placeholder="Wishes"
								style={{ backgroundColor: 'transparent', flex: 1, marginLeft: 10 }}
							/>
						</View>
					</View>
				</ProgressStep>
				<ProgressStep label="Second Step" scrollable={false}>
					<View style={{ flex: 1 }}>
						<PanGestureHandler onGestureEvent={panHandler}>
							<Animated.View style={[{ width: 1500, height: 1500 }, tStyle]}>
								<Table
									selected={values.table_id}
									partySize={values.party_size}
									onSelect={(id) => setFieldValue('table_id', values.table_id === id ? null : id)}
								/>
							</Animated.View>
						</PanGestureHandler>
					</View>
				</ProgressStep>
				<ProgressStep label="Third Step" onSubmit={handleSubmit} finishBtnText={t('order')}>
					<View style={{ minHeight: height }}>
						<ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
							<List.AccordionGroup
								expandedId={expandedId}
								onAccordionPress={_onAccordionPress}
							>
								{SECTIONS.map(({ data, title}, index) => (
									<View key={title}>
										<List.Accordion
											title={title}
											id={title}
										>
											{data.map((item, index) => (
												<View key={[item.label, index].join()}>
													<Divider />
													<List.Item title={item.label} />
													{item.data.map(({ name, description, price }) => (
														<View key={[name, index].join()}>
															<Divider />
															<List.Item
																title={name}
																description={description}
																right={() => (
																	<View
																		style={{
																			flexDirection: 'row',
																			alignItems: 'center',
																			paddingRight: 10
																		}}
																	>
																		<Text style={{ color: colors.text,  marginRight: 10 }}>${price}</Text>
																		<NumericInput
																			onChange={value => {
																				const tempData = { ...values.menu, [name]: { count: value, price }};
																				
																				if (value === 0) {
																					delete tempData[name];
																				}
																				
																				setFieldValue('menu', tempData)
																			}}
																			rightButtonBackgroundColor={COLORS.primary}
																			leftButtonBackgroundColor={COLORS.primary}
																			borderColor={COLORS.primary}
																			totalWidth={95}
																			iconStyle={{ color: '#ffffff' }}
																			minValue={0}
																			containerStyle={{ borderRadius: 10 }}
																			textColor={colors.text}
																			rounded
																		/>
																	</View>
																)}
															/>
														</View>
													))}
												</View>
											))}
										</List.Accordion>
										<Divider />
									</View>
								))}
							</List.AccordionGroup>
						</ScrollView>
						<ViewCart data={values.menu} />
					</View>
				</ProgressStep>
			</ProgressSteps>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	btn: {
		height: 55,
		flex: 1,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: COLORS.primary,
		marginHorizontal: 20,
		borderRadius: 10,
	},
	picker: {
		paddingHorizontal: 20,
		paddingVertical: 20,
		margin: 0,
		height: 50
	},
	icon: {
		width: 30,
		height: 30,
		justifyContent: "center",
		alignItems: "center"
	},
	container: {
		flex: 1,
	},
	commandButton: {
		padding: 15,
		borderRadius: 10,
		backgroundColor: '#FF6347',
		alignItems: 'center',
		marginTop: 10,
	},
	panel: {
		padding: 20,
		backgroundColor: '#FFFFFF',
		paddingTop: 20,
	},
	header: {
		backgroundColor: '#FFFFFF',
		shadowColor: '#333333',
		shadowOffset: { width: -1, height: -3 },
		shadowRadius: 2,
		shadowOpacity: 0.4,
		paddingTop: 20,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	panelHeader: {
		alignItems: 'center',
	},
	panelHandle: {
		width: 40,
		height: 8,
		borderRadius: 4,
		backgroundColor: '#00000040',
		marginBottom: 10,
	},
	panelTitle: {
		fontSize: 27,
		height: 35,
	},
	panelSubtitle: {
		fontSize: 14,
		color: 'gray',
		height: 30,
		marginBottom: 10,
	},
	panelButton: {
		padding: 13,
		borderRadius: 10,
		backgroundColor: '#FF6347',
		alignItems: 'center',
		marginVertical: 7,
	},
	panelButtonTitle: {
		fontSize: 17,
		fontWeight: 'bold',
		color: 'white',
	},
	action: {
		flexDirection: 'row',
		alignItems: "center",
		// justifyContent: "center",
		marginTop: 10,
		marginBottom: 10,
		paddingBottom: 5,
	},
	actionError: {
		flexDirection: 'row',
		marginTop: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#FF0000',
		paddingBottom: 5,
	},
	textInputWrap: {
		flex: 1,
		marginLeft: 10,
		borderBottomWidth: 1,
		borderBottomColor: COLORS.lightGrey,
		height: 50
	},
	textInput: {
		// marginTop: Platform.OS === 'ios' ? 0 : -12,
		paddingLeft: 10,
		paddingVertical: 10,
		color: '#05375a',
	},
});

export default BookingScreen;
