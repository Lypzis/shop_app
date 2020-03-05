import {
	ADD_PRODUCT_TO_CART,
	REMOVE_PRODUCT_FROM_CART,
	GET_TOTAL,
	REMOVE_ALL_PRODUCTS
} from "../actions/cart";

const initialState = {
	products: [],
	total: 0
};

const addProductToCart = (state, product) => {
	const stateCopy = { ...state };

	const order = {
		id: product.id,
		qty: 1,
		item: { ...product }
	};

	const exists = stateCopy.products.findIndex(
		product => product.item.id === order.item.id
	);

	if (exists === -1) stateCopy.products.push(order);
	else {
		++stateCopy.products[exists].qty;
	}

	return { ...state, products: stateCopy.products };
};

const getTotal = state => {
	let total = 0;

	state.products.forEach(item => {
		total += item.qty * item.item.price;
	});

	return { ...state, total: total };
};

const removeProductFromCart = (state, id) => {
	const stateCopy = { ...state };

	const item = stateCopy.products.find(product => product.id === id);
	const itemIndex = stateCopy.products.findIndex(product => product.id === id);

	if (itemIndex !== -1) {
		--stateCopy.products[itemIndex].qty;

		if (stateCopy.products[itemIndex].qty === 0)
			stateCopy.products.splice(itemIndex, 1);
	}

	return { ...state, products: stateCopy.products };
};

const removeAllProducts = state => {
	return { products: [], total: 0 };
};

const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_PRODUCT_TO_CART:
			return addProductToCart(state, action.product);
		case REMOVE_PRODUCT_FROM_CART:
			return removeProductFromCart(state, action.id);
		case REMOVE_ALL_PRODUCTS:
			return removeAllProducts(state);
		case GET_TOTAL:
			return getTotal(state);
		default:
			return state;
	}
};

export default cartReducer;
