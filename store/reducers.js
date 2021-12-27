import { combineReducers } from 'redux';
import theme from './theme/reducers';
import user from './user/reducers';
import cities from "./cities/reducers";
import restaurants from "./restaurants/reducers";

const reducers = {
	theme,
	user,
	cities,
	restaurants,
};

export default combineReducers(reducers);
