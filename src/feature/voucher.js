import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vouchername: '',
  pointThreshold: null,
  discountType: '',
  discountPercent: '',
  discountMoney: null,
  isActive: false,
  userId: null,
  expiryDate: null,
  error: false,
  errorMessage: '',
};

const voucherSlice = createSlice({
  name: 'voucher',
  initialState,
  reducers: {
    setVoucherName: (state, action) => {
      state.vouchername = action.payload;
    },
    setPointThreshold: (state, action) => {
      state.pointThreshold = action.payload;
    },
    setDiscountType: (state, action) => {
      state.discountType = action.payload;
    },
    setDiscountPercent: (state, action) => {
      state.discountPercent = action.payload;
    },
    setDiscountMoney: (state, action) => {
      state.discountMoney = action.payload;
    },
    setIsActive: (state, action) => {
      state.isActive = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const {
  setVoucherName,
  setPointThreshold,
  setDiscountType,
  setDiscountPercent,
  setDiscountMoney,
  setIsActive,
  setUserId,
} = voucherSlice.actions;

export default voucherSlice.reducer;
