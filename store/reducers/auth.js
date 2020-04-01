import { AUTHENTICATE, LOGOUT } from '../actions/auth';

const initialState = {
	idToken: null,
	userId: null
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case AUTHENTICATE:
			return {
				idToken: action.idToken,
				userId: action.userId
			};
		case LOGOUT:
			return {
				idToken: null,
				userId: null
			};
		default:
			return state;
	}
};

export default authReducer;
