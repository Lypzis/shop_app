import ApiEndPoint from '../../constants/ApiEndPoint';
import Product from '../../models/product';

export const ADD_USER_PRODUCT = 'ADD_USER_PRODUCT';
export const ADD_AVAILABLE_PRODUCT = 'ADD_AVAILABLE_PRODUCT';
export const EDIT_USER_PRODUCT = 'EDIT_USER_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
	return async dispatch => {
		try {
			// get request
			const res = await fetch(`${ApiEndPoint.api}/products.json`);

			if (!res.ok) throw new Error('Something went wrong!');

			const resData = await res.json();

			const loadedProducts = [];

			for (const key in resData) {
				loadedProducts.push(
					new Product(
						key,
						'u1',
						resData[key].title,
						resData[key].imageUrl,
						resData[key].description,
						resData[key].price
					)
				);
			}

			// with the addition of redux thunk, here a dispatch is returned now
			dispatch({
				type: SET_PRODUCTS,
				products: loadedProducts
			});
		} catch (err) {
			// send to custom analytics error
			throw err;
		}
	};
};

// this will need to know which user is doing the action later on
export const addUserProduct = product => {
	return async dispatch => {
		const { imageUrl, price, title, description } = product;

		// any async code here
		try {
			const res = await fetch(`${ApiEndPoint.api}/products.json`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					imageUrl,
					price,
					title,
					description
				})
			});

			const resData = await res.json();

			// with the addition of redux thunk, here a dispatch is returned now
			dispatch({
				type: ADD_USER_PRODUCT,
				product: { ...product, id: resData.name }
			});
		} catch (err) {
			throw err;
		}
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
