export const ADD_USER_PRODUCT = "ADD_USER_PRODUCT";
export const ADD_AVAILABLE_PRODUCT = "ADD_AVAILABLE_PRODUCT";
export const EDIT_USER_PRODUCT = "EDIT_USER_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

// this will need to know which user is doing the action later on
export const addUserProduct = product => {
	return {
		type: ADD_USER_PRODUCT,
		product: product
	};
};

export const addAvailableProduct = product => {
	return {
		type: ADD_AVAILABLE_PRODUCT,
		product: product
	};
};

// this will need to know which user is doing the action later on
export const editUserProduct = product => {
	return {
		type: EDIT_USER_PRODUCT,
		product: product
	};
};

export const deleteProduct = productId => {
	return {
		type: DELETE_PRODUCT,
		productId: productId
	};
};
