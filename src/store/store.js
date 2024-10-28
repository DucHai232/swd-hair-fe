import { configureStore } from '@reduxjs/toolkit';

import { persistStore } from 'redux-persist';
import rootReducer from '../redux/rootReducer';
import hairsalonApi from '../services/hairsalon.service';

const store = configureStore({
	reducer: {
		rootReducer,
		[hairsalonApi.reducerPath]: hairsalonApi.reducer
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false
		}).concat(hairsalonApi.middleware)
});

const persistor = persistStore(store);

//action logout reset state

export { store, persistor };
