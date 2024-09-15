import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../services/api.service";

const initialState = {
  error: false,
  ok: false,
  isLoggedIn: false,
  isFirstLogin: false,
  errorMessage: '',
  accessToken: '',
  username: '',
  role: []
};

// Async thunk for login
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post(`/login`, data);
      return response.data; // Assuming response data contains user information
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');

    }
  }
);

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // setUser: (state, action) => {

    // },
    setIsLoggedIn(state, action) {
      const isLoggedIn = action.payload;
      state.isLoggedIn = isLoggedIn;
    },
    setFirstLogin(state, action) {
      state.isFirstLogin = action.payload;
    },
    singout: (state) => {
      state.accessToken = '';
      state.username = '';
      state.isLoggedIn = false;
      state.isFirstLogin = false;
      state.role = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle pending state
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      // Handle fulfilled state (successful login)
      .addCase(loginUser.fulfilled, (state, action) => {
        const { access_token, user } = action.payload;
        state.isLoggedIn = true;
        state.accessToken = access_token;
        state.username = user.username;
        state.role = user.role;
        state.loading = false;
      })
      // Handle rejected state (failed login)
      .addCase(loginUser.rejected, (state, action) => {
        console.log(action)
        state.loading = false;
        state.errorMessage = action.payload;
        state.error = true;
      });
  }
});

export const {
  setUser
} = user.actions
export default user.reducer;