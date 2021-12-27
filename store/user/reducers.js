import { USER_STATE_CHANGE, USER_CLEAR_DATA } from './types';

const initialState = {
	currentUser: null,
};

const user = (state = initialState, action) => {
	switch (action.type) {
		case USER_STATE_CHANGE:
			return {
				...state,
				currentUser: action.currentUser
			};
		case USER_CLEAR_DATA:
			return initialState;
		default:
			return state;
	}
};

export default user;
