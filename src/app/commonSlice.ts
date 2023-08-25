import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Level } from "../../types";

const initialState = {
  level: "medium" as Level,
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setLevel: (state, action: PayloadAction<Level>) => {
      state.level = action.payload;
    },
  },
});

export const { setLevel } = commonSlice.actions;

export default commonSlice.reducer;
