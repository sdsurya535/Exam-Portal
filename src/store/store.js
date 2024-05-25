import { configureStore } from "@reduxjs/toolkit";
import { snackSlice } from "./snackSlice";
import { passSlice } from "./passSlice";
import { loginSlice } from "./loginSlice";

const store = configureStore({
  reducer: {
    snack: snackSlice.reducer,
    pass: passSlice.reducer,
    log: loginSlice.reducer,
  },
});

export default store;
