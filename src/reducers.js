import { combineReducers } from 'redux';

export const initialLocationState = {
	location: null,
	cameFromChildRoute: false,
	prevLocation: null
};

export const location = function location(state = initialLocationState, action) {
	if (action.type === 'FETCH_LOCATION') {
		return {
			...state,
			location: action.payload,
			prevLocation: state.location,
			cameFromChildRoute:
				state.location && state.location.pathname.indexOf(action.payload.pathname) === 0
		};
	}
	return state;
};
export default combineReducers({
	location
});
