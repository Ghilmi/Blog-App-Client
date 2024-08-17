import { createSlice } from "@reduxjs/toolkit";
const randomColor = `#${(Math.random() * 0xfffff * 1000000)
  .toString(16)
  .slice(0, 6)}`;
if (!localStorage.getItem("randomColor")) {
  localStorage.setItem("randomColor", randomColor);
}
const initialState = {
  mode: localStorage.getItem("oldMode")
    ? localStorage.getItem("oldMode")
    : "light",
  randomColor: localStorage.getItem("randomColor"),
};
export const sliceMode = createSlice({
  name: "mode",
  initialState,
  reducers: {
    setMode(state, action) {
      localStorage.setItem("oldMode", action.payload);
      state.mode = action.payload;
    },
  },
});

export default sliceMode.reducer;
export const { setMode } = sliceMode.actions;
