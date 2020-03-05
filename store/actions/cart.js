export const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";
export const REMOVE_PRODUCT_FROM_CART = "REMOVE_PRODUCT_FROM_CART";
export const GET_TOTAL = "GET_TOTAL";

export const getTotal = () => {
	return {
		type: GET_TOTAL
	};
};

export const addProductToCart = product => {
	return {
		type: ADD_PRODUCT_TO_CART,
		product: product
	};
};

export const removeProductFromCart = id => {
	return {
		type: REMOVE_PRODUCT_FROM_CART,
		id: id
	};
};
