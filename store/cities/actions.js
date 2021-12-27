import axios from "axios";
import { batch } from "react-redux";
import {
	CITIES_SET_CITIES, CITIES_SET_CITY, CITIES_CLEAR_DATA, CITIES_SET_IS_FETCHING, CITIES_SET_SEARCH
} from './types';
import { fetchRestaurants } from "../restaurants/actions";

const GOOGLE_PACES_API_BASE_URL = 'https://maps.googleapis.com/maps/api/place';
const GOOGLE_API_KEY = 'AIzaSyCUVaNteneUZWYflTgDWyGBzL4sJ3V_qmg';

export const setCity = (city) => ({
	type: CITIES_SET_CITY, city
});

export const fetchCity = (placeId, language = 'en', callback = () => {}) => {
	return (dispatch) => {
		const apiUrl = `${GOOGLE_PACES_API_BASE_URL}/details/json?key=${GOOGLE_API_KEY}&place_id=${placeId}&language=${language}`
		
		axios.request({
			method: 'POST',
			url: apiUrl
		}).then((res) => {
			if (res) {
				const { result } = res.data;
				
				batch(() => {
					dispatch(setCity(result));
					dispatch(fetchRestaurants({ fieldPath: 'city', opStr: '==', value: result.name }));
				});
				
				callback();
			}
		}).catch((error) => {
			console.error(error);
		});
	};
}

export const setSearch = (search = '') => ({
	type: CITIES_SET_SEARCH, search
});

export const setIsFetching = (isFetching) => ({
	type: CITIES_SET_IS_FETCHING, isFetching
});

export const setCities = (cities) => ({
	type: CITIES_SET_CITIES, cities
});

export const fetchCities = (search = '') => {
	return (dispatch) => {
		// dispatch(setIsFetching(true));
		const apiUrl = `${GOOGLE_PACES_API_BASE_URL}/autocomplete/json?key=${GOOGLE_API_KEY}&input=${search}`
		               + `&components=country:ua&types=(cities)&language=ru`;
		
		axios.request({
			method: 'POST',
			url: apiUrl
		}).then((res) => {
			if (res) {
				const { data: { predictions } } = res;
				
				dispatch(setCities(predictions));
			}
		}).catch((error) => {
			console.error(error);
		});
	};
}

export const clearData = () => ({ type: CITIES_CLEAR_DATA });
