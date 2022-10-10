import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import sessionReducer from './slices/session';

const sessionPersistConfig = {
	key: 'session',
	storage: AsyncStorage,
};

const rootReducer = combineReducers({
	session: persistReducer(sessionPersistConfig, sessionReducer),
});

export default rootReducer;
