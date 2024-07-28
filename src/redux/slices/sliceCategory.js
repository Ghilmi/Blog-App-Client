import { createSlice } from "@reduxjs/toolkit";
export const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: localStorage.getItem("category") || null,
    count: null,
    message: {
      inLoading: false,
      error: false,
    },
  },
  reducers: {
    setCategories(state, action) {
      if (action.payload) {
        state.categories = action.payload;
      }
    },
    setCountOfCategories(state, action) {
      state.count = action.payload;
    },

    setMessage(state, action) {
      state.message = action.payload;
    },
  },
});
export const categoryReducer = categorySlice.reducer;
export const categoryActions = categorySlice.actions;
