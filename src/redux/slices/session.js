import { createSelector, createSlice } from '@reduxjs/toolkit';

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
});

export const sessionSelector = createSelector(
	(state) => ({
		...state.session,
	}),
	(state) => state
);

export const { changeTheme, logout, setPathToRedirect } = sessionSlice.actions;

export default sessionSlice.reducer;
