import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { registerUserAsync } from '../../api/user';

export const registerUser = createAsyncThunk('registerUser/registerUserAsync', async (user) => {
	const result = await registerUserAsync(user);
	const { email, detail } = result;

	if (!email) {
		console.error(detail);
		throw Error(detail);
	}
	return email;
});

const initialState = {
	isAuthenticate: false,
	loading: 'idle',
	theme: 'dark',
	user: undefined,
};

export const sessionSlice = createSlice({
	name: 'session',
	initialState,
	reducers: {
		changeTheme: (state, { payload }) => {
			state.theme = payload;
		},
		logout: (state) => {
			state.isAuthenticate = false;
			state.user = undefined;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(registerUser.pending, (state, _) => {
			state.loading = 'pending';
		});
		builder.addCase(registerUser.fulfilled, (state, { payload }) => {
			state.loading = 'succeeded';
		});
		builder.addCase(registerUser.rejected, (state, _) => {
			state.isAuthenticate = false;
			state.loading = 'failed';
		});
	},
});

export const sessionSelector = createSelector(
	(state) => ({
		...state.session,
	}),
	(state) => state
);

export const { changeTheme, logout, setPathToRedirect } = sessionSlice.actions;

export default sessionSlice.reducer;
