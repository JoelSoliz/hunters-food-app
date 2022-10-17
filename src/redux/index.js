import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import businessReducer from './slices/business';
import sessionReducer from './slices/session';

const sessionPersistConfig = {
	key: 'session',
	storage: AsyncStorage,
};

const businessPersistConfig = {
	key: 'business',
	storage: AsyncStorage,
};

const rootReducer = combineReducers({
	business: persistReducer(businessPersistConfig, businessReducer),
	session: persistReducer(sessionPersistConfig, sessionReducer),
});

export default rootReducer;
