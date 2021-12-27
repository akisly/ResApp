import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
	FlatList,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import ProgressBar from "../components/ProgressBar/ProgressBar";
import SearchBar from "../components/SearchBarWithAutocomplete";
import { fetchCities, fetchCity } from "../store/cities/actions";
import COLORS from "../constants/colors";
import { MaterialIcons } from '@expo/vector-icons';
import { RectButton } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";
import axios from "axios";

const SearchCityInput = () => {
	const dispatch = useDispatch();
	const [search, onChangeText] = React.useState('');
	const { t } = useTranslation();

	return (
		<SearchBar
			value={search}
			placeholder={t('location')}
			onChangeText={(value) => {
				onChangeText(value);
				dispatch(fetchCities(value));
			}}
		/>
	)
};

const SearchCityScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const isFetching = useSelector(({ cities }) => cities.isFetching, shallowEqual);
	const cities = useSelector(({ cities }) => cities.cities, shallowEqual);
	const { t, i18n } = useTranslation();
	const { colors } = useTheme();

	useEffect(() => {
		navigation.setOptions({
			headerTitle: (props) => <SearchCityInput {...props} />
		});
	}, []);

	return (
		<SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
			<ProgressBar
				// progress={progress}
				indeterminate={isFetching}
				color={COLORS.primary}
				width={null}
				height={2}
				borderWidth={0}
				animationType="decay"
			/>
			
			<FlatList
				data={cities}
				ListEmptyComponent={(
					<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
						<Text style={{ fontSize: 18, fontWeight: "bold", color: colors.text }}>{t('noLocation')}</Text>
					</View>
				)}
				renderItem={({ item }) => {
					const { main_text, secondary_text } = item.structured_formatting;
					
					return (
						<RectButton
							style={styles.cityContainer}
							onPress={() => dispatch(fetchCity(item.place_id, 'en', () => navigation.goBack()))}
						>
							<View style={styles.icon}>
								<MaterialIcons name="place" size={24} color={COLORS.primary} style={{ marginRight: 20 }} />
							</View>
							<View style={{ flex: 1 }}>
								<Text style={[styles.cityMainText, { color: colors.text }]}>
									{main_text}
								</Text>
								{secondary_text && (
									<Text style={styles.citySecondaryText}>
										{secondary_text}
									</Text>
								)}
							</View>
						</RectButton>
					)
				}}
				contentContainerStyle={{
					flex: 1
				}}
				keyExtractor={(item) => item.place_id}
				keyboardShouldPersistTaps='handled'
				style={styles.predictionsContainer}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	citySecondaryText: {
		color: COLORS.grey
	},
	cityMainText: {
		fontSize: 18
	},
	cityContainer: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 15,
		paddingVertical: 10,
	},
	predictionsContainer: {
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10
	},
	predictionRow: {
		paddingBottom: 15,
		marginBottom: 15,
		borderBottomColor: 'black',
		borderBottomWidth: 1,
	},
	container: {
		flex: 1,
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

export default SearchCityScreen;
