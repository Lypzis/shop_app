export const ADD_ORDER = "ADD_ORDER";

export const addOrder = order => {
	return {
		type: ADD_ORDER,
		order: order
	};
};
