import * as ActionTypes from './ActionTypes';

export const favorites = (state = [], action) => {
	switch (action.type) {
		case ActionTypes.ADD_FAVORITE:
			if (state.includes(action.payload)) {
				return state; //if already exists return previous state(since nothing needs to change).
			}
			return state.concat(action.payload); //if campsite id doesn't exist in array, returns new state with new fav campsite id concatenated to the end of it.
		//concat makes copy of array that its acting upon, adds new item at end, returns new array w/o mutating previous array.
		default:
			return state; //returns previous state
	}
};
//Add new reducer to the store with combined reducers function. Part of the configure store.js file.
