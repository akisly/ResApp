import React, { useEffect } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	SafeAreaView,
} from 'react-native';
import { Divider, TextInput } from 'react-native-paper';
import { FontAwesome, MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import COLORS from "../constants/colors";
import firebase from "firebase";
import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";
import Moment from 'moment';

const HistoryDetailsScreen = ({ navigation, route }) => {
	const details = route.params;
	const { t } = useTranslation();
	const { colors } = useTheme();

	useEffect(() => {
		navigation.setOptions({
			title: details.restaurant_name,
		});
	}, [navigation]);
	
	const menuEntries = Object.entries(details.menu);
	
	const style = StyleSheet.create({
		subtotalContainer: {
			flexDirection: "row",
			justifyContent: "space-between",
			marginTop: 15,
			paddingHorizontal: 10
		},
		
		subtotalText: {
			textAlign: "left",
			fontWeight: "600",
			fontSize: 15,
			marginBottom: 10,
			color: colors.text
		},
	});
	
	const cancelOrder = () => {
		firebase
			.firestore()
			.collection("reservations")
			.doc(details.id)
			.update({ status: 'canceled' })
			.then(() => {
				navigation.goBack();
			})
	};
	
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.action}>
				<View style={styles.icon}>
					<FontAwesome name="calendar" size={20} color={COLORS.primary} />
				</View>
				<TextInput
					value={Moment(details.date.toDate()).format('D MMMM Y')}
					placeholder="First Name"
					placeholderTextColor="#666666"
					autoCorrect={false}
					style={{ backgroundColor: 'transparent', flex: 1, marginLeft: 10, height: 50, color: colors.text }}
					showSoftInputOnFocus={false}
					autoComplete="off"
					caretHidden
					editable={false}
				/>
			</View>
			<View style={styles.action}>
				<View style={styles.icon}>
					<Ionicons name="ios-time-outline" size={24} color={COLORS.primary} />
				</View>
				<TextInput
					value={details.time}
					placeholder="First Name"
					placeholderTextColor="#666666"
					autoCorrect={false}
					style={{ backgroundColor: 'transparent', flex: 1, marginLeft: 10, height: 50, color: colors.text }}
					showSoftInputOnFocus={false}
					autoComplete="off"
					editable={false}
				/>
			</View>
			<View style={styles.action}>
				<View style={styles.icon}>
					<FontAwesome name="users" size={20} color={COLORS.primary} />
				</View>
				<TextInput
					value={details.party_size.toString()}
					placeholder="First Name"
					placeholderTextColor="#666666"
					autoCorrect={false}
					style={{ backgroundColor: 'transparent', flex: 1, marginLeft: 10, height: 50, color: colors.text }}
					showSoftInputOnFocus={false}
					autoComplete="off"
					editable={false}
				/>
			</View>
			<View style={[styles.action, { alignItems: "flex-start" }]}>
				<View style={styles.icon}>
					<FontAwesome name="commenting-o" size={22} color={COLORS.primary} style={{ paddingTop: 18 }} />
				</View>
				<TextInput
					multiline
					numberOfLines={4}
					value={details.wishes}
					placeholder="Wishes"
					style={{ backgroundColor: 'transparent', flex: 1, marginLeft: 10, color: colors.text }}
					editable={false}
				/>
			</View>
			<View style={[styles.action]}>
				<View style={styles.icon}>
					<MaterialCommunityIcons name="table-chair" size={24} color={COLORS.primary} />
				</View>
				<TextInput
					value={details.table_id ? `№${details.table_id.toString()}` : ''}
					placeholder="Table №"
					style={{ backgroundColor: 'transparent', flex: 1, marginLeft: 10, color: colors.text }}
					editable={false}
				/>
			</View>
			<View style={[styles.action, { alignItems: 'flex-start' }]}>
				<View style={styles.icon}>
					<MaterialIcons name="restaurant-menu" size={24} color={COLORS.primary} style={{ paddingTop: 25 }} />
				</View>
				<View style={{ flex: 1, marginLeft: 10 }}>
					{menuEntries.map(([name, { price, count }]) => (
						<View key={name}>
							<View style={style.subtotalContainer}>
								<Text style={style.subtotalText}>{name} - ({count})</Text>
								<Text style={{ color: colors.text }}>${price * count}</Text>
							</View>
							<Divider />
						</View>
					))}
				</View>
			</View>
			<View
				style={{
					alignItems: 'center',
					justifyContent: 'center'
				}}
			>
				<TouchableOpacity
					style={styles.btn}
					onPress={cancelOrder}
				>
					<Text style={{ color: COLORS.white, fontSize: 18, fontWeight: 'bold' }}>
						{t('Cancel the order')}
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	btn: {
		height: 55,
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
		padding: 20
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

export default HistoryDetailsScreen;
