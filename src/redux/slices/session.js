import { AsyncStorage } from 'react-native';
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { getUserInfoAsync, loginAsync, registerUserAsync } from '../../api/user';

export const login = createAsyncThunk('login/loginAsync', async (userLogin) => {
	const result = await loginAsync(userLogin);
	const { access_token, detail } = result;
	if (!access_token) {
		console.error(detail);
		throw Error(detail);
	}
	AsyncStorage.setItem('token', access_token);
	const user = await getUserInfoAsync(access_token);
	return user;
});

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
		builder.addCase(registerUser.fulfilled, (state, _) => {
			state.loading = 'succeeded';
		});
		builder.addCase(registerUser.rejected, (state, _) => {
			state.isAuthenticate = false;
			state.loading = 'failed';
		});

		builder.addCase(login.pending, (state, _) => {
			state.loading = 'pending';
		});
		builder.addCase(login.fulfilled, (state, { payload }) => {
			state.loading = 'succeeded';
			state.user = payload;
			state.isAuthenticate = true;
		});
		builder.addCase(login.rejected, (state, _) => {
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
