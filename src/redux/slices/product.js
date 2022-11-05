import { AsyncStorage } from 'react-native';
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import {
	getProductsAsync,
	getProductAsync,
	registerProductAsync,
	updateProductAsync,
} from '../../api/product';

export const getProducts = createAsyncThunk('getProducts/getProductsAsync', async (page) => {
	const result = await getProductsAsync(page);
	const { detail } = result;
	if (detail) {
		console.error(detail);
		throw Error(detail);
	}
	return result;
});

export const registerProduct = createAsyncThunk(
	'registerProduct/registerProductAsync',
	async ({ id, data }) => {
		let token = await AsyncStorage.getItem('token');
		if (!token) {
			console.error('Vuelve a iniciar sesión');
			throw new Error('invalid credential');
		}
		const result = await registerProductAsync(data, id, token);
		if (!result) {
			console.error('Intenta de nuevo');
			throw new Error('Intenta de nuevo');
		}
		if (result?.detail) {
			console.log(result.detail);
			throw new Error(result.detail);
		}
		return result;
	}
);

export const updateProduct = createAsyncThunk(
	'updateProduct/updateProductAsync',
	async ({ idProduct, idBusiness, data }) => {
		let token = await AsyncStorage.getItem('token');
		if (!token) {
			console.error('Vuelve a iniciar sesión');
			throw new Error('invalid credential');
		}
		const result = await updateProductAsync(idProduct, idBusiness, data, token);
		if (!result) {
			console.error('Intenta de nuevo');
			throw new Error('Intenta de nuevo');
		}
		if (result?.detail) {
			console.log(result.detail);
			throw new Error(result.detail);
		}
		return result;
	}
);

export const getProduct = createAsyncThunk('getProduct/getProductAsync', async (id) => {
	const result = await getProductAsync(id);
	const { detail } = result;
	if (detail) {
		console.error(detail);
		throw Error(detail);
	}
	return result;
});

const initialState = {
	loading: 'idle',
	products: [],
	total_pages: 1,
	selectedProduct: undefined,
};

export const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		reset: (state) => {
			state.total_pages = 1;
			state.products = [];
		},
	},
	extraReducers: (builder) => {
		builder.addCase(updateProduct.pending, (state, _) => {
			state.loading = 'pending';
		});
		builder.addCase(updateProduct.fulfilled, (state, { payload }) => {
			state.loading = 'succeeded';
			console.log(payload);
		});
		builder.addCase(updateProduct.rejected, (state, _) => {
			state.loading = 'failed';
		});

		builder.addCase(getProduct.pending, (state, _) => {
			state.loading = 'pending';
		});
		builder.addCase(getProduct.fulfilled, (state, { payload }) => {
			state.loading = 'succeeded';
			state.selectedProduct = payload;
		});
		builder.addCase(getProduct.rejected, (state, _) => {
			state.loading = 'failed';
		});

		builder.addCase(getProducts.pending, (state, _) => {
			state.loading = 'pending';
		});
		builder.addCase(getProducts.fulfilled, (state, { payload }) => {
			state.loading = 'succeeded';
			state.products = [...state.products, ...payload.results];
			state.total_pages = payload.total_pages;
		});
		builder.addCase(getProducts.rejected, (state, _) => {
			state.loading = 'failed';
		});
		builder.addCase(registerProduct.pending, (state, _) => {
			state.loading = 'pending';
		});
		builder.addCase(registerProduct.fulfilled, (state, { payload }) => {
			state.loading = 'succeeded';
			console.log(payload);
		});
		builder.addCase(registerProduct.rejected, (state, _) => {
			state.loading = 'failed';
		});
	},
});

export const productsSelector = createSelector(
	(state) => ({
		...state.products,
	}),
	(state) => state
);

export const { reset } = productsSlice.actions;

export default productsSlice.reducer;
