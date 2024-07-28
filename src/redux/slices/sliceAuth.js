import { createSlice } from "@reduxjs/toolkit";
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    message: {
      text: null,
      error: false,
      inLoading: null,
    },
    isVerifyAccount: null,
  },
  reducers: {
    setUser(state, action) {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.user = action.payload;
    },
    setMessage(state, action) {
      state.message = action.payload;
    },
    setUserInformation(state, action) {
      console.log("setUserInformation");
      const payload = {
        ...action.payload,
        token: state.user.token,
      };
      localStorage.setItem("user", JSON.stringify(payload));
      state.user = payload;
    },
    resetUser(state) {
      localStorage.removeItem("user");
      state.user = null;
    },
    verifyAccount(state) {
      state.isVerifyAccount = true;
    },
  },
});
export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
