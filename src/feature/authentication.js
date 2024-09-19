import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../services/api.service";

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
      const response = await axiosInstance.post(`/login`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');

    }
  }
);

// Async thunk for register
export const register = createAsyncThunk(
  'user/register',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/register`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Register failed');

    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsLoggedIn(state, action) {
      const isLoggedIn = action.payload;
      state.isLoggedIn = isLoggedIn;
    },
    setFirstLogin(state, action) {
      state.isFirstLogin = action.payload;
    },
    signout: (state) => {
      state.accessToken = '';
      state.username = '';
      state.isLoggedIn = false;
      state.isFirstLogin = false;
      state.role = [];
      state.error = false;
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
        state.errorMessage = '';
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
  setIsLoggedIn,
  setFirstLogin,
  signout,
} = userSlice.actions;
export default userSlice.reducer;