import { combineReducers } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import userReducer from '../feature/authentication';

const userPersistConfig = {
	key: 'user',
	storage: storage,
	// blacklist: ['']
	// whitelist: ['isLoggedIn']
};

const combinedReducer = combineReducers({
	user: persistReducer(userPersistConfig, userReducer)
});

const rootReducer = (state, action) => {
	return combinedReducer(state, action);
};
export default rootReducer;
