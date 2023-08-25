import { configureStore } from "@reduxjs/toolkit";
import commonSlice from "./commonSlice";

export const store = configureStore({
  reducer: {
    commonSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
