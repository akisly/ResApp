import firebase from 'firebase';
import { USER_STATE_CHANGE, USER_CLEAR_DATA } from './types';

export const setUser = (user) => ({
	type: USER_STATE_CHANGE, currentUser: user
})

export function clearData() {
	return ((dispatch) => {
		dispatch({ type: USER_CLEAR_DATA });
	});
}

export function fetchUser() {
	return ((dispatch) => {
		const userId = firebase.auth().currentUser.uid;
		
		firebase
			.firestore()
			.collection('users')
			.doc(userId)
			.get()
			.then((snapshot) => {
				if (snapshot.exists) {
					const data = snapshot.data();
					dispatch(setUser({ id: userId, ...data }));
				} else {
					console.log('does not exist');
				}
			});
	});
}
