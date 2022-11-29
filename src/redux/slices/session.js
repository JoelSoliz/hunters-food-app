import { AsyncStorage } from 'react-native';
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { getUserInfoAsync, loginAsync, registerUserAsync } from '../../api/user';
import { registerBusinessAsync, getUserBusinessAsync } from '../../api/business';

export const login = createAsyncThunk('login/loginAsync', async (userLogin) => {
	const result = await loginAsync(userLogin);
	const { access_token, detail } = result;
	if (!access_token) {
		console.error(detail);
		throw Error(detail);
	}

	await AsyncStorage.setItem('token', access_token);
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

export const getUserBusiness = createAsyncThunk(
	'getUserBusiness/getUserBusinessAsync',
	async () => {
		let token = await AsyncStorage.getItem('token');
		if (!token) {
			console.error('Vuelve a iniciar sesión');
			throw new Error('invalid credential');
		}
		const result = await getUserBusinessAsync(token);
		if (result?.detail) {
			console.error(detail);
			return undefined;
		}
		return result;
	}
);

const initialState = {
	isAuthenticate: false,
	loading: 'idle',
	theme: 'dark',
	user: undefined,
	userBusiness: undefined,
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
			state.userBusiness = undefined;
		},
		resetLoading: (state, _) => {
			state.loading = 'idle';
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

		builder.addCase(registerBusiness.pending, (state, _) => {
			state.loading = 'pending';
		});
		builder.addCase(registerBusiness.fulfilled, (state, { payload }) => {
			state.loading = 'succeeded';
			state.userBusiness = payload;
		});
		builder.addCase(registerBusiness.rejected, (state, _) => {
			state.loading = 'failed';
		});

		builder.addCase(getUserBusiness.pending, (state, _) => {
			state.loading = 'pending';
		});
		builder.addCase(getUserBusiness.fulfilled, (state, { payload }) => {
			state.loading = 'succeeded';
			state.userBusiness = payload;
		});
		builder.addCase(getUserBusiness.rejected, (state, _) => {
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

export const { changeTheme, logout, resetLoading } = sessionSlice.actions;

export default sessionSlice.reducer;
