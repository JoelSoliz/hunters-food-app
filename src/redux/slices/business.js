import { AsyncStorage } from 'react-native';
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { registerBusinessAsync } from '../../api/business';

export const registerBusiness = createAsyncThunk(
	'registerBusiness/registerBusinessAsync',
	async (business) => {
		let token = await AsyncStorage.getItem('token');
		if (!token) {
			console.error('Vuelve a iniciar sesión');
			throw new Error('invalid credential');
		}
		const result = await registerBusinessAsync(business, token);
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
	business: undefined,
};

export const businessSlice = createSlice({
	name: 'business',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(registerBusiness.pending, (state, _) => {
			state.loading = 'pending';
		});
		builder.addCase(registerBusiness.fulfilled, (state, { payload }) => {
			state.loading = 'succeeded';
			state.business = payload;
		});
		builder.addCase(registerBusiness.rejected, (state, _) => {
			console.log('Failed');
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

// export const {} = businessSlice.actions;

export default businessSlice.reducer;
