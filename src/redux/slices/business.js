import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import {
	getBusinessAsync,
	getBusinessProductsAsync,
	getBusinessesAsync,
	addFavoriteBusinessAsync,
} from '../../api/business';

export const getBusiness = createAsyncThunk('getBusiness/getBusinessAsync', async (id) => {
	const result = await getBusinessAsync(id);
	const { detail } = result;
	if (detail) {
		console.error(detail);
		throw Error(detail);
	}
	return result;
});

export const getBusinessProducts = createAsyncThunk(
	'getBusinessProducts/getBusinessProductsAsync',
	async ({ id, page }) => {
		const result = await getBusinessProductsAsync(id, page);
		const { detail } = result;
		if (detail) {
			console.error(detail);
			throw Error(detail);
		}
		return result;
	}
);

export const getBusinesses = createAsyncThunk('getBusinesses/getBusinessesAsync', async (page) => {
	const result = await getBusinessesAsync(page);
	const { detail } = result;
	if (detail) {
		console.error(detail);
		throw Error(detail);
	}
	return result;
});

export const addFavoriteBusiness = createAsyncThunk(
	'addFavoriteBusiness/addFavoriteBusinessAsync',
	async ({ business_id }) => {
		let token = await AsyncStorage.getItem('token');
		if (!token) {
			console.error('Vuelve a iniciar sesión');
			throw new Error('invalid credential');
		}
		const result = await addFavoriteBusinessAsync(business_id, token);
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

const initialState = {
	loading: 'idle',
	businesses: [],
	selectedBusiness: {
		business: undefined,
		products: [],
		total_pages: 1,
	},
};

export const businessSlice = createSlice({
	name: 'business',
	initialState,
	reducers: {
		reset: (state, _) => {
			state.total_pages = 1;
			state.businesses = [];
		},
		resetLoading: (state, _) => {
			state.loading = 'idle';
		},
		resetSelectedBusiness: (state, _) => {
			state.selectedBusiness = {
				business: undefined,
				products: [],
				total_pages: 1,
			};
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getBusiness.pending, (state, _) => {
			state.loading = 'pending';
		});
		builder.addCase(getBusiness.fulfilled, (state, { payload }) => {
			state.loading = 'succeeded';
			state.selectedBusiness.business = payload;
		});
		builder.addCase(getBusiness.rejected, (state, _) => {
			state.loading = 'failed';
		});

		builder.addCase(getBusinessProducts.pending, (state, _) => {
			state.loading = 'pending';
		});
		builder.addCase(getBusinessProducts.fulfilled, (state, { payload }) => {
			state.loading = 'succeeded';
			if (!(state.selectedBusiness.products.length > 0 && payload.current_page === 1)) {
				state.selectedBusiness.products = [
					...state.selectedBusiness.products,
					...payload.results,
				];
			}
			state.selectedBusiness.total_pages = payload.total_pages;
		});
		builder.addCase(getBusinessProducts.rejected, (state, _) => {
			state.loading = 'failed';
		});

		builder.addCase(getBusinesses.pending, (state, _) => {
			state.loading = 'pending';
		});
		builder.addCase(getBusinesses.fulfilled, (state, { payload }) => {
			state.loading = 'succeeded';
			state.businesses = [...state.businesses, ...payload.results];
			state.total_pages = payload.total_pages;
		});
		builder.addCase(getBusinesses.rejected, (state, _) => {
			state.loading = 'failed';
		});
		builder.addCase(addFavoriteBusiness.pending, (state, _) => {
			state.loading = 'pending';
		});
		builder.addCase(addFavoriteBusiness.fulfilled, (state, { payload }) => {
			state.loading = 'succeeded';
			state.userBusiness = payload;
		});
		builder.addCase(addFavoriteBusiness.rejected, (state, _) => {
			state.loading = 'failed';
		});
	},
});

export const businessSelector = createSelector(
	(state) => ({
		...state.business,
	}),
	(state) => state
);

export const { reset, resetLoading, resetSelectedBusiness } = businessSlice.actions;

export default businessSlice.reducer;
