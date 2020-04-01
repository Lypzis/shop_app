//import AsyncStorage from '@react-native-community/async-storage'; needs ejection :D
import ApiEndPoint from '../../constants/ApiEndPoint';

export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const AUTHENTICATE = 'AUTHENTICATE';

export const authenticate = (userId, token) => {
	return { type: AUTHENTICATE, userId: userId, idToken: token };
};

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

			dispatch(authenticate(resData.localId, resData.idToken));
			const expirationDate = new Date(
				new Date().getTime() + parseInt(resData.expiresIn) * 1000
			); //* 1000 to turn seconds into miliseconds
			saveDataToStorage(resData.idToken, resData.localId, expirationDate);
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

			dispatch(authenticate(resData.localId, resData.idToken));
			const expirationDate = new Date(
				new Date().getTime() + parseInt(resData.expiresIn) * 1000
			); //* 1000 to turn seconds into miliseconds
			saveDataToStorage(resData.idToken, resData.localId, expirationDate);
		} catch (err) {
			throw err;
		}
	};
};

const saveDataToStorage = async (token, userId, expirationDate) => {
	try {
		await AsyncStorage.setItem(
			'userData',
			JSON.stringify({
				token: token,
				userId: userId,
				expiryDate: expirationDate.toISOString()
			})
		);
	} catch (err) {
		throw err;
	}
};
