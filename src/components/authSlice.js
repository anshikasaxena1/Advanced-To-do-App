import { createSlice } from '@reduxjs/toolkit';

// Get initial state from localStorage if available
const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: !!localStorage.getItem('user'),
  error: null,
  loading: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signupStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signupSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = {
        ...action.payload,
        profilePicture: action.payload.profilePicture || null
      };
      state.error = null;
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    signupFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      state.loading = false;
      // Clear all auth-related data from localStorage
      localStorage.removeItem('user');
    },
    updateProfilePicture: (state, action) => {
      if (state.user) {
        state.user.profilePicture = action.payload;
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    }
  }
});

export const { 
  loginStart, loginSuccess, loginFailure,
  signupStart, signupSuccess, signupFailure,
  logout, updateProfilePicture 
} = authSlice.actions;

export default authSlice.reducer;