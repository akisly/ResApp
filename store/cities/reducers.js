import {
	CITIES_SET_CITIES, CITIES_SET_CITY, CITIES_CLEAR_DATA, CITIES_SET_IS_FETCHING, CITIES_SET_SEARCH
} from './types';

const initialState = {
	search: '',
	city: null,
	cities: [],
	isFetching: false,
};

const cities = (state = initialState, action) => {
	switch (action.type) {
		case CITIES_SET_SEARCH:
			return {
				...state,
				search: action.search
			};
		case CITIES_SET_IS_FETCHING:
			return {
				...state,
				isFetching: action.isFetching
			};
		case CITIES_SET_CITIES:
			return {
				...state,
				cities: action.cities
			};
		case CITIES_SET_CITY:
			console.log(action.city);
			return {
				...state,
				city: action.city
			};
		case CITIES_CLEAR_DATA:
			return initialState;
		default:
			return state;
	}
};

export default cities;
