import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import businessReducer from './slices/business';
import sessionReducer from './slices/session';
import productsReducer from './slices/product';

const sessionPersistConfig = {
	key: 'session',
	storage: AsyncStorage,
};

const businessPersistConfig = {
	key: 'business',
	storage: AsyncStorage,
};

const rootReducer = combineReducers({
	session: persistReducer(sessionPersistConfig, sessionReducer), 
	products: productsReducer,
	business: persistReducer(businessPersistConfig, businessReducer),
});

export default rootReducer;
