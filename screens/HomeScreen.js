import React from 'react';
import {
	Dimensions,
	FlatList,
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	StatusBar,
} from 'react-native';
import { RectButton, DrawerLayout } from 'react-native-gesture-handler';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import COLORS from '../constants/colors';
import ModalFilter from "../components/ModalFilter";
import { useTheme } from "@react-navigation/native";
import { batch, shallowEqual, useDispatch, useSelector } from "react-redux";
import { clearData, fetchUser } from "../store/user/actions";
import { getObject, storeObject } from "../utils/AsyncStorage/asyncStorage";
import RestaurantCard from "../components/RestaurantCard";
import { useTranslation } from "react-i18next";
import { fetchRestaurants, setSavedRestaurants } from "../store/restaurants/actions";

const { width } = Dimensions.get('screen');
const cardWidth = width / 1.8;

const Page = ({ openDrawer, navigation }) => {
	const dispatch = useDispatch();
	const restaurants = useSelector(({ restaurants }) => restaurants.restaurants, shallowEqual);
	const savedRestaurants = useSelector(({ restaurants }) => restaurants.savedRestaurants, shallowEqual);
	const city = useSelector(({ cities }) => cities.city, shallowEqual);
	const { colors } = useTheme();
	const { t } = useTranslation();

	const onPressSaved = async (restaurant) => {
		let tempSaved = [...savedRestaurants];
		
		if (tempSaved.some((item) => item.id === restaurant.id)) {
			tempSaved = tempSaved.filter((item) => item.id !== restaurant.id)
		} else {
			tempSaved.push(restaurant);
		}

		await storeObject('savedRestaurants', tempSaved);
		dispatch(setSavedRestaurants(tempSaved));
	}
	
	const fetchData = async () => {
		const res = await getObject('savedRestaurants');

		batch(() => {
			dispatch(setSavedRestaurants(res || []));
			dispatch(fetchRestaurants());
		})
	};
	
	React.useEffect(() => {
		fetchData();
	}, []);

	return (
		<SafeAreaView
			style={{
				flex: 1,
				marginTop: StatusBar.currentHeight + 10 || 10,
				backgroundColor: colors.background
			}}
		>
			<View style={style.header}>
				<View>
					<Text style={{ fontSize: 30, fontWeight: 'bold', color: colors.text }}>
						{t('findResIn')}
					</Text>
					<View style={{ flexDirection: 'row' }}>
						<Text style={{ fontSize: 30, fontWeight: 'bold', color: colors.text }}>{`${t('in')} `}</Text>
						<TouchableOpacity onPress={() => navigation.navigate('SearchCityScreen')}>
							<Text
								style={{ fontSize: 30, fontWeight: 'bold', color: colors.primary }}>
								{city ? city.name : 'Kiev'}
							</Text>
						</TouchableOpacity>
					</View>
				</View>
				<TouchableOpacity onPress={openDrawer}>
					<Ionicons name="filter" size={28} color={colors.icon} />
				</TouchableOpacity>
			</View>
			<View style={style.searchInputContainer}>
				<MaterialIcons name="search" size={30} style={{ marginLeft: 20 }} />
				<TextInput
					placeholder={t('search')}
					style={{ fontSize: 20, paddingLeft: 10, width: '100%' }}
				/>
			</View>
			<FlatList
				keyExtractor={(item) => item.id}
				data={restaurants}
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
						isSaved={savedRestaurants.some((restaurant) => restaurant.id === item.id)}
					/>
				)}
				showsVerticalScrollIndicator={false}
			/>
		</SafeAreaView>
	);
};

const HomeScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const [radio, setRadio] = React.useState('featured');
	const sortByItems = ['featured', 'distance', 'rating'];
	let drawerRef = React.createRef();
	const { colors } = useTheme();
	const { t } = useTranslation();
 
	const renderDrawer = () => {
		return (
			<View style={[style.drawerContainer, { backgroundColor: colors.background }]}>
				<View style={style.topButtons}>
					<RectButton style={style.topButton}>
						<Text style={style.topButtonText}>{t('clearAll')}</Text>
					</RectButton>
					<RectButton style={style.topButton}>
						<Text style={style.topButtonText}>{t('done')}</Text>
					</RectButton>
				</View>
				<View style={style.sortBy}>
					<Text style={[style.sortByText, { color: colors.text }]}>{t('sortBy')}</Text>
					<View style={style.sortByItems}>
						{sortByItems.map((item, index) => (
							<TouchableOpacity
								key={item}
								onPress={() => setRadio(item)}
								activeOpacity={0.8}
								style={[
									style.sortByButton,
									style[`sortByButton${item}`],
									item === radio && { backgroundColor: COLORS.primary },
								]}
							>
								<View>
									<Text
										style={[
											style.sortLabel,
											item === radio && { color: COLORS.white },
										]}
									>
										{t(item)}
									</Text>
								</View>
							</TouchableOpacity>
						))}
					</View>
				</View>
				<View
					style={{
						borderBottomColor: COLORS.lightGrey,
						borderBottomWidth: 1,
						marginTop: 25
					}}
				/>
				<ModalFilter />
			</View>
		);
	};
	
	React.useEffect(() => {
		batch(() => {
			dispatch(clearData());
			dispatch(fetchUser());
		});
	}, []);
 
	return (
		<DrawerLayout
			ref={(drawer) => drawerRef = drawer}
			drawerWidth={300}
			keyboardDismissMode="on-drag"
			drawerPosition={DrawerLayout.positions.Right}
			drawerType="front"
			drawerBackgroundColor={COLORS.white}
			overlayColor={'#000000aa'}
			renderNavigationView={renderDrawer}
		>
			<Page navigation={navigation} openDrawer={() => drawerRef.openDrawer()} />
		</DrawerLayout>
	);
};

const style = StyleSheet.create({
	drawerContainer: {
		flex: 1,
		paddingTop: 40,
	},
	topButtons: {
		flexDirection: "row",
		justifyContent: "flex-end",
	},
	topButton: {
		padding: 10,
		marginRight: 10
	},
	topButtonText: {
		fontWeight: "bold",
		textTransform: "uppercase",
		color: COLORS.primary
	},
	sortBy: {
		marginTop: 20,
		paddingHorizontal: 10
	},
	sortByItems: {
		borderWidth: 1,
		borderColor: COLORS.primary,
		flexDirection: "row",
		borderRadius: 5,
		overflow: "hidden"
	},
	sortByText: {
		fontSize: 18,
		marginBottom: 8
	},
	sortByButton: {
		flex: 1,
		paddingVertical: 5,
		alignItems: 'center',
		justifyContent: 'center',
	},
	sortByButtonDistance: {
		borderRightWidth: 1,
		borderLeftWidth: 1,
		borderColor: COLORS.primary,
	},
	sortLabel: {
		fontWeight: "500",
		color: COLORS.primary,
	},
	drawerText: {
		margin: 10,
		fontSize: 15,
		textAlign: 'left',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'baseline',
		paddingHorizontal: 20,
	},
	searchInputContainer: {
		height: 50,
		backgroundColor: COLORS.light,
		marginTop: 15,
		marginBottom: 15,
		marginLeft: 20,
		borderTopLeftRadius: 30,
		borderBottomLeftRadius: 30,
		flexDirection: 'row',
		alignItems: 'center',
	},
	categoryListContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginHorizontal: 20,
		marginTop: 30,
	},
	categoryListText: {
		fontSize: 17,
		fontWeight: 'bold',
	},
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
	priceTag: {
		height: 60,
		width: 80,
		backgroundColor: COLORS.primary,
		position: 'absolute',
		zIndex: 1,
		right: 0,
		borderTopRightRadius: 15,
		borderBottomLeftRadius: 15,
		justifyContent: 'center',
		alignItems: 'center',
	},
	cardDetails: {
		height: 100,
		borderRadius: 15,
		position: 'absolute',
		bottom: -1,
		padding: 20,
		width: '100%',
	},
	cardOverLay: {
		height: 280,
		backgroundColor: COLORS.white,
		position: 'absolute',
		zIndex: 100,
		width: cardWidth,
		borderRadius: 15,
	},
	topHotelCard: {
		height: 120,
		width: 120,
		backgroundColor: COLORS.white,
		elevation: 15,
		marginHorizontal: 10,
		borderRadius: 10,
	},
	topHotelCardImage: {
		height: 80,
		width: '100%',
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10,
	},
});

export default HomeScreen;
