import ApiEndPoint from '../../constants/ApiEndPoint';

export const ADD_ORDER = 'ADD_ORDER';

export const addOrder = order => {
	return async dispatch => {
		const { cartItems, date, total } = order;

		try {
			const res = await fetch(`${ApiEndPoint.api}/orders.json`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					cartItems: cartItems,
					date: date,
					total: total
				})
			});

			if (!res.ok) throw new Error('Sorry, could not sent the order.');

			const resData = await res.json();

			dispatch({
				type: ADD_ORDER,
				order: {
					id: resData.name,
					cartItems: cartItems,
					date: date,
					total: total
				}
			});
		} catch (err) {
			throw err;
		}
	};
};
