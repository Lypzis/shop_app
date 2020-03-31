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

			const resData = await res.json();

			if (!res.ok) {
				const errorId = resData.error.errors[0].message;

				let message = 'Something went wrong!';

				if (errorId === 'EMAIL_EXISTS') message = 'This email is already in use!';

				throw new Error(message);
			}

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

			const resData = await res.json();

			if (!res.ok) {
				const errorId = resData.error.errors[0].message;

				let message = 'Something went wrong!';

				if (errorId === 'EMAIL_NOT_FOUND')
					message = 'This email could not be found!';
				else if (errorId === 'INVALID_PASSWORD')
					message = 'This password is not valid!';

				throw new Error(message);
			}

			console.log(resData);

			dispatch({
				type: SIGNIN,
				idToken: resData.idToken
			});
		} catch (err) {
			throw err;
		}
	};
};
