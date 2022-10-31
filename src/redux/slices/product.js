import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { getProductAsync, registerProductAsync } from '../../api/product';

export const getProduct = createAsyncThunk('getProduct/getProductAsync', async (page) => {
	const result = await getProductAsync(page);
	const { detail } = result;
	if (detail) {
		console.error(detail);
		throw Error(detail);
	}
	return result;
});

export const registerProduct = createAsyncThunk(
	'registerProduct/registerProductAsync',
	async (business_id, product) => {
		let token = await AsyncStorage.getItem('token');
		if (!token) {
			console.error('Vuelve a iniciar sesión');
			throw new Error('invalid credential');
		}
		const result = await registerProductAsync(product, business_id, token);
		if (!result) {
			console.error('Intenta de nuevo');
			throw new Error('Intenta de nuevo');
		}
		if (result?.detail) {
			console.error(detail);
			throw new Error(detail);
		}
		return result;
	}
);

const initialState = {
	loading: 'idle',
	products: [],
	total_pages: 1,
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
		builder.addCase(getProduct.pending, (state, _) => {
			state.loading = 'pending';
		});
		builder.addCase(getProduct.fulfilled, (state, { payload }) => {
			state.loading = 'succeeded';
			state.products = [...state.products, ...payload.results];
			state.total_pages = payload.total_pages;
		});
		builder.addCase(getProduct.rejected, (state, _) => {
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
