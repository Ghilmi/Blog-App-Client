import { createSlice } from "@reduxjs/toolkit";
export const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: localStorage.getItem("post") || null,
    count: null,
    post: null,
    message: {
      inLoading: false,
      error: false,
    },
  },
  reducers: {
    setPosts(state, action) {
      if (action.payload) {
        state.posts = action.payload;
      }
    },
    setCountOfPosts(state, action) {
      state.count = action.payload;
    },
    setOnePost(state, action) {
      state.post = action.payload;
    },
    setMessage(state, action) {
      state.message = action.payload;
    },
    setNullPosts(state) {
      state.posts = null;
    },
  },
});
export const postReducer = postSlice.reducer;
export const postActions = postSlice.actions;
