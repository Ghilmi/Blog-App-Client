import { configureStore } from "@reduxjs/toolkit";
import sliceMode from "./sliceMode";
import { authReducer } from "../redux/slices/sliceAuth";
import { postReducer } from "../redux/slices/slicePosts";
import { userReducer } from "../redux/slices/sliceUser";
import { commentReducer } from "../redux/slices/sliceComments";
import { categoryReducer } from "../redux/slices/sliceCategory";
import { searchReducer } from "../redux/slices/sliceSearch";

export const store = configureStore({
  reducer: {
    mode: sliceMode,
    auth: authReducer,
    postReducer,
    user: userReducer,
    comment: commentReducer,
    category: categoryReducer,
    search: searchReducer,
  },
});
