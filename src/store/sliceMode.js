import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  mode: localStorage.getItem("oldMode")
    ? localStorage.getItem("oldMode")
    : "light",
};
export const sliceMode = createSlice({
  name: "mode",
  initialState,
  reducers: {
    setMode: (state, action) => {
      localStorage.setItem("oldMode", action.payload);
      state.mode = action.payload;
      return state;
    },
  },
});

export default sliceMode.reducer;
export const { setMode } = sliceMode.actions;
