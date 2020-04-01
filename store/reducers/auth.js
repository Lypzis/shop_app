import { AUTHENTICATE } from '../actions/auth';

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
		default:
			return state;
	}
};

export default authReducer;
