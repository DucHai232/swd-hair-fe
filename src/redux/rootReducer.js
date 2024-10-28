import { combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import userReducer from "../feature/authentication";
import staffReducer from "../feature/staff";
import stylistReducer from "../feature/stylist";
import appReducer from "../feature/app";
import managerReducer from "../feature/manager";

const userPersistConfig = {
  key: "user",
  storage: storage,
  blacklist: ['isLoading']
};

const managerPersistConfig = {
  key: "manager",
  storage: storage,
};

const staffPersistConfig = {
  key: "staff",
  storage: storage,
};
const stylistPersistConfig = {
  key: "stylist",
  storage: storage,
};



const combinedReducer = combineReducers({
  app: appReducer,
  user: persistReducer(userPersistConfig, userReducer),
  manager: persistReducer(managerPersistConfig, managerReducer),
  staff: persistReducer(staffPersistConfig, staffReducer),
  stylist: persistReducer(stylistPersistConfig, stylistReducer),
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = {};
  }
  return combinedReducer(state, action);
};
export default rootReducer;
