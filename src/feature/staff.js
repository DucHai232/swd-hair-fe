import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarItem: '',
};

const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    setSidebarItem: (state, action) => {
      state.sidebarItem = action.payload;
    },
  },
});

export const {
  setSidebarItem
} = staffSlice.actions;
export default staffSlice.reducer;
