import ApiEndPoint from '../../constants/ApiEndPoint';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDER';

export const fetchOrders = () => {
	return async dispatch => {
		try {
			const res = await fetch(`${ApiEndPoint.api}/orders/u1.json`);

			if (!res.ok) throw new Error('Something went wrong!');

			const resData = await res.json();

			const loadedOrders = [];

			for (const key in resData) {
				loadedOrders.push({
					id: key,
					cartItems: resData[key].cartItems,
					date: resData[key].date,
					total: resData[key].total
				});
			}

			dispatch({
				type: SET_ORDERS,
				orders: loadedOrders
			});
		} catch (err) {
			throw err;
		}
	};
};

export const addOrder = order => {
	return async dispatch => {
		const { cartItems, date, total } = order;

		try {
			const res = await fetch(`${ApiEndPoint.api}/orders/u1.json`, {
				// change for a real user's id here later on
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					cartItems: cartItems,
					date: date,
					total: total
				})
			});

			if (!res.ok) throw new Error('Sorry, could not send the order.');

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
