import { SIGNIN, SIGNUP } from '../actions/auth';

const initialState = {
	idToken: null,
	userId: null
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SIGNIN:
			return {
				...state,
				idToken: action.idToken
			};
		default:
			return state;
	}
};

export default authReducer;
