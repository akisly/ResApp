import React from 'react';
import {
	ActivityIndicator,
	RefreshControl,
	SafeAreaView,
	StyleSheet,
	Text,
	FlatList,
	View
} from 'react-native';
import COLORS from "../constants/colors";
import { getObject, mergeObject, storeObject } from "../utils/AsyncStorage/asyncStorage";
import { RectButton } from "react-native-gesture-handler";
import RestaurantCard from "../components/RestaurantCard";
import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";
import { setSavedRestaurants } from "../store/restaurants/actions";
import { useDispatch } from "react-redux";

const SavedRestaurantsScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const [data, setData] = React.useState([]);
	const [isLoading, setLoading] = React.useState(true);
	const [refreshing, setRefreshing] = React.useState(false);
	const { t } = useTranslation();
	const { colors } = useTheme();

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		
		getObject('savedRestaurants')
			.then((res) => {
				setData(res || []);
				setRefreshing(false);
			});
	}, []);
	
	const onPressSaved = async (restaurant) => {
		let tempSaved = [...data];
		
		if (tempSaved.some((item) => item.id === restaurant.id)) {
			tempSaved = tempSaved.filter((item) => item.id !== restaurant.id)
			await storeObject('savedRestaurants', tempSaved);
		} else {
			await mergeObject('savedRestaurants', [restaurant]);
			tempSaved.push(restaurant);
		}
		
		setData(tempSaved);
		dispatch(setSavedRestaurants(tempSaved));
	}
	
	React.useEffect(() => {
		getObject('savedRestaurants')
			.then((res) => {
				setData(res);
				setLoading(false);
			});
	}, [])
	
	return (
		<SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
			{isLoading ? (
				<ActivityIndicator size="large" color={COLORS.primary} />
			) : (
				 <FlatList
					 data={data}
					 ListEmptyComponent={(
						 <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
							 <Text style={[styles.h2, { color: colors.text }]}>{t('noSaved')}</Text>
							 <Text style={{ marginVertical: 15, textAlign: 'center', color: colors.text }}>
								 {t('saveFirst')}
							 </Text>
							 <RectButton
								 style={styles.findButton}
								 onPress={() => navigation.navigate('HomeScreen')}
							 >
								 <Text style={styles.findButtonLabel}>{t('findRes')}</Text>
							 </RectButton>
						 </View>
					 )}
					 contentContainerStyle={{
						 paddingTop: 15,
						 paddingBottom: 30,
						 paddingLeft: 20,
						 alignItems: 'center'
					 }}
					 renderItem={({ item, index}) => (
						 <RestaurantCard
							 index={index}
							 restaurant={item}
							 goToDetailsScreen={() => navigation.navigate('DetailsScreen', item)}
							 onPressSaved={() => onPressSaved(item)}
							 isSaved={data.some((restaurant) => restaurant.id === item.id)}
						 />
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
	container: {
		flex: 1,
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

export default SavedRestaurantsScreen;
