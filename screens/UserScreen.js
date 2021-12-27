import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Menu } from 'react-native-paper';
import COLORS from "../constants/colors";
import { FontAwesome, MaterialIcons, Feather, Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import setDarkMode from "../store/theme/actions";
import firebase from 'firebase';
import { useTranslation } from 'react-i18next';
import { useTheme } from "@react-navigation/native";

const UserScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const user = useSelector(({ user }) => user.currentUser);
	const isDarkTheme = useSelector(({ theme }) => theme.isDarkMode);
	const [language, setLanguage] = useState('English');
	const [distanceUnit, setDistanceUnits] = useState('kilometers');
	const distanceUnits = ['kilometers', 'miles'];
	const { t, i18n } = useTranslation();
	const { colors } = useTheme();
	const [isLngVisible, setVisibleLng] = React.useState(false);
	const [isUnitsVisible, setVisibleUnits] = React.useState(false);
	
	const onLogout = () => {
		firebase.auth().signOut();
	};

	const lngList = [
		{
			label: 'English',
			key: 'en',
		},
		{
			label: 'Українська',
			key: 'ua',
		},
		{
			label: 'Русский',
			key: 'ru',
		},
	]

	return (
		<SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
			<View style={styles.containerInfo}>
				<View style={styles.avatar}>
					<Text style={styles.avatarText}>{user.firstName.charAt(0).toUpperCase()}</Text>
				</View>
				<Text style={[styles.userName, { color: colors.text }]}>{`${user.firstName} ${user.lastName}`}</Text>
			</View>
			<ScrollView>
				<View style={styles.containerStats}>
					<Text style={[styles.containerTitle, { color: colors.text }]}>{t('yourStats')}</Text>
					<View style={styles.statsItems}>
						<View style={styles.statsItem}>
							<Text style={[styles.statsCount, { color: colors.text }]}>0</Text>
							<Text style={{ color: colors.text }}>{t('reservations')}</Text>
						</View>
						<View style={styles.statsItem}>
							<Text style={[styles.statsCount, { color: colors.text }]}>0</Text>
							<Text style={{ color: colors.text }}>{t('Reviews')}</Text>
						</View>
					</View>
				</View>
				<View style={{ marginTop: 25 }}>
					<Text style={[styles.containerTitle, { paddingHorizontal: 15, marginBottom: 0, color: colors.text }]}>
						{t('accountSettings')}
					</Text>
					<RectButton
						style={styles.settingsButton}
						onPress={() => navigation.navigate('AccountDetailsScreen', user)}
					>
						<View style={styles.icon}>
							<FontAwesome name="user-circle" size={24} color={COLORS.primary} style={{ marginRight: 20 }} />
						</View>
						<View>
							<Text style={[styles.settingsLabel, { color: colors.text }]}>{t('accountDetails')}</Text>
							<Text style={styles.settingsDescription}>{t('manageAccountDetails')}</Text>
						</View>
					</RectButton>
					<RectButton
						style={styles.settingsButton}
						onPress={() => {}}
					>
						<View style={styles.icon}>
							<MaterialIcons name="payment" size={24} color={COLORS.primary} style={{ marginRight: 20 }} />
						</View>
						<View>
							<Text style={[styles.settingsLabel, { color: colors.text }]}>{t('paymentMethods')}</Text>
							<Text style={styles.settingsDescription}>{t('managePaymentMethods')}</Text>
						</View>
					</RectButton>
					<Menu
						visible={isLngVisible}
						onDismiss={() => setVisibleLng(false)}
						anchor={(
							<RectButton
								style={styles.settingsButton}
								onPress={() => setVisibleLng(true)}
							>
								<View style={styles.icon}>
									<FontAwesome name="language" size={24} color={COLORS.primary} style={{ marginRight: 20 }} />
								</View>
								<View>
									<Text style={[styles.settingsLabel, { color: colors.text }]}>{t('language')}</Text>
									<Text style={styles.settingsDescription}>{language}</Text>
								</View>
							</RectButton>
						)}
					>
						{lngList.map((lng) => (
							<Menu.Item
								key={lng.label}
								title={lng.label}
								onPress={async () => {
									await i18n.changeLanguage(lng.key);
									setLanguage(lng.label);
									setVisibleLng(false);
								}}
							/>
						))}
					</Menu>
					<Menu
						visible={isUnitsVisible}
						onDismiss={() => setVisibleUnits(false)}
						anchor={(
							<RectButton
								style={styles.settingsButton}
								onPress={() => setVisibleUnits(true)}
							>
								<View style={styles.icon}>
									<MaterialIcons name="map" size={24} color={COLORS.primary} style={{ marginRight: 20 }} />
								</View>
								<View>
									<Text style={[styles.settingsLabel, { color: colors.text }]}>{t('distanceUnits')}</Text>
									<Text style={styles.settingsDescription}>{t(distanceUnit)}</Text>
								</View>
							</RectButton>
						)}
					>
						{distanceUnits.map((item) => (
							<Menu.Item
								key={item}
								title={t(item)}
								onPress={async () => {
									setDistanceUnits(item);
									setVisibleUnits(false);
								}}
							/>
						))}
					</Menu>
					<RectButton
						style={styles.settingsButton}
						onPress={() => dispatch(setDarkMode())}
					>
						<View style={styles.icon}>
							{isDarkTheme
							 ? <Feather name="moon" size={24} color={COLORS.primary} style={{ marginRight: 20 }} />
							 : <Feather name="sun" size={24} color={COLORS.primary} style={{ marginRight: 20 }} />}
						</View>
						<View>
							<Text style={[styles.settingsLabel, { color: colors.text }]}>{t('theme')}</Text>
							<Text style={styles.settingsDescription}>{t(isDarkTheme ? 'dark' : 'light')}</Text>
						</View>
					</RectButton>
					<RectButton
						style={styles.settingsButton}
						onPress={() => onLogout()}
					>
						<View style={styles.icon}>
							<FontAwesome name="sign-out" size={24} color={COLORS.primary} style={{ marginRight: 20 }} />
						</View>
						<View>
							<Text style={[styles.settingsLabel, { color: colors.text }]}>{t('signOut')}</Text>
						</View>
					</RectButton>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	icon: {
		width: 45,
		height: 45,
		alignItems: "center",
		justifyContent: 'center'
	},
	settingsLabel: {
		fontSize: 16,
		marginBottom: 2
	},
	settingsDescription: {
		color: COLORS.grey
	},
	settingsButton: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 15,
		paddingVertical: 15
	},
	container: {
		flex: 1,
		paddingTop: 40,
		backgroundColor: COLORS.white
	},
	avatar: {
		width: 130,
		height: 130,
		borderRadius: 100,
		backgroundColor: COLORS.primary,
		marginBottom: 15,
		justifyContent: "center",
		alignItems: "center"
	},
	avatarText: {
		fontSize: 70,
		color: COLORS.white
	},
	userName: {
		fontSize: 22,
	},
	containerInfo: {
		alignItems: "center",
		marginBottom: 25
	},
	containerStats: {
		paddingHorizontal: 15,
	},
	containerTitle: {
		fontSize: 18,
		marginBottom: 15
	},
	statsItems: {
		flexDirection: "row"
	},
	statsItem: {
		flex: 1,
		alignItems: "center"
	},
	statsCount: {
		fontSize: 20
	}
});

export default UserScreen;
