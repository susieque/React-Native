import * as ActionTypes from './ActionTypes';

export const favorites = (state = [], action) => {
	switch (action.type) {
		case ActionTypes.ADD_FAVORITE:
			if (state.includes(action.payload)) {
				return state; //if already exists return previous state(since nothing needs to change).
			}
			return state.concat(action.payload); //if campsite id doesn't exist in array, returns new state with new fav campsite id concatenated to the end of it.
		//concat makes copy of array that its acting upon, adds new item at end, returns new array w/o mutating previous array.
		
		case ActionTypes.DELETE_FAVORITE:
			return state.filter(favorite => favorite !== action.payload); //by filtering into it every campsite that doesn't match the campsiteId in the action payload. So that creates a new array that no longer contains the campsiteId being deleted. And can return that as a new state.

		default:
			return state; //returns previous state
	}
};
//Add new reducer to the store with combined reducers function. Part of the configure store.js file.
