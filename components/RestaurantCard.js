import React from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import COLORS from "../constants/colors";
import { useTranslation } from "react-i18next";

const NoImage = require('../assets/images/placeholder-image.png');
const { width } = Dimensions.get('screen');
const cardWidth = width / 1.8;

const RestaurantCard = ({
	restaurant,
	goToDetailsScreen,
	onPressSaved,
	isSaved
}) => {
	const { colors } = useTheme();
	const { t } = useTranslation();
	const { cuisine } = restaurant;

	return (
		<TouchableOpacity
			style={{ marginBottom: 20 }}
			activeOpacity={1}
			onPress={goToDetailsScreen}
		>
			<View style={style.trueCard}>
				<Image
					source={restaurant.image ? { uri: restaurant.image} : NoImage}
					style={style.cardImage}
				/>
				<View style={[style.cardDetails, { backgroundColor: colors.surface }]}>
					<View
						style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
						<View>
							<Text style={{ fontWeight: 'bold', fontSize: 17, color: colors.text }}>
								{restaurant.name}
							</Text>
							{cuisine?.length > 0 && (
								<Text style={{ color: COLORS.grey, fontSize: 12 }}>
									{cuisine.join(', ')}
								</Text>
							)}
						</View>
						<TouchableOpacity onPress={onPressSaved}>
							<MaterialIcons
								name={isSaved ? "bookmark" : "bookmark-border"}
								size={26}
								color={COLORS.primary}
							/>
						</TouchableOpacity>
					</View>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							marginTop: 10,
						}}>
						<View style={{flexDirection: 'row'}}>
							<MaterialIcons name="star" size={15} color={COLORS.orange} />
							<MaterialIcons name="star" size={15} color={COLORS.orange} />
							<MaterialIcons name="star" size={15} color={COLORS.orange} />
							<MaterialIcons name="star" size={15} color={COLORS.orange} />
							<MaterialIcons name="star" size={15} color={COLORS.grey} />
						</View>
						<Text style={{fontSize: 10, color: COLORS.grey}}>365 {t('reviews')}</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
};

const style = StyleSheet.create({
	trueCard: {
		height: 280,
		width: width - 40,
		elevation: 15,
		marginRight: 20,
		borderRadius: 15,
		backgroundColor: COLORS.white,
	},
	card: {
		height: 280,
		width: cardWidth,
		elevation: 15,
		marginRight: 20,
		borderRadius: 15,
		backgroundColor: COLORS.white,
	},
	cardImage: {
		height: 200,
		width: '100%',
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
	},
	cardDetails: {
		height: 100,
		borderRadius: 15,
		position: 'absolute',
		bottom: -1,
		padding: 20,
		width: '100%',
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		
		elevation: 5,
	},
});

export default RestaurantCard;
