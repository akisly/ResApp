import React from 'react';
import { Rating } from 'react-native-ratings';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking, Platform, Image, Dimensions } from 'react-native';
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, Octicons } from '@expo/vector-icons';
import COLORS from "../../constants/colors";
import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";
const { width } = Dimensions.get("window");

const Overview = ({ navigation, data }) => {
	const { t } = useTranslation();
	const { colors } = useTheme();
	
	const renderOrder = () => {
		return (
			<View
				style={[styles.order, { backgroundColor: colors.background, }]}
			>
				<View
					style={{ alignItems: 'center', justifyContent: 'center' }}
				>
					<TouchableOpacity
						style={styles.btn}
						onPress={() => navigation.navigate('BookingScreen', data)}
					>
						<Text style={{ color: COLORS.white, fontSize: 18, fontWeight: 'bold' }}>
							{t('bookNow')}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
	
	const rating = ((5 * 65 + 4 * 35 + 3 * 25 + 2 * 15 + 5) / 145).toFixed(1);
	const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	
	return (
		<>
			<ScrollView
				style={styles.container}
				contentContainerStyle={{ paddingBottom: 85, backgroundColor: colors.menuLabel }}
				showsVerticalScrollIndicator={false}
			>
				<View style={{
					paddingVertical: 15,
					paddingHorizontal: 20,
					backgroundColor: colors.background,
					marginBottom: 10
				}}>
					<Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.text }}>
						{data.name}
					</Text>
				</View>
				<View style={{
					paddingVertical: 15,
					paddingHorizontal: 20,
					backgroundColor: colors.background,
					marginBottom: 10
				}}>
					<Text style={{ fontSize: 16, paddingBottom: 5, color: colors.text }}>
						{t('aboutRes')}
					</Text>
					<View style={{ flexDirection: 'row', alignItems: "center", paddingVertical: 10 }}>
						<View style={{
							width: 20,
							height: 20,
							alignItems: "center",
							justifyContent: "center",
						}}>
							<FontAwesome name="phone" size={16} color={COLORS.primary} />
						</View>
						<Text style={{ fontWeight: "bold", marginHorizontal: 10, color: colors.text }}>
							{t('phone')}
						</Text>
						<Text style={{ color: COLORS.primary }} onPress={() => {
							const tel = Platform.OS === 'ios' ? 'telprompt:' : 'tel:';
							Linking.openURL(`${tel}${data.phone}`)
						}}>
							{data.phone}
						</Text>
					</View>
					<View style={{ flexDirection: 'row', alignItems: "center", paddingVertical: 10 }}>
						<View style={{
							width: 20,
							height: 20,
							alignItems: "center",
							justifyContent: "center",
						}}>
							<MaterialCommunityIcons name="food-variant" size={16} color={COLORS.primary} />
						</View>
						<Text style={{ fontWeight: "bold", marginHorizontal: 10, color: colors.text }}>
							{t('cuisine')}
						</Text>
						<Text style={{ color: colors.text }}>
							{data.cuisine ? data.cuisine.join(', ') : '-'}
						</Text>
					</View>
					<View style={{ paddingVertical: 10 }}>
						<View style={{ flexDirection: 'row', alignItems: "center" }}>
							<View style={{
								width: 20,
								height: 20,
								alignItems: "center",
								justifyContent: "center",
							}}>
								<MaterialIcons name="access-time" size={18} color={COLORS.primary} />
							</View>
							<Text style={{ fontWeight: "bold", marginHorizontal: 10, color: colors.text }}>
								{t('hours')}
							</Text>
						</View>
						<View style={{ paddingLeft: 30 }}>
							{days.map((item, index) => (
								<View key={[item, index].join()} style={{ flexDirection: "row" }}>
									<Text style={{ width: 40, color: colors.text }}>{`${t(item)}:`}</Text>
									<Text style={{ color: colors.text }}>10:00 - 22:00</Text>
								</View>
							))}
						</View>
					</View>
					<View style={{ paddingVertical: 10 }}>
						<View style={{ flexDirection: 'row', alignItems: "center" }}>
							<View style={{
								width: 20,
								height: 20,
								alignItems: "center",
								justifyContent: "center",
							}}>
								<MaterialIcons name="payment" size={18} color={COLORS.primary} />
							</View>
							<Text style={{ fontWeight: "bold", marginHorizontal: 10, color: colors.text }}>
								{t('paymentOptions')}
							</Text>
						</View>
						<Text style={{ paddingLeft: 30, color: colors.text }}>
							MasterCard, Visa
						</Text>
					</View>
					<View style={{ paddingTop: 10 }}>
						<View style={{ flexDirection: 'row', alignItems: "center" }}>
							<View style={{
								width: 20,
								height: 20,
								alignItems: "center",
								justifyContent: "center",
							}}>
								<Octicons name="comment" size={16} color={COLORS.primary} />
							</View>
							<Text style={{ fontWeight: "bold", marginHorizontal: 10, color: colors.text }}>
								{t('description')}
							</Text>
						</View>
						<Text style={{ paddingLeft: 30, color: colors.text }}>
							{data.description}
						</Text>
					</View>
				</View>
				<View style={{
					paddingVertical: 15,
					paddingHorizontal: 20,
					backgroundColor: colors.background,
					marginBottom: 10
				}}>
					<Text style={{ fontSize: 16, paddingBottom: 5, color: colors.text }}>
						{t('ratingsAndReviews')}
					</Text>
					<View style={{ flexDirection: "row", marginTop: 10 }}>
						<View>
							<Text style={{ color: colors.text }}>{t('overall')}</Text>
							<Text style={{ fontWeight: "bold", fontSize: 36, color: colors.text }}>{rating}</Text>
							<Rating
								type='custom'
								readonly={true}
								startingValue={rating}
								imageSize={24}
								ratingBackgroundColor={COLORS.grey}
								tintColor={colors.background}
								isDisabled
							/>
						</View>
						<View style={{ marginLeft: 15 }}>
							<View style={{ flexDirection: "row", alignItems: "center", marginBottom: 2 }}>
								<Text style={{ fontSize: 12, marginRight: 10, fontWeight: "bold", color: colors.text }}>
									5
								</Text>
								<View style={{ height: 12, width: 50, backgroundColor: COLORS.primary }} />
							</View>
							<View style={{ flexDirection: "row", alignItems: "center", marginBottom: 2 }}>
								<Text style={{ fontSize: 12, marginRight: 10, fontWeight: "bold", color: colors.text }}>
									4
								</Text>
								<View style={{ height: 12, width: 40, backgroundColor: COLORS.primary }} />
							</View>
							<View style={{ flexDirection: "row", alignItems: "center", marginBottom: 2 }}>
								<Text style={{ fontSize: 12, marginRight: 10, fontWeight: "bold", color: colors.text }}>
									3
								</Text>
								<View style={{ height: 12, width: 30, backgroundColor: COLORS.primary }} />
							</View>
							<View style={{ flexDirection: "row", alignItems: "center", marginBottom: 2 }}>
								<Text style={{ fontSize: 12, marginRight: 10, fontWeight: "bold", color: colors.text }}>
									2
								</Text>
								<View style={{ height: 12, width: 20, backgroundColor: COLORS.primary }} />
							</View>
							<View style={{ flexDirection: "row", alignItems: "center" }}>
								<Text style={{ fontSize: 12, marginRight: 10, fontWeight: "bold", color: colors.text }}>
									1
								</Text>
								<View style={{ height: 12, width: 10, backgroundColor: COLORS.primary }} />
							</View>
						</View>
					</View>
				</View>
				{data.photos && (
					<View style={{ paddingVertical: 15, backgroundColor: colors.background, marginBottom: 10 }}>
						<Text style={{ fontSize: 16, paddingHorizontal: 20, paddingBottom: 15, color: colors.text }}>
							{t('photos')}
						</Text>
						<View style={{ flexDirection: "row", flex: 1, marginHorizontal: -0.5 }}>
							<View style={{ padding: 0.5 }}>
								<Image source={{ uri: data.photos[0] }} style={{ height: width / 2, width: width / 2, }} />
							</View>
							<View>
								<View style={{ flexDirection: "row" }}>
									<View style={{ padding: 0.5 }}>
										<Image source={{ uri: data.photos[1] }} style={{ height: width / 4, width: width / 4, }} />
									</View>
									<View style={{ padding: 0.5 }}>
										<Image source={{ uri: data.photos[2] }} style={{ height: width / 4, width: width / 4, }} />
									</View>
								</View>
								<View style={{ flexDirection: "row" }}>
									<View style={{ padding: 0.5 }}>
										<Image source={{ uri: data.photos[3] }} style={{ height: width / 4, width: width / 4, }} />
									</View>
									<View style={{ padding: 0.5 }}>
										<Image source={{ uri: data.photos[4] }} style={{ height: width / 4, width: width / 4, }} />
									</View>
								</View>
							</View>
						</View>
					</View>
				)}
			</ScrollView>
			{renderOrder()}
		</>
	);
}

const styles = StyleSheet.create({
	order: {
		position: "absolute",
		width: '100%',
		bottom: 0,
		paddingHorizontal: 15,
		paddingVertical: 15,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: -12,
		},
		shadowOpacity: 0.58,
		shadowRadius: 20.00,
		
		elevation: 24,
	},
	ratingContainer: {
		position: "relative",
		width: 125,
		height: 25
	},
	reviewText: {
		fontWeight: "bold",
		margin: 10
	},
	starContainer: {
		backgroundColor: COLORS.white,
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center"
	},
	container: {
		flex: 1,
	},
	btn: {
		height: 55,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
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
		height: 200,
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

export default Overview;
