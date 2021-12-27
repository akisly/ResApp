import THEME_SET_DARK_MODE from './types';

const initialState = {
	isDarkMode: false,
};

const theme = (state = initialState, action) => {
	switch (action.type) {
		case THEME_SET_DARK_MODE:
			return {
				...state,
				isDarkMode: !state.isDarkMode
			};
		default:
			return state;
	}
};

export default theme;
