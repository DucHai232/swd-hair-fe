import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  servicename: '',
  price: null,
  loyaltyPoints: null,
  error: false,
  errorMessage: '',
};

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    setServiceName: (state, action) => {
      state.servicename = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setLoyaltyPoints: (state, action) => {
      state.loyaltyPoints = action.payload;
    },
  },
});

export const {
  setServiceName,
  setPrice,
  setLoyaltyPoints
} = serviceSlice.actions;

export default serviceSlice.reducer;
