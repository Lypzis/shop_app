import ApiEndPoint from '../../constants/ApiEndPoint';

export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';

export const signup = (email, password) => {
	return async dispatch => {
		try {
			const res = await fetch(
				`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${ApiEndPoint.webApiKey}`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						email: email,
						password: password,
						returnSecureToken: true
					})
				}
			);

			if (!res.ok) throw new Error('Something went wrong with your sign up!');

			const resData = await res.json();

			console.log(resData);

			dispatch({
				type: SIGNUP
			});
		} catch (err) {
			throw err;
		}
	};
};

export const signin = (email, password) => {
	return async dispatch => {
		try {
			const res = await fetch(
				`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${ApiEndPoint.webApiKey}`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						email: email,
						password: password,
						returnSecureToken: true
					})
				}
			);

			if (!res.ok) throw new Error('Something went wrong with your login!');

			const resData = await res.json();

			console.log(resData);

			dispatch({
				type: SIGNIN
			});
		} catch (err) {
			throw err;
		}
	};
};
