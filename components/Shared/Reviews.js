import * as React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { Rating } from 'react-native-ratings';
import COLORS from "../../constants/colors";
import { useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const Reviews = () => {
	const { t } = useTranslation();
	const { colors } = useTheme();
	const rating = ((5 * 65 + 4 * 35 + 3 * 25 + 2 * 15 + 5) / 145).toFixed(1);
	const data = [
		{
			user: {
				name: 'Revin',
			},
			text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
		},
		{
			user: {
				name: 'Jenni',
			},
			text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
		},
		{
			user: {
				name: 'Alex',
			},
			text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
		}
	];
	
	return (
		<ScrollView
			style={[styles.container, {	backgroundColor: colors.background }]}
			contentContainerStyle={styles.content}
		>
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
					{/*<View style={styles.ratingContainer}>*/}
					{/*	<View style={{*/}
					{/*		backgroundColor: COLORS.primary,*/}
					{/*		width: 40,*/}
					{/*		position: "absolute",*/}
					{/*		top: 0,*/}
					{/*		left: 0,*/}
					{/*		bottom: 0*/}
					{/*	}} />*/}
					{/*	<View style={styles.starContainer}>*/}
					{/*		<MaterialIcons name="star" size={24} color="transparent" />*/}
					{/*		<MaterialIcons name="star" size={24} color={COLORS.lightGrey} />*/}
					{/*		<MaterialIcons name="star" size={24} color={COLORS.lightGrey} />*/}
					{/*		<MaterialIcons name="star" size={24} color={COLORS.lightGrey} />*/}
					{/*		<MaterialIcons name="star" size={24} color={COLORS.lightGrey} />*/}
					{/*	</View>*/}
					{/*</View>*/}
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
			{data.map((item, index) => (
				<View key={index} style={styles.reviewItem}>
					<View style={styles.reviewItemTop}>
						<View style={[styles.userAvatar, { backgroundColor: COLORS.primary }]}>
							<Text style={styles.userAvatarText}>{item.user.name.charAt(0)}</Text>
						</View>
						<Text style={[styles.userName, { color: colors.text }]}>{item.user.name}</Text>
					</View>
					<Text style={[styles.reviewItemText, { color: colors.text }]}>{item.text}</Text>
				</View>
			))}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	userAvatarText: {
		fontSize: 18,
		color: COLORS.white
	},
	reviewItemText: {
		marginTop: 10
	},
	userName: {
		fontSize: 16,
		color: "#000"
	},
	userAvatar: {
		justifyContent: "center",
		alignItems: "center",
		width: 50,
		height: 50,
		borderRadius: 100,
		marginRight: 10
	},
	reviewItemTop: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	reviewItem: {
		paddingVertical: 15,
		marginBottom: 20,
		borderBottomWidth: 1,
		borderBottomColor: COLORS.lightGrey
	},
	container: {
		paddingHorizontal: 20
	},
	content: {
		paddingVertical: 16,
	},
	author: {
		flexDirection: 'row',
		marginVertical: 8,
		marginHorizontal: 16,
	},
	meta: {
		marginHorizontal: 8,
		justifyContent: 'center',
	},
	name: {
		color: '#000',
		fontWeight: 'bold',
		fontSize: 16,
		lineHeight: 24,
	},
	timestamp: {
		color: '#999',
		fontSize: 14,
		lineHeight: 21,
	},
	avatar: {
		height: 48,
		width: 48,
		borderRadius: 24,
	},
	title: {
		color: '#000',
		fontWeight: 'bold',
		fontSize: 36,
		marginVertical: 8,
		marginHorizontal: 16,
	},
	paragraph: {
		color: '#000',
		fontSize: 16,
		lineHeight: 24,
		marginVertical: 8,
		marginHorizontal: 16,
	},
	image: {
		width: '100%',
		height: 200,
		resizeMode: 'cover',
		marginVertical: 8,
	},
});

export default Reviews;
