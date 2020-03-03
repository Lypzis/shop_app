import PRODUCTS from "../../data/dummy-data";

const initialState = {
	availableProducts: PRODUCTS,
	userProducts: PRODUCTS.filter(prod => prod.ownerId === "u1") // this obviously hard coded for now
};

const productsReducer = (state = initialState, action) => {
	return state;
};

export default productsReducer;
