import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
  name: "user",
  initialState: {
    message: {
      inLoading: null,
      error: null,
    },
    users: null,
    userCount: null,
    userProfile: null,
  },
  reducers: {
    setMessage(state, action) {
      state.message = action.payload;
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
    setUsesrCount(state, action) {
      state.userCount = action.payload;
    },
    setUserProfile(state, action) {
      state.userProfile = action.payload;
    },
    resetUserProfile(state) {
      state.userProfile = null;
    },
  },
});
export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
