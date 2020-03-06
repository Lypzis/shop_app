import PRODUCTS from "../../data/dummy-data";
import { ADD_USER_PRODUCT, EDIT_USER_PRODUCT } from "../actions/products";

const initialState = {
	availableProducts: PRODUCTS,
	userProducts: PRODUCTS.filter(prod => prod.ownerId === "u1") // this obviously hard coded for now
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

const productsReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_USER_PRODUCT:
			return addUserProduct(state, action.product);
		case EDIT_USER_PRODUCT:
			return editUserProduct(state, action.product);
		default:
			return state;
	}
};

export default productsReducer;
