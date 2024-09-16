import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customername: '',
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setCustomerName: (state, action) => {
      state.customername = action.payload;
    },
  },
});

export const {
  setCustomerName
} = customerSlice.actions;
export default customerSlice.reducer;
