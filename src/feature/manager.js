import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  managername: '',
  sidebarItem: 'details',
};

const managerSlice = createSlice({
  name: 'manager',
  initialState,
  reducers: {
    setManagerName: (state, action) => {
      state.managername = action.payload;
    },
    setSidebarItem: (state, action) => {
      state.sidebarItem = action.payload;
    },
  },
});

export const {
  setmanagerName,
  setSidebarItem
} = managerSlice.actions;
export default managerSlice.reducer;
