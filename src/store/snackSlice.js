import { createSlice } from "@reduxjs/toolkit";

export const snackSlice = createSlice({
  name: "snack",
  initialState: { initialVal: false, severity: "success", message: "" },
  reducers: {
    openSnack: (state, action) => {
      return {
        ...state,
        initialVal: true,
        severity: action.payload.severity,
        message: action.payload.message,
      };
    },
    closeSnack: (state) => {
      return { ...state, initialVal: false, };
    },
  },
});

export const { openSnack, closeSnack } = snackSlice.actions;
