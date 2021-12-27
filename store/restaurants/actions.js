import firebase from "firebase";
import { RESTAURANTS_SET_RESTAURANTS, RESTAURANTS_SET_SAVED_RESTAURANTS, RESTAURANTS_CLEAR_DATA } from './types';

export const setSavedRestaurants = (savedRestaurants) => ({
	type: RESTAURANTS_SET_SAVED_RESTAURANTS, savedRestaurants
});

export const setRestaurants = (restaurants) => ({
	type: RESTAURANTS_SET_RESTAURANTS, restaurants
});

export const fetchRestaurants = (where) => {
	return (dispatch) => {
		let query;
		const collection = firebase.firestore().collection('restaurants');
		
		if (where) {
			query = collection.where(where.fieldPath, where.opStr, where.value).get();
		} else {
			query = collection.get();
		}
		
		query
			.then((snapshot) => {
				const data = [];
				
				snapshot.forEach((doc) => {
					data.push({
						id: doc.id,
						...doc.data()
					});
				})
				
				dispatch(setRestaurants(data));
			});
	};
};

export const clearData = () => ({ type: RESTAURANTS_CLEAR_DATA });
