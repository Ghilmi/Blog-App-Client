import { createSlice } from "@reduxjs/toolkit";
export const searchSlice = createSlice({
  name: "search",
  initialState: {
    posts: null,
    order: "createdAt",
    title: "",
    categories: null,
  },
  reducers: {
    setState(state, action) {
      state = action.payload.posts;

      return state;
    },
    resetState(state) {
      state = {
        posts: null,
        order: "createdAt",
        title: "",
        categories: null,
      };
      return state;
    },
  },
});
export const searchReducer = searchSlice.reducer;
export const searchActions = searchSlice.actions;
