import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stylistname: '',
  sidebarItem: 'stylist-appointment',
};

const stylistSlice = createSlice({
  name: 'stylist',
  initialState,
  reducers: {
    setStylistName: (state, action) => {
      state.stylistname = action.payload;
    },
    setSidebarItem: (state, action) => {
      state.sidebarItem = action.payload;
    },
  },
});

export const {
  setStylistName,
  setSidebarItem
} = stylistSlice.actions;
export default stylistSlice.reducer;
