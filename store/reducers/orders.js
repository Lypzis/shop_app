import { ADD_ORDER } from "../actions/orders";

const initialState = {
	orders: []
};

const addOrder = (state, order) => {
	const stateCopy = { ...state };

	stateCopy.orders.push(order);

	return { ...state, orders: stateCopy.orders };
};

const ordersReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_ORDER:
			return addOrder(state, action.order);
		default:
			return state;
	}
};

export default ordersReducer;
