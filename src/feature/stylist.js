import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stylistname: '',
};

const stylistSlice = createSlice({
  name: 'stylist',
  initialState,
  reducers: {
    setStylistName: (state, action) => {
      state.stylistname = action.payload;
    },
  },
});

export const {
  setStylistName
} = stylistSlice.actions;
export default stylistSlice.reducer;
