import {
	ADD_USER_PRODUCT,
	EDIT_USER_PRODUCT,
	DELETE_PRODUCT,
	SET_PRODUCTS
} from '../actions/products';

const initialState = {
	availableProducts: [],
	userProducts: []
};

const addUserProduct = (state, product) => {
	return {
		availableProducts: state.availableProducts.concat(product),
		userProducts: state.userProducts.concat(product)
	};
};

const editUserProduct = (state, product) => {
	const stateCopy = { ...state };

	const productIndex = state.availableProducts.findIndex(
		prod => product.id === prod.id
	);

	const userProductIndex = state.userProducts.findIndex(
		prod => product.id === prod.id
	);

	stateCopy.availableProducts[productIndex] = product;
	stateCopy.userProducts[userProductIndex] = product;

	return {
		...state,
		availableProducts: stateCopy.availableProducts,
		userProducts: stateCopy.userProducts
	};
};

const deleteProduct = (state, id) => {
	const userProductCopy = [...state.userProducts];
	const availableProductsCopy = [...state.availableProducts];

	const userProductsFiltered = userProductCopy.filter(
		product => product.id !== id
	);
	const availableProductsFiltered = availableProductsCopy.filter(
		product => product.id !== id
	);

	return {
		...state,
		availableProducts: availableProductsFiltered,
		userProducts: userProductsFiltered
	};
};

const setProducts = (products, userProducts) => {
	return {
		availableProducts: products,
		userProducts: userProducts
	};
};

const productsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_PRODUCTS:
			return setProducts(action.products, action.userProducts);
		case ADD_USER_PRODUCT:
			return addUserProduct(state, action.product);
		case EDIT_USER_PRODUCT:
			return editUserProduct(state, action.product);
		case DELETE_PRODUCT:
			return deleteProduct(state, action.productId);
		default:
			return state;
	}
};

export default productsReducer;
