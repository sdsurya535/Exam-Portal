import { createSlice } from "@reduxjs/toolkit";

export const passSlice = createSlice({
  name: "pass",
  initialState: { type: "password" },
  reducers: {
    toggleType: (state,action) => {
      return {...state,type:action.payload.type};
    },
  },
});

export const {toggleType} = passSlice.actions;
