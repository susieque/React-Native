import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl'; //using ip address from baseUrl file.

export const fetchComments = () => (dispatch) => {
	//wrapping action creator in additional function. Redux Thunk library will intercept it, stop dispatch from going to a reducer. Sends asynchronous request to server in baseUrl file using fetch. Fetch returns promise via promise chain to add comments action OR comments failed action.
	return fetch(baseUrl + 'comments')
		.then(
			(response) => {
				if (response.ok) {
					return response;
				} else {
					const error = new Error(
						`Error ${response.status}: ${response.statusText}`
					);
					error.response = response;
					throw error;
				}
			},
			(error) => {
				const errMess = new Error(error.message);
				throw errMess;
			}
		)
		.then((response) => response.json())
		.then((comments) => dispatch(addComments(comments))) //promise chain. Fetch returns promise via promise chain to add comments action OR comments failed action.
		.catch((error) => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errMess) => ({
	type: ActionTypes.COMMENTS_FAILED,
	payload: errMess,
}); //There are normal, non thunk action creator functions.

export const addComments = (comments) => ({
	type: ActionTypes.ADD_COMMENTS,
	payload: comments,
});

export const fetchCampsites = () => (dispatch) => {
	dispatch(campsitesLoading());

	return fetch(baseUrl + 'campsites')
		.then(
			(response) => {
				if (response.ok) {
					return response;
				} else {
					const error = new Error(
						`Error ${response.status}: ${response.statusText}`
					);
					error.response = response;
					throw error;
				}
			},
			(error) => {
				const errMess = new Error(error.message);
				throw errMess;
			}
		)
		.then((response) => response.json())
		.then((campsites) => dispatch(addCampsites(campsites)))
		.catch((error) => dispatch(campsitesFailed(error.message)));
};

export const campsitesLoading = () => ({
	type: ActionTypes.CAMPSITES_LOADING,
});

export const campsitesFailed = (errMess) => ({
	type: ActionTypes.CAMPSITES_FAILED,
	payload: errMess,
});

export const addCampsites = (campsites) => ({
	type: ActionTypes.ADD_CAMPSITES,
	payload: campsites,
});

export const fetchPromotions = () => (dispatch) => {
	dispatch(promotionsLoading());

	return fetch(baseUrl + 'promotions')
		.then(
			(response) => {
				if (response.ok) {
					return response;
				} else {
					const error = new Error(
						`Error ${response.status}: ${response.statusText}`
					);
					error.response = response;
					throw error;
				}
			},
			(error) => {
				const errMess = new Error(error.message);
				throw errMess;
			}
		)
		.then((response) => response.json())
		.then((promotions) => dispatch(addPromotions(promotions)))
		.catch((error) => dispatch(promotionsFailed(error.message)));
};

export const promotionsLoading = () => ({
	type: ActionTypes.PROMOTIONS_LOADING,
});

export const promotionsFailed = (errMess) => ({
	type: ActionTypes.PROMOTIONS_FAILED,
	payload: errMess,
});

export const addPromotions = (promotions) => ({
	type: ActionTypes.ADD_PROMOTIONS,
	payload: promotions,
});

export const fetchPartners = () => (dispatch) => {
	dispatch(partnersLoading());

	return fetch(baseUrl + 'partners')
		.then(
			(response) => {
				if (response.ok) {
					return response;
				} else {
					const error = new Error(
						`Error ${response.status}: ${response.statusText}`
					);
					error.response = response;
					throw error;
				}
			},
			(error) => {
				const errMess = new Error(error.message);
				throw errMess;
			}
		)
		.then((response) => response.json())
		.then((partners) => dispatch(addPartners(partners)))
		.catch((error) => dispatch(partnersFailed(error.message)));
};

export const partnersLoading = () => ({
	type: ActionTypes.PARTNERS_LOADING,
});

export const partnersFailed = (errMess) => ({
	type: ActionTypes.PARTNERS_FAILED,
	payload: errMess,
});

export const addPartners = (partners) => ({
	type: ActionTypes.ADD_PARTNERS,
	payload: partners,
});

export const postFavorite = campsiteId => dispatch => {
	//postFavorite action creator to take advantage of redux thunk middleware. Pass campsiteId fav to post to server. Wrap function body in second arrow function, pass in dispatch function as redux thunk.
	setTimeout(() => {
		//inside this function wont worry about actually fetching from server. This sumulated server response using JS set timeout function for short delay.
		dispatch(addFavorite(campsiteId)); //once delay is done, dispatch add favorite action with this add fav action creator with campsiteId
	}, 2000); //delay duration 2000 milliseconds
};

export const addFavorite = campsiteId => ({
	//add favorite action creator, standard (non-thunked)action creator that returns a action object
	type: ActionTypes.ADD_FAVORITE, //with action type and action payload
	payload: campsiteId, //containing id
});
