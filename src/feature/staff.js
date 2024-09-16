import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  staffname: '',
};

const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    setStaffName: (state, action) => {
      state.staffname = action.payload;
    },
  },
});

export const {
  setStaffName
} = staffSlice.actions;
export default staffSlice.reducer;
