import React from 'react';
import {
	ActivityIndicator,
	RefreshControl,
	SafeAreaView,
	StyleSheet,
	Text,
	FlatList,
	View, Image, TouchableOpacity
} from 'react-native';
import COLORS from "../constants/colors";
import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";
import firebase from "firebase";
import NoImage from "../assets/images/placeholder-image.png";
import Moment from 'moment';

const HistoryScreen = ({ navigation, route }) => {
	const [history, setHistory] = React.useState([]);
	const [isLoading, setLoading] = React.useState(true);
	const [refreshing, setRefreshing] = React.useState(false);
	const { t } = useTranslation();
	const { colors } = useTheme();
	
	const fetchHistory = (callback = () => {}) => {
		const userId = firebase.auth().currentUser.uid;
		
		firebase
			.firestore()
			.collection("reservations")
			.where("user_id", "==", userId)
			.get()
			.then((snapshot) => {
				const data = [];
				
				snapshot.forEach((doc) => {
					data.push({
						id: doc.id,
						...doc.data()
					});
				})
				
				setHistory(data);
				callback();
			});
	}
	
	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		fetchHistory(() => setRefreshing(false));
	}, []);

	React.useEffect(() => {
		fetchHistory(() => setLoading(false));
	}, [])
	
	return (
		<SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
			{isLoading ? (
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<ActivityIndicator size="large" color={COLORS.primary} />
				</View>
			) : (
				 <FlatList
					 data={history}
					 ListEmptyComponent={(
						 <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
							 <Text style={[styles.h2, { color: colors.text }]}>{t('noHistory')}</Text>
							 <Text style={{ marginVertical: 15, textAlign: 'center', color: colors.text }}>
								 {t('bookTable')}
							 </Text>
						 </View>
					 )}
					 renderItem={({ item }) => (
						 <TouchableOpacity
							 style={styles.item}
							 activeOpacity={1}
							 onPress={() => {
								 if (item.status !== 'canceled') {
									 navigation.navigate('HistoryDetailsScreen', item)
								 }
							 }}
						 >
							 <Image
								 source={item.restaurant_photo ? { uri: item.restaurant_photo} : NoImage}
								 style={styles.image}
							 />
							 <View style={styles.itemInfo}>
								 <Text style={{ fontSize: 16, color: colors.text }}>{item.restaurant_name}</Text>
								 <Text style={{ color: COLORS.grey }}>
									 {Moment(item.date.toDate()).format('D MMMM Y')}, {item.time}
								 </Text>
								 <Text style={{ color: COLORS.grey }}>{item.party_size} {t('persons')}</Text>
								 {item.status && (
									 <View style={styles.itemStatus}>
										 <View style={{ width: 6, height: 6, borderRadius: 5, backgroundColor: 'red', marginRight: 5, marginTop: 3 }} />
										 <Text style={{ color: COLORS.grey }}>{t(item.status)}</Text>
									 </View>
								 )}
							 </View>
						 </TouchableOpacity>
					 )}
					 showsVerticalScrollIndicator={false}
					 refreshControl={
						 <RefreshControl
							 refreshing={refreshing}
							 onRefresh={onRefresh}
							 colors={[COLORS.primary]}
							 tintColor={COLORS.primary}
						 />
					 }
				 />
			 )}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	itemStatus: {
		flexDirection: 'row',
		alignItems: "center",
		position: 'absolute',
		// height: 10,
		bottom: 0,
		right: 0
	},
	itemInfo: {
		position: 'relative',
		flex: 1
	},
	item: {
		flexDirection: "row",
		justifyContent: "flex-start",
		paddingHorizontal: 15,
		paddingVertical: 15,
		borderBottomWidth: 1,
		borderBottomColor: COLORS.lightGrey
	},
	image: {
		width: 60,
		height: 60,
		marginRight: 15
	},
	container: {
		flex: 1,
		backgroundColor: COLORS.white
	},
	scrollView: {
		flex: 1,
		alignItems: 'center',
	},
	h2: {
		fontSize: 18,
		fontWeight: "bold"
	},
	findButton: {
		paddingVertical: 15,
		paddingHorizontal: 15,
		borderRadius: 5,
		backgroundColor: COLORS.primary
	},
	findButtonLabel: {
		fontSize: 16,
		fontWeight: "bold",
		color: COLORS.white
	}
});

export default HistoryScreen;
