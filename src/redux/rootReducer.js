import { combineReducers } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import userReducer from '../feature/authentication';
import customerReducer from '../feature/customer';
import serviceReducer from '../feature/services';
import staffReducer from '../feature/staff';
import stylistReducer from '../feature/stylist';
import voucherReducer from '../feature/voucher';
import appointmentReducer from '../feature/appointment';
import appReducer from '../feature/app';

const userPersistConfig = {
	key: 'user',
	storage: storage,
	// whitelist: ['isLoggedIn']
};
const cutstomerPersistConfig = {
	key: 'cutstomer',
	storage: storage,
};
const servicePersistConfig = {
	key: 'service',
	storage: storage,
};
const staffPersistConfig = {
	key: 'staff',
	storage: storage,
};
const stylistPersistConfig = {
	key: 'stylist',
	storage: storage,
};
const voucherPersistConfig = {
	key: 'voucher',
	storage: storage,
};
const appointmentPersistConfig = {
	key: 'appointment',
	storage: storage,
	blacklist: [ 'openServiceModal']
};

const combinedReducer = combineReducers({
	app: appReducer,
	user: persistReducer(userPersistConfig, userReducer),
	cutstomer: persistReducer(cutstomerPersistConfig, customerReducer),
	serviceReducer: persistReducer(servicePersistConfig, serviceReducer),
	staff: persistReducer(staffPersistConfig, staffReducer),
	stylist: persistReducer(stylistPersistConfig, stylistReducer),
	voucher: persistReducer(voucherPersistConfig, voucherReducer),
	appointment: persistReducer(appointmentPersistConfig, appointmentReducer),
});

const rootReducer = (state, action) => {
	if (action.type === 'LOGOUT') {
		state = {};
	}
	return combinedReducer(state, action);
};
export default rootReducer;
