import React, { useEffect, useState } from 'react';
import {
	View,
	SafeAreaView,
	TextInput,
	StyleSheet, Text,
} from 'react-native';
import { useFormik } from 'formik';
import { FontAwesome } from '@expo/vector-icons';
import COLORS from "../constants/colors";
import { RectButton } from "react-native-gesture-handler";
import firebase from "firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../store/user/actions";
import { useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const AccountDetailsScreen = ({ navigation, route }) => {
	const dispatch = useDispatch();
	const user = route.params;
	const [focusInput, setFocusInput] = useState(null);
	const { handleChange, handleSubmit, values } = useFormik({
		initialValues: {
			firstName: user.firstName,
			lastName: user.lastName,
			phone: user.phone,
			email: user.email,
		},
		onSubmit: (values) => {
			const {
				firstName,
				lastName,
				phone,
				email,
			} = values;
			
			firebase
				.firestore()
				.collection('users')
				.doc(firebase.auth().currentUser.uid)
				.set({ firstName, lastName, phone, email })
				.then(() => {
					dispatch(setUser(values));
					navigation.goBack();
				});
		},
	});
	const { colors } = useTheme();
	const { t } = useTranslation();
	
	useEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<RectButton
					onPress={handleSubmit}
					style={{
						backgroundColor: 'transparent',
						flex: 1,
						justifyContent: 'center',
						paddingHorizontal: 15,
					}}
				>
					<Text
						style={{
							color: colors.text,
							textTransform: "uppercase",
							fontWeight: 'bold'
						}}
					>
						{t('save')}
					</Text>
				</RectButton>
			)
		});
	}, [navigation]);

	return (
		<SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
			<View style={styles.action}>
				<View style={styles.icon}>
					<FontAwesome name="user" size={24} color={COLORS.primary} />
				</View>
				<View style={[styles.textInputWrap, focusInput === "First Name" && { borderBottomColor: COLORS.primary }]}>
					<TextInput
						placeholder={t('firstName')}
						placeholderTextColor="#666666"
						autoCorrect={false}
						onFocus={() => setFocusInput('First Name')}
						style={[styles.textInput, { color: colors.text }]}
						onChangeText={handleChange('firstName')}
						value={values.firstName}
					/>
				</View>
			</View>
			<View style={styles.action}>
				<View style={styles.icon} />
				<View style={[styles.textInputWrap, focusInput === "Last Name" && { borderBottomColor: COLORS.primary }]}>
					<TextInput
						placeholder={t('lastName')}
						placeholderTextColor="#666666"
						autoCorrect={false}
						onFocus={() => setFocusInput('Last Name')}
						style={[styles.textInput, { color: colors.text }]}
						onChangeText={handleChange('lastName')}
						value={values.lastName}
					/>
				</View>
			</View>
			<View style={styles.action}>
				<View style={styles.icon}>
					<FontAwesome name="phone" size={24} color={COLORS.primary} />
				</View>
				<View style={[styles.textInputWrap, focusInput === "Phone" && { borderBottomColor: COLORS.primary }]}>
					<TextInput
						placeholder={t('phone')}
						placeholderTextColor="#666666"
						keyboardType="phone-pad"
						autoCorrect={false}
						onFocus={() => setFocusInput('Phone')}
						style={[styles.textInput, { color: colors.text }]}
						onChangeText={handleChange('phone')}
						value={values.phone}
					/>
				</View>
			</View>
			<View style={styles.action}>
				<View style={styles.icon}>
					<FontAwesome name="envelope" size={22} color={COLORS.primary} />
				</View>
				<View style={[styles.textInputWrap, focusInput === "Email" && { borderBottomColor: COLORS.primary }]}>
					<TextInput
						placeholder={t('email')}
						placeholderTextColor="#666666"
						keyboardType="email-address"
						autoComplete="email"
						onFocus={() => setFocusInput('Email')}
						autoCorrect={false}
						style={[styles.textInput, { color: colors.text }]}
						onChangeText={handleChange('email')}
						value={values.email}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	icon: {
		width: 30,
		height: 30,
		justifyContent: "center",
		alignItems: "center"
	},
	container: {
		flex: 1,
		paddingHorizontal: 15,
		backgroundColor: COLORS.white
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
		// borderTopLeftRadius: 20,
		// borderTopRightRadius: 20,
		// shadowColor: '#000000',
		// shadowOffset: {width: 0, height: 0},
		// shadowRadius: 5,
		// shadowOpacity: 0.4,
	},
	header: {
		backgroundColor: '#FFFFFF',
		shadowColor: '#333333',
		shadowOffset: {width: -1, height: -3},
		shadowRadius: 2,
		shadowOpacity: 0.4,
		// elevation: 5,
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
		justifyContent: "center",
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
		borderBottomColor: COLORS.grey,
		height: 50
	},
	textInput: {
		flex: 1,
		// marginTop: Platform.OS === 'ios' ? 0 : -12,
		paddingLeft: 10,
		paddingVertical: 10,
		color: '#05375a',
	},
});

export default AccountDetailsScreen;
