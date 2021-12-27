import { RESTAURANTS_SET_RESTAURANTS, RESTAURANTS_SET_SAVED_RESTAURANTS, RESTAURANTS_CLEAR_DATA } from './types';

const initialState = {
	restaurants: [],
	savedRestaurants: [],
};

const restaurants = (state = initialState, action) => {
	switch (action.type) {
		case RESTAURANTS_SET_RESTAURANTS:
			return {
				...state,
				restaurants: action.restaurants
			};
		case RESTAURANTS_SET_SAVED_RESTAURANTS:
			return {
				...state,
				savedRestaurants: action.savedRestaurants
			};
		case RESTAURANTS_CLEAR_DATA:
			return initialState;
		default:
			return state;
	}
};

export default restaurants;
