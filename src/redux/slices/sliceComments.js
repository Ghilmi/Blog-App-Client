import { createSlice } from "@reduxjs/toolkit";
export const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: null,
    commentsCount: null,
    message: {
      isLoading: null,
      error: null,
    },
  },
  reducers: {
    setComments(state, action) {
      if (action.payload) {
        state.comments = action.payload;
      }
    },
    setCommentsCount(state, action) {
      state.commentsCount = action.payload;
    },
    setMessage(state, action) {
      state.message = action.payload;
    },
  },
});
export const commentReducer = commentSlice.reducer;
export const commentActions = commentSlice.actions;
